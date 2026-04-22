import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";

type PricingRow = {
    id: string;
    category: string;
    brand: string;
    generation: string | null;
    model: string;
    repair_type: string;
    price: string;
    section: string | null;
};

const DEFAULT_REPAIRS = [
    { repair_type: "Écran", price: "259€", section: "Interventions classiques" },
    { repair_type: "Batterie", price: "139€", section: "Interventions classiques" },
    { repair_type: "Connecteur de charge", price: "139€", section: "Interventions classiques" },
    { repair_type: "Caméra avant", price: "99€", section: "Interventions classiques" },
    { repair_type: "Caméra arrière", price: "109€", section: "Interventions classiques" },
    { repair_type: "Lentille caméra", price: "69€", section: "Interventions classiques" },
    { repair_type: "Remplacement châssis", price: "139€", section: "Interventions classiques" },
    { repair_type: "Face ID (selon panne)", price: "Entre 89€ et 109€", section: "Interventions classiques" },
    { repair_type: "Restauration / mise à jour", price: "20€", section: "Interventions classiques" },

    { repair_type: "Toutes pannes carte mère", price: "359€", section: "Interventions sur carte mère" },
    { repair_type: "Lecteur SIM", price: "À définir", section: "Interventions sur carte mère" },

    { repair_type: "Récupération de données - Carte mère HS", price: "À partir de 429€", section: "Récupération de données" },

    { repair_type: "Effacement de données certifié", price: "20€", section: "Autres" },
];

const SECTIONS = [
    "Interventions classiques",
    "Interventions sur carte mère",
    "Récupération de données",
    "Autres",
];

