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
        ];

        const { error } = await supabase.from("site_content").upsert(updates);

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

                        <div className="rounded-2xl bg-[#f7f1e8] border border-[#d8c8b5] shadow-sm p-8 space-y-6">
                            <h2 className="text-2xl font-bold">Page d’accueil</h2>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={heroKicker}
                                    onChange={(e) => setHeroKicker(e.target.value)}
                                    placeholder="Petit titre"
                                    className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3"
                                />

                                <input
                                    type="text"
                                    value={heroTitle1}
                                    onChange={(e) => setHeroTitle1(e.target.value)}
                                    placeholder="Titre ligne 1"
                                    className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3"
                                />

                                <input
                                    type="text"
                                    value={heroTitle2}
                                    onChange={(e) => setHeroTitle2(e.target.value)}
                                    placeholder="Titre ligne 2"
                                    className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3"
                                />

                                <input
                                    type="text"
                                    value={heroTitle3}
                                    onChange={(e) => setHeroTitle3(e.target.value)}
                                    placeholder="Titre ligne 3"
                                    className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3"
                                />

                                <textarea
                                    value={heroDescription}
                                    onChange={(e) => setHeroDescription(e.target.value)}
                                    placeholder="Description"
                                    rows={5}
                                    className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3"
                                />

                                <input
                                    type="text"
                                    value={ctaMap}
                                    onChange={(e) => setCtaMap(e.target.value)}
                                    placeholder="Bouton atelier"
                                    className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3"
                                />

                                <input
                                    type="text"
                                    value={ctaHours}
                                    onChange={(e) => setCtaHours(e.target.value)}
                                    placeholder="Bouton horaires"
                                    className="w-full rounded-lg border border-[#d8c8b5] px-4 py-3"
                                />

                                {message && (
                                    <p className="text-sm text-[#52606c]">{message}</p>
                                )}

                                <button
                                    type="button"
                                    onClick={saveSiteContent}
                                    disabled={saving}
                                    className="rounded-lg bg-[#d87532] px-6 py-3 text-white font-bold hover:bg-[#c96325] transition disabled:opacity-60"
                                >
                                    {saving ? "Sauvegarde..." : "Sauvegarder"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AdminTexts;