import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";

const BUCKET_NAME = "site-image";

const imagesConfig = [
    { key: "home_hero_image", label: "Image hero accueil" },
    { key: "about_shop_image", label: "Image boutique - À propos" },
    { key: "about_workshop_image", label: "Image atelier - À propos" },
    { key: "contact_facade_image", label: "Image façade - Contact" },
];

type SiteImage = {
    image_key: string;
    image_url: string;
};

const AdminMedia = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [images, setImages] = useState<Record<string, string>>({});
    const [uploadingKey, setUploadingKey] = useState<string | null>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const init = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error || !data.session) {
                setLoading(false);
                return;
            }

            setIsAuthenticated(true);
            await fetchImages();
            setLoading(false);
        };

        init();
    }, []);

    const fetchImages = async () => {
        const { data, error } = await supabase
            .from("site_images")
            .select("image_key, image_url");

        if (error) {
            console.error("Erreur chargement images :", error);
            return;
        }

        const formatted: Record<string, string> = {};

        (data as SiteImage[] | null)?.forEach((item) => {
            formatted[item.image_key] = item.image_url;
        });

        setImages(formatted);
    };

    const handleUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
        imageKey: string
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setUploadingKey(imageKey);
        setMessage("");

        const fileExt = file.name.split(".").pop();
        const fileName = `${imageKey}-${Date.now()}.${fileExt}`;
        const filePath = `${imageKey}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: true,
            });

        if (uploadError) {
            console.error("Erreur upload image :", uploadError);
            setMessage("Erreur pendant l’envoi de l’image.");
            setUploadingKey(null);
            return;
        }

        const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        const publicUrl = publicUrlData.publicUrl;

        const { error: dbError } = await supabase.from("site_images").upsert(
            {
                image_key: imageKey,
                image_url: publicUrl,
            },
            {
                onConflict: "image_key",
            }
        );

        if (dbError) {
            console.error("Erreur sauvegarde URL image :", dbError);
            setMessage("Image envoyée, mais erreur pendant la sauvegarde.");
            setUploadingKey(null);
            return;
        }

        setImages((prev) => ({
            ...prev,
            [imageKey]: publicUrl,
        }));

        setMessage("Image mise à jour avec succès.");
        setUploadingKey(null);
    };

    if (loading) {
        return (
            <Layout>
                <section className="py-16 md:py-24 bg-[#f4efe7] text-[#102337]">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto rounded-2xl bg-[#f7f1e8] border border-[#d8c8b5] shadow-sm p-8">
                            <p className="text-sm text-[#52606c]">
                                Chargement des médias...
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
            <section className="py-16 md:py-24 bg-[#f4efe7] text-[#102337]">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-[#52606c] mb-2">Administration</p>
                                <h1 className="font-serif text-4xl md:text-5xl font-bold">
                                    Photos & <span className="text-[#d87532]">médias</span>
                                </h1>
                            </div>

                            <Link
                                to="/admin"
                                className="px-5 py-3 rounded-xl text-sm font-semibold border border-[#d8c8b5] bg-[#f7f1e8] hover:bg-white transition"
                            >
                                Retour admin
                            </Link>
                        </div>

                        {message && (
                            <p className="rounded-xl bg-[#f7f1e8] border border-[#d8c8b5] px-4 py-3 text-sm text-[#52606c]">
                                {message}
                            </p>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                            {imagesConfig.map((image) => {
                                const currentUrl = images[image.key];
                                const isUploading = uploadingKey === image.key;

                                return (
                                    <div
                                        key={image.key}
                                        className="rounded-2xl bg-[#f7f1e8] border border-[#d8c8b5] shadow-sm p-6 space-y-4"
                                    >
                                        <h2 className="text-xl font-bold text-[#102337]">
                                            {image.label}
                                        </h2>

                                        <div className="rounded-xl overflow-hidden border border-[#d8c8b5] bg-white/50 h-56 flex items-center justify-center">
                                            {currentUrl && currentUrl.startsWith("http") ? (
                                                <img
                                                    src={currentUrl}
                                                    alt={image.label}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <p className="text-sm text-[#52606c] px-4 text-center">
                                                    Aucune image Supabase envoyée pour le moment.
                                                </p>
                                            )}
                                        </div>

                                        <label className="block">
                                            <span className="block text-sm font-semibold text-[#52606c] mb-2">
                                                Remplacer l’image
                                            </span>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                disabled={isUploading}
                                                onChange={(event) => handleUpload(event, image.key)}
                                                className="block w-full text-sm text-[#52606c] file:mr-4 file:rounded-lg file:border-0 file:bg-[#d87532] file:px-4 file:py-2 file:text-white file:font-bold hover:file:bg-[#c96325]"
                                            />
                                        </label>

                                        {isUploading && (
                                            <p className="text-sm text-[#52606c]">
                                                Envoi en cours...
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AdminMedia;
