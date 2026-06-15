import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import logoImg from "@/assets/icons/momuy-tech-algerian.svg";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [heroKicker, setHeroKicker] = useState("");
  const [heroTitle1, setHeroTitle1] = useState("");
  const [heroTitle2, setHeroTitle2] = useState("");
  const [heroTitle3, setHeroTitle3] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [ctaMap, setCtaMap] = useState("");
  const [ctaHours, setCtaHours] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const initAdmin = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setAdminEmail(data.session.user.email ?? "");

      try {
        await fetchSiteContent();
      } catch (error) {
        console.error("Erreur chargement contenu admin :", error);
      }

      setLoading(false);
    };

    initAdmin();
  }, []);

  if (loading) {
    return (
      <Layout>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto card-premium p-8">
              <p className="text-sm text-muted-foreground">
                Chargement de l’espace admin...
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const fetchSiteContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("content_key, content_value");

    if (error) {
      console.error(error);
      return;
    }

    const getValue = (key: string) =>
      data?.find((item) => item.content_key === key)?.content_value || "";

    setHeroKicker(getValue("home_hero_kicker"));
    setHeroTitle1(getValue("home_hero_title_line_1"));
    setHeroTitle2(getValue("home_hero_title_line_2"));
    setHeroTitle3(getValue("home_hero_title_line_3"));
    setHeroDescription(getValue("home_hero_description"));
    setCtaMap(getValue("home_cta_map"));
    setCtaHours(getValue("home_cta_hours"));
  };

  const saveSiteContent = async () => {
    setSaving(true);

    const updates = [
      {
        content_key: "home_hero_kicker",
        content_value: heroKicker,
      },
      {
        content_key: "home_hero_title_line_1",
        content_value: heroTitle1,
      },
      {
        content_key: "home_hero_title_line_2",
        content_value: heroTitle2,
      },
      {
        content_key: "home_hero_title_line_3",
        content_value: heroTitle3,
      },
      {
        content_key: "home_hero_description",
        content_value: heroDescription,
      },
      {
        content_key: "home_cta_map",
        content_value: ctaMap,
      },
      {
        content_key: "home_cta_hours",
        content_value: ctaHours,
      },
    ];

    const { error } = await supabase
      .from("site_content")
      .upsert(updates);

    if (error) {
      console.error(error);
      alert("Erreur sauvegarde");
    } else {
      alert("Contenu sauvegardé");
    }

    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };


  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-[#f4efe7]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="card-premium p-8 md:p-10">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Espace privé
                  </p>
                  <h1 className="text-2xl md:text-4xl font-bold font-heading">
                    Dashboard <span className="text-gradient">Admin</span>
                  </h1>
                  <p className="text-sm text-muted-foreground mt-3">
                    Connecté avec :{" "}
                    <span className="font-semibold text-foreground">
                      {adminEmail}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-5 py-3 rounded-xl text-sm font-semibold border border-border/30 bg-card/60 hover:bg-card hover:shadow-premium transition-all duration-300"
                >
                  Se déconnecter
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Link
                to="/admin/horaires"
                className="card-premium p-7 block transition-all duration-300"              >
                <p className="text-sm text-muted-foreground mb-2">Gestion</p>
                <h2 className="text-xl font-bold font-heading mb-3">
                  Horaires d’ouverture
                </h2>
                <p className="text-sm text-muted-foreground">
                  Modifier les horaires affichés sur le site.
                </p>
              </Link>

              <Link
                to="/admin/tarifs"
                className="card-premium p-7 block transition-all duration-300"              >
                <p className="text-sm text-muted-foreground mb-2">Gestion</p>
                <h2 className="text-xl font-bold font-heading mb-3">
                  Tarifs
                </h2>
                <p className="text-sm text-muted-foreground">
                  Ajouter, modifier et supprimer les lignes tarifaires.
                </p>
              </Link>

              <Link
                to="/admin/textes"
                className="card-premium p-7 block transition-all duration-300"              >
                <h2 className="text-xl font-bold text-[#102337] mb-2">
                  Textes du site
                </h2>

                <p className="text-[#52606c] text-sm leading-relaxed">
                  Modifier les textes de l’accueil, des boutons et du contenu du site.
                </p>
              </Link>

              <Link
                to="/admin/media"
                className="card-premium p-7 block transition-all duration-300">
                <p className="text-sm text-muted-foreground mb-2">À venir</p>
                <h2 className="text-xl font-bold font-heading mb-3">
                  Photos & médias
                </h2>
                <p className="text-sm text-muted-foreground">
                  Mettre à jour les images du site.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout >
  );
};

export default AdminDashboard;