const AdminPricing = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [rows, setRows] = useState<PricingRow[]>([]);
    const [message, setMessage] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("TELEPHONE");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedGeneration, setSelectedGeneration] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const [formCategory, setFormCategory] = useState("TELEPHONE");
    const [formBrandSelect, setFormBrandSelect] = useState("");
    const [formBrandInput, setFormBrandInput] = useState("");
    const [formGenerationSelect, setFormGenerationSelect] = useState("");
    const [formGenerationInput, setFormGenerationInput] = useState("");
    const [formModelSelect, setFormModelSelect] = useState("");
    const [formModelInput, setFormModelInput] = useState("");
    const [formRepairType, setFormRepairType] = useState("");
    const [formPrice, setFormPrice] = useState("");
    const [formSection, setFormSection] = useState("Interventions classiques");



    const toggleSection = (section: string) => {
        setOpenSections((prev) =>
            prev.includes(section)
                ? prev.filter((s) => s !== section)
                : [...prev, section]
        );
    };
    const [openSections, setOpenSections] = useState<string[]>([]);


    const NEW_OPTION = "__new__";
    const resolvedModel =
        formModelSelect === NEW_OPTION ? formModelInput.trim() : formModelSelect;

    const isCreatingNewModel = formModelSelect === NEW_OPTION;

    useEffect(() => {
        const init = async () => {
            const { data: sessionData, error: sessionError } =
                await supabase.auth.getSession();

            if (sessionError) {
                console.error("Erreur session :", sessionError);
                setLoading(false);
                return;
            }

            if (!sessionData.session) {
                setLoading(false);
                return;
            }

            setIsAuthenticated(true);
            await fetchPricing();
            setLoading(false);
        };

        init();
    }, []);

    const fetchPricing = async () => {
        const { data, error } = await supabase
            .from("pricing")
            .select("*")
            .order("category", { ascending: true })
            .order("brand", { ascending: true })
            .order("generation", { ascending: true })
            .order("model", { ascending: true })
            .order("repair_type", { ascending: true });

        if (error) {
            console.error("Erreur chargement tarifs :", error);
            setMessage("Impossible de charger les tarifs.");
            return;
        }

        const pricingRows = (data ?? []) as PricingRow[];
        setRows(pricingRows);

        if (pricingRows.length > 0) {
            const first = pricingRows[0];
            setSelectedCategory(first.category);
            setSelectedBrand(first.brand);
            setSelectedGeneration(first.generation ?? "");
            setSelectedModel(first.model);
        }
    };

    const categories = useMemo(() => {
        const values = Array.from(new Set(rows.map((row) => row.category)));
        return values.length ? values : ["TELEPHONE"];
    }, [rows]);

    const brands = useMemo(() => {
        if (!selectedCategory) return [];
        return Array.from(
            new Set(
                rows
                    .filter((row) => row.category === selectedCategory)
                    .map((row) => row.brand)
            )
        );
    }, [rows, selectedCategory]);

    const generations = useMemo(() => {
        if (!selectedCategory || !selectedBrand) return [];
        return Array.from(
            new Set(
                rows
                    .filter(
                        (row) =>
                            row.category === selectedCategory &&
                            row.brand === selectedBrand &&
                            row.generation
                    )
                    .map((row) => row.generation as string)
            )
        );
    }, [rows, selectedCategory, selectedBrand]);

    const models = useMemo(() => {
        if (!selectedCategory || !selectedBrand || !selectedGeneration) return [];
        return Array.from(
            new Set(
                rows
                    .filter(
                        (row) =>
                            row.category === selectedCategory &&
                            row.brand === selectedBrand &&
                            row.generation === selectedGeneration
                    )
                    .map((row) => row.model)
            )
        );
    }, [rows, selectedCategory, selectedBrand, selectedGeneration]);

    const filteredRows = useMemo(() => {
        return rows.filter(
            (row) =>
                row.category === selectedCategory &&
                row.brand === selectedBrand &&
                row.generation === selectedGeneration &&
                row.model === selectedModel
        );
    }, [rows, selectedCategory, selectedBrand, selectedGeneration, selectedModel]);

    const groupedFilteredRows = useMemo(() => {
        const groups: Record<string, PricingRow[]> = {};

        for (const row of filteredRows) {
            const sectionName = row.section || "Autres";

            if (!groups[sectionName]) {
                groups[sectionName] = [];
            }

            groups[sectionName].push(row);
        }

        return SECTIONS.filter((section) => groups[section]?.length).map((section) => ({
            section,
            rows: groups[section] as PricingRow[],
        }));
    }, [filteredRows]);

    const addBrandOptions = useMemo(() => {
        return Array.from(
            new Set(
                rows
                    .filter((row) => row.category === formCategory)
                    .map((row) => row.brand)
            )
        );
    }, [rows, formCategory]);

    const resolvedBrand =
        formBrandSelect === NEW_OPTION ? formBrandInput.trim() : formBrandSelect;

    const addGenerationOptions = useMemo(() => {
        if (!formCategory || !resolvedBrand) return [];
        return Array.from(
            new Set(
                rows
                    .filter(
                        (row) =>
                            row.category === formCategory &&
                            row.brand === resolvedBrand &&
                            row.generation
                    )
                    .map((row) => row.generation as string)
            )
        );
    }, [rows, formCategory, resolvedBrand]);

    const resolvedGeneration =
        formGenerationSelect === NEW_OPTION
            ? formGenerationInput.trim()
            : formGenerationSelect;

    const addModelOptions = useMemo(() => {
        if (!formCategory || !resolvedBrand || !resolvedGeneration) return [];
        return Array.from(
            new Set(
                rows
                    .filter(
                        (row) =>
                            row.category === formCategory &&
                            row.brand === resolvedBrand &&
                            row.generation === resolvedGeneration
                    )
                    .map((row) => row.model)
            )
        );
    }, [rows, formCategory, resolvedBrand, resolvedGeneration]);


    useEffect(() => {
        if (categories.length && !categories.includes(selectedCategory)) {
            setSelectedCategory(categories[0]);
        }
    }, [categories, selectedCategory]);

    useEffect(() => {
        if (brands.length) {
            if (!brands.includes(selectedBrand)) {
                setSelectedBrand(brands[0]);
                setSelectedGeneration("");
                setSelectedModel("");
            }
        } else {
            setSelectedBrand("");
            setSelectedGeneration("");
            setSelectedModel("");
        }
    }, [brands, selectedBrand]);

    useEffect(() => {
        if (generations.length) {
            if (!generations.includes(selectedGeneration)) {
                setSelectedGeneration(generations[0]);
                setSelectedModel("");
            }
        } else {
            setSelectedGeneration("");
            setSelectedModel("");
        }
    }, [generations, selectedGeneration]);

    useEffect(() => {
        if (models.length) {
            if (!models.includes(selectedModel)) {
                setSelectedModel(models[0]);
            }
        } else {
            setSelectedModel("");
        }
    }, [models, selectedModel]);

    const handleRowChange = (
        id: string,
        field: keyof Pick<PricingRow, "repair_type" | "price" | "section">,
        value: string
    ) => {
        setRows((prev) =>
            prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    };

    const handleSaveExisting = async () => {
        setSaving(true);
        setMessage("");

        try {
            for (const row of filteredRows) {
                const { error } = await supabase
                    .from("pricing")
                    .update({
                        repair_type: row.repair_type,
                        price: row.price,
                        section: row.section
                    })
                    .eq("id", row.id);

                if (error) throw error;
            }

            setMessage("Tarifs enregistrés avec succès.");
        } catch (error) {
            console.error("Erreur sauvegarde tarifs :", error);
            setMessage("Une erreur est survenue pendant l’enregistrement.");
        } finally {
            setSaving(false);
        }
    };

    const resetAddForm = (keepCategory = formCategory) => {
        setFormCategory(keepCategory);
        setFormBrandSelect("");
        setFormBrandInput("");
        setFormGenerationSelect("");
        setFormGenerationInput("");
        setFormModelSelect("");
        setFormModelInput("");
        setFormRepairType("");
        setFormPrice("");
        setFormSection("Interventions classiques");
    };

    const handleAddRow = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        try {
            const basePayload = {
                category: formCategory.trim().toUpperCase(),
                brand: resolvedBrand.trim().toUpperCase(),
                generation: resolvedGeneration.trim(),
                model: resolvedModel.trim().toUpperCase(),
            };

            if (
                !basePayload.category ||
                !basePayload.brand ||
                !basePayload.generation ||
                !basePayload.model
            ) {
                throw new Error("Formulaire incomplet");
            }

            if (isCreatingNewModel) {
                const rowsToInsert = DEFAULT_REPAIRS.map((item) => ({
                    ...basePayload,
                    repair_type: item.repair_type,
                    price: item.price,
                    section: item.section,
                }));



                const { error } = await supabase.from("pricing").insert(rowsToInsert);

                if (error) throw error;

                await fetchPricing();

                setSelectedCategory(basePayload.category);
                setSelectedBrand(basePayload.brand);
                setSelectedGeneration(basePayload.generation);
                setSelectedModel(basePayload.model);

                resetAddForm(basePayload.category);
                setMessage("Modèle créé avec les prestations par défaut.");
            } else {
                const payload = {
                    ...basePayload,
                    repair_type: formRepairType.trim(),
                    price: formPrice.trim(),
                    section: formSection,
                };

                if (!payload.repair_type || !payload.price) {
                    throw new Error("Formulaire incomplet");
                }

                const { error } = await supabase.from("pricing").insert(payload);

                if (error) throw error;

                await fetchPricing();

                setSelectedCategory(payload.category);
                setSelectedBrand(payload.brand);
                setSelectedGeneration(payload.generation);
                setSelectedModel(payload.model);

                resetAddForm(payload.category);
                setMessage("Ligne tarifaire ajoutée avec succès.");
            }
        } catch (error) {
            console.error("Erreur ajout tarif :", error);
            setMessage("Impossible d’ajouter cette ligne.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteRow = async (id: string) => {
        const confirmed = window.confirm(
            "Voulez-vous vraiment supprimer cette ligne tarifaire ?"
        );
        if (!confirmed) return;

        setSaving(true);
        setMessage("");

        try {
            const { error } = await supabase.from("pricing").delete().eq("id", id);

            if (error) throw error;

            await fetchPricing();
            setMessage("Ligne supprimée avec succès.");
        } catch (error) {
            console.error("Erreur suppression tarif :", error);
            setMessage("Impossible de supprimer cette ligne.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto card-premium p-8">
                            <p className="text-sm text-muted-foreground">
                                Chargement des tarifs...
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
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Administration
                                </p>
                                <h1 className="text-2xl md:text-4xl font-bold font-heading">
                                    Gestion des <span className="text-gradient">tarifs</span>
                                </h1>
                            </div>

                            <Link
                                to="/admin"
                                className="px-5 py-3 rounded-xl text-sm font-semibold border border-border/30 bg-card/60 hover:bg-card hover:shadow-premium transition-all duration-300"
                            >
                                Retour admin
                            </Link>
                        </div>

                        <div className="grid xl:grid-cols-[1fr_1.2fr] gap-8">
                            <div className="card-premium p-6 md:p-8 space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold font-heading mb-2">
                                        Ajouter une ligne tarifaire
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Ajoute une réparation à un modèle existant ou à un nouveau modèle.
                                    </p>
                                </div>

                                <form onSubmit={handleAddRow} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Appareil
                                            </label>
                                            <select
                                                value={formCategory}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFormCategory(value);
                                                    setFormBrandSelect("");
                                                    setFormBrandInput("");
                                                    setFormGenerationSelect("");
                                                    setFormGenerationInput("");
                                                    setFormModelSelect("");
                                                    setFormModelInput("");
                                                }}
                                                className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                            >
                                                {categories.map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                                {!categories.includes("TELEPHONE") && (
                                                    <option value="TELEPHONE">TELEPHONE</option>
                                                )}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Marque
                                            </label>
                                            <select
                                                value={formBrandSelect}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFormBrandSelect(value);
                                                    if (value !== NEW_OPTION) {
                                                        setFormBrandInput("");
                                                    }
                                                    setFormGenerationSelect("");
                                                    setFormGenerationInput("");
                                                    setFormModelSelect("");
                                                    setFormModelInput("");
                                                }}
                                                className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                                required
                                            >
                                                <option value="">Sélectionner</option>
                                                {addBrandOptions.map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}
                                                <option value={NEW_OPTION}>+ Nouvelle marque</option>
                                            </select>

                                            {formBrandSelect === NEW_OPTION && (
                                                <input
                                                    type="text"
                                                    value={formBrandInput}
                                                    onChange={(e) => setFormBrandInput(e.target.value)}
                                                    placeholder="Ex : APPLE"
                                                    className="mt-3 w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                                    required
                                                />
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Modèle
                                            </label>
                                            <select
                                                value={formGenerationSelect}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFormGenerationSelect(value);
                                                    if (value !== NEW_OPTION) {
                                                        setFormGenerationInput("");
                                                    }
                                                    setFormModelSelect("");
                                                    setFormModelInput("");
                                                }}
                                                className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                                required
                                                disabled={!resolvedBrand}
                                            >
                                                <option value="">Sélectionner</option>
                                                {addGenerationOptions.map((generation) => (
                                                    <option key={generation} value={generation}>
                                                        {generation}
                                                    </option>
                                                ))}
                                                <option value={NEW_OPTION}>+ Nouvelle génération</option>
                                            </select>

                                            {formGenerationSelect === NEW_OPTION && (
                                                <input
                                                    type="text"
                                                    value={formGenerationInput}
                                                    onChange={(e) => setFormGenerationInput(e.target.value)}
                                                    placeholder="Ex : iPhone 12"
                                                    className="mt-3 w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                                    required
                                                />
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Déclinaison
                                            </label>
                                            <select
                                                value={formModelSelect}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFormModelSelect(value);
                                                    if (value !== NEW_OPTION) {
                                                        setFormModelInput("");
                                                    }
                                                }}
                                                className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                                required
                                                disabled={!resolvedGeneration}
                                            >
                                                <option value="">Sélectionner</option>
                                                {addModelOptions.map((model) => (
                                                    <option key={model} value={model}>
                                                        {model}
                                                    </option>
                                                ))}
                                                <option value={NEW_OPTION}>+ Nouveau modèle</option>
                                            </select>

                                            {formModelSelect === NEW_OPTION && (
                                                <input
                                                    type="text"
                                                    value={formModelInput}
                                                    onChange={(e) => setFormModelInput(e.target.value)}
                                                    placeholder="Ex : IPHONE 12 Pro"
                                                    className="mt-3 w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                                    required
                                                />
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Section
                                            </label>
                                            <select
                                                value={formSection}
                                                onChange={(e) => setFormSection(e.target.value)}
                                                className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                            >
                                                {SECTIONS.map((section) => (
                                                    <option key={section} value={section}>
                                                        {section}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {isCreatingNewModel ? (
                                            <div className="rounded-xl border border-border/20 bg-card/50 px-4 py-4 text-sm text-muted-foreground">
                                                Le nouveau modèle sera créé automatiquement avec toutes les prestations par défaut.
                                                Tu pourras ensuite modifier les prix, supprimer des lignes ou en ajouter d’autres dans le panneau de droite.
                                            </div>
                                        ) : (
                                            <>
                                                <div className="min-w-0 md:col-span-2">
                                                    <label className="block text-sm font-semibold mb-2">
                                                        Réparation
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formRepairType}
                                                        onChange={(e) => setFormRepairType(e.target.value)}
                                                        className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                                        required={!isCreatingNewModel}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold mb-2">
                                                        Prix
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formPrice}
                                                        onChange={(e) => setFormPrice(e.target.value)}
                                                        placeholder="Ex : 109€"
                                                        className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                                        required={!isCreatingNewModel}
                                                    />
                                                </div>
                                            </>
                                        )}

                                        <div className="flex justify-end">
                                            <div className="h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent mb-2" />
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="btn-premium px-6 py-3 rounded-xl text-sm disabled:opacity-70"
                                            >
                                                {saving ? "Ajout..." : isCreatingNewModel ? "Créer le modèle" : "Ajouter la ligne"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="card-premium p-6 md:p-8 space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold font-heading mb-4">
                                        Modifier les tarifs existants
                                    </h2>

                                    <div className="grid md:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Appareil
                                            </label>
                                            <select
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                            >
                                                {categories.map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Marque
                                            </label>
                                            <select
                                                value={selectedBrand}
                                                onChange={(e) => setSelectedBrand(e.target.value)}
                                                className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                            >
                                                {brands.map((brand) => (
                                                    <option key={brand} value={brand}>
                                                        {brand}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Modèle
                                            </label>
                                            <select
                                                value={selectedGeneration}
                                                onChange={(e) => setSelectedGeneration(e.target.value)}
                                                className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                            >
                                                {generations.map((generation) => (
                                                    <option key={generation} value={generation}>
                                                        {generation}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2">
                                                Déclinaison
                                            </label>
                                            <select
                                                value={selectedModel}
                                                onChange={(e) => setSelectedModel(e.target.value)}
                                                className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                            >
                                                {models.map((model) => (
                                                    <option key={model} value={model}>
                                                        {model}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {filteredRows.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            Aucune ligne tarifaire pour cette sélection.
                                        </p>
                                    ) : (
                                        groupedFilteredRows.map((group) => {
                                            const isOpen = openSections.includes(group.section);

                                            return (
                                                <div key={group.section} className="space-y-3">
                                                    {/* HEADER CLIQUABLE */}
                                                    <button
                                                        onClick={() => toggleSection(group.section)}
                                                        className="w-full flex justify-between items-center rounded-xl px-4 py-3 bg-card/60 hover:bg-card transition border border-accent/20"
                                                    >
                                                        <span className="text-gradient font-bold text-sm">
                                                            {group.section}
                                                        </span>

                                                        <span className="text-xs text-muted-foreground">
                                                            {group.rows.length} ligne{group.rows.length > 1 ? "s" : ""}
                                                            {"  "}
                                                            {isOpen ? "▲" : "▼"}
                                                        </span>
                                                    </button>

                                                    {/* CONTENU */}
                                                    {isOpen && (
                                                        <div className="space-y-4 pl-2">
                                                            {group.rows.map((row: PricingRow) => (
                                                                <div
                                                                    key={row.id}
                                                                    className="border border-border/20 rounded-2xl p-4"
                                                                >
                                                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 items-end">
                                                                        <div className="md:col-span-4 min-w-0">
                                                                            <label className="block text-sm font-semibold mb-2">
                                                                                Section
                                                                            </label>
                                                                            <select
                                                                                value={row.section ?? "Autres"}
                                                                                onChange={(e) =>
                                                                                    handleRowChange(row.id, "section", e.target.value)
                                                                                }
                                                                                className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                                                            >
                                                                                {SECTIONS.map((section) => (
                                                                                    <option key={section} value={section}>
                                                                                        {section}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>

                                                                        <div className="md:col-span-4 min-w-0">
                                                                            <label className="block text-sm font-semibold mb-2">
                                                                                Réparation
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                value={row.repair_type}
                                                                                onChange={(e) =>
                                                                                    handleRowChange(row.id, "repair_type", e.target.value)
                                                                                }
                                                                                className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                                                            />
                                                                        </div>

                                                                        <div className="md:col-span-2 min-w-0">
                                                                            <label className="block text-sm font-semibold mb-2">
                                                                                Prix
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                value={row.price}
                                                                                onChange={(e) =>
                                                                                    handleRowChange(row.id, "price", e.target.value)
                                                                                }
                                                                                className="w-full rounded-xl border border-border/30 bg-card/60 px-4 py-3 text-sm outline-none focus:border-accent"
                                                                            />
                                                                        </div>

                                                                        <div className="md:col-span-2">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleDeleteRow(row.id)}
                                                                                className="w-full px-4 py-3 rounded-xl text-sm font-semibold border border-border/30 bg-card/60 hover:bg-card transition-all duration-300"
                                                                            >
                                                                                Suppr
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                {message && (
                                    <div className="rounded-xl border border-border/20 bg-card/50 px-4 py-3 text-sm">
                                        {message}
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleSaveExisting}
                                        disabled={saving || filteredRows.length === 0}
                                        className="btn-premium px-6 py-3 rounded-xl text-sm disabled:opacity-70"
                                    >
                                        {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AdminPricing;