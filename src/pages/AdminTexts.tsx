import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";

const AdminTexts = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const [heroKicker, setHeroKicker] = useState("");
    const [heroTitle1, setHeroTitle1] = useState("");
    const [heroTitle2, setHeroTitle2] = useState("");
    const [heroTitle3, setHeroTitle3] = useState("");
    const [heroDescription, setHeroDescription] = useState("");
    const [ctaMap, setCtaMap] = useState("");
    const [ctaHours, setCtaHours] = useState("");

    const [aboutTitle, setAboutTitle] = useState("");
    const [aboutShopTitle, setAboutShopTitle] = useState("");
    const [aboutShopText1, setAboutShopText1] = useState("");
    const [aboutShopText2, setAboutShopText2] = useState("");
    const [aboutWorkshopTitle, setAboutWorkshopTitle] = useState("");
    const [aboutWorkshopText1, setAboutWorkshopText1] = useState("");
    const [aboutWorkshopText2, setAboutWorkshopText2] = useState("");

    useEffect(() => {
        const init = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error || !data.session) {
                setLoading(false);
                return;
            }

            setIsAuthenticated(true);
            await fetchSiteContent();
            setLoading(false);
        };

        init();
    }, []);

    const fetchSiteContent = async () => {
        const { data, error } = await supabase
            .from("site_content")
            .select("content_key, content_value");

        if (error) {
            console.error("Erreur chargement textes :", error);
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

        setAboutTitle(getValue("about_title"));
        setAboutShopTitle(getValue("about_shop_title"));
        setAboutShopText1(getValue("about_shop_text_1"));
        setAboutShopText2(getValue("about_shop_text_2"));
        setAboutWorkshopTitle(getValue("about_workshop_title"));
        setAboutWorkshopText1(getValue("about_workshop_text_1"));
        setAboutWorkshopText2(getValue("about_workshop_text_2"));
    };

    const saveSiteContent = async () => {
        setSaving(true);
        setMessage("");

        const updates = [
            { content_key: "home_hero_kicker", content_value: heroKicker },
            { content_key: "home_hero_title_line_1", content_value: heroTitle1 },
            { content_key: "home_hero_title_line_2", content_value: heroTitle2 },
            { content_key: "home_hero_title_line_3", content_value: heroTitle3 },
            { content_key: "home_hero_description", content_value: heroDescription },
            { content_key: "home_cta_map", content_value: ctaMap },
            { content_key: "home_cta_hours", content_value: ctaHours },

            { content_key: "about_title", content_value: aboutTitle },
            { content_key: "about_shop_title", content_value: aboutShopTitle },
            { content_key: "about_shop_text_1", content_value: aboutShopText1 },
            { content_key: "about_shop_text_2", content_value: aboutShopText2 },
            { content_key: "about_workshop_title", content_value: aboutWorkshopTitle },
            { content_key: "about_workshop_text_1", content_value: aboutWorkshopText1 },
            { content_key: "about_workshop_text_2", content_value: aboutWorkshopText2 },
        ];

        const { error } = await supabase.from("site_content").upsert(updates, {
            onConflict: "content_key",
        });

        if (error) {
            console.error("Erreur sauvegarde textes :", error);
            setMessage("Erreur pendant la sauvegarde.");
        } else {
            setMessage("Textes sauvegardés avec succès.");
        }

        setSaving(false);
    };

    if (loading) {
        return (
            <Layout>
                <section className="py-16 md:py-24 bg-[#f4efe7] text-[#102337]">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto rounded-2xl bg-[#f7f1e8] border border-[#d8c8b5] shadow-sm p-8">
                            <p className="text-sm text-[#52606c]">Chargement des textes...</p>
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
            <section className="py-16 md:py-24 bg-[#f4efe7] text-[#102337]">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-[#52606c] mb-2">Administration</p>
                                <h1 className="font-serif text-4xl md:text-5xl font-bold">
                                    Textes du <span className="text-[#d87532]">site</span>
                                </h1>
                            </div>

                            <Link
                                to="/admin"
                                className="px-5 py-3 rounded-xl text-sm font-semibold border border-[#d8c8b5] bg-[#f7f1e8] hover:bg-white transition"
                            >
                                Retour admin
                            </Link>
                        </div>

                        <div className="card-premium p-7 block transition-all duration-300">
                            <h2 className="text-2xl font-bold">Page d’accueil</h2>

                            <div className="space-y-4">
                                <input type="text" value={heroKicker} onChange={(e) => setHeroKicker(e.target.value)} placeholder="Petit titre" className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />
                                <input type="text" value={heroTitle1} onChange={(e) => setHeroTitle1(e.target.value)} placeholder="Titre ligne 1" className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />
                                <input type="text" value={heroTitle2} onChange={(e) => setHeroTitle2(e.target.value)} placeholder="Titre ligne 2" className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />
                                <input type="text" value={heroTitle3} onChange={(e) => setHeroTitle3(e.target.value)} placeholder="Titre ligne 3" className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />

                                <textarea value={heroDescription} onChange={(e) => setHeroDescription(e.target.value)} placeholder="Description" rows={5} className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />

                                <input type="text" value={ctaMap} onChange={(e) => setCtaMap(e.target.value)} placeholder="Bouton atelier" className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />
                                <input type="text" value={ctaHours} onChange={(e) => setCtaHours(e.target.value)} placeholder="Bouton horaires" className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />
                            </div>
                        </div>

                        <div className="card-premium p-7 block transition-all duration-300">
                            <h2 className="text-2xl font-bold">Page À propos</h2>

                            <div className="space-y-4">
                                <input type="text" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} placeholder="Titre principal" className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />
                                <input type="text" value={aboutShopTitle} onChange={(e) => setAboutShopTitle(e.target.value)} placeholder="Titre boutique" className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />

                                <textarea value={aboutShopText1} onChange={(e) => setAboutShopText1(e.target.value)} placeholder="Texte boutique 1" rows={5} className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />
                                <textarea value={aboutShopText2} onChange={(e) => setAboutShopText2(e.target.value)} placeholder="Texte boutique 2" rows={4} className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />

                                <input type="text" value={aboutWorkshopTitle} onChange={(e) => setAboutWorkshopTitle(e.target.value)} placeholder="Titre atelier" className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />

                                <textarea value={aboutWorkshopText1} onChange={(e) => setAboutWorkshopText1(e.target.value)} placeholder="Texte atelier 1" rows={5} className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />
                                <textarea value={aboutWorkshopText2} onChange={(e) => setAboutWorkshopText2(e.target.value)} placeholder="Texte atelier 2" rows={4} className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3" />
                            </div>
                        </div>

                        {message && <p className="text-sm text-[#52606c]">{message}</p>}

                        <div className="flex justify-end pt-2">
                            <button
                                type="button"
                                onClick={saveSiteContent}
                                disabled={saving}
                                className="rounded-lg bg-[#d87532] px-6 py-3 text-white font-bold hover:bg-[#c96325] transition disabled:opacity-60"
                            >
                                {saving ? "Sauvegarde..." : "Sauvegarder tous les textes"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AdminTexts;