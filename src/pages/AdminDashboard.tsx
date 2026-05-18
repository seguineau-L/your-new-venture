import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import logoImg from "@/assets/icons/momuy-tech-algerian.svg";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Erreur session admin :", error);
        setLoading(false);
        return;
      }

      const session = data.session;

      if (session?.user) {
        setIsAuthenticated(true);
        setAdminEmail(session.user.email ?? "");
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

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

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <Layout>
      <section className="py-16 md:py-24">
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
                className="card-premium p-7 block hover:border-accent/20 transition-all duration-300"
              >
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
                className="card-premium p-7 block hover:border-accent/20 transition-all duration-300"
              >
                <p className="text-sm text-muted-foreground mb-2">Gestion</p>
                <h2 className="text-xl font-bold font-heading mb-3">
                  Tarifs
                </h2>
                <p className="text-sm text-muted-foreground">
                  Ajouter, modifier et supprimer les lignes tarifaires.
                </p>
              </Link>

              <div className="card-premium p-7 opacity-80">
                <p className="text-sm text-muted-foreground mb-2">À venir</p>
                <h2 className="text-xl font-bold font-heading mb-3">
                  Textes du site
                </h2>
                <p className="text-sm text-muted-foreground">
                  Modifier les titres, paragraphes et contenus.
                </p>
              </div>

              <div className="card-premium p-7 opacity-80">
                <p className="text-sm text-muted-foreground mb-2">À venir</p>
                <h2 className="text-xl font-bold font-heading mb-3">
                  Photos & médias
                </h2>
                <p className="text-sm text-muted-foreground">
                  Mettre à jour les images du site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;