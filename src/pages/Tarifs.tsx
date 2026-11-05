import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { supabase } from "@/lib/supabase";
import CircuitLoader from "@/components/CircuitLoader";
import logoImg from "@/assets/icons/momuy-tech-top-logo.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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

type ModelPricing = {
  model: string;
  sections: {
    title: string;
    items: { label: string; price: string }[];
  }[];
};

const PRICING_CACHE_KEY = "pricing_cache_v5";
const PRICING_CACHE_DURATION = 1000 * 60 * 10; // 10 minutes
const PRICE_PLACEHOLDER = "Tarif à venir";

const EXCLUDED_CATEGORIES = new Set(["PROTECTION", "MICRO-SOUDURE", "DIAGNOSTIC"]);

const normalizePricingRows = (rows: PricingRow[]): PricingRow[] => {
  const seen = new Map<string, PricingRow>();
  for (const row of rows) {
    let category = row.category;
    let brand = row.brand;
    let generation = row.generation;
    let model = row.model;
    let repairType = row.repair_type;
    let section = row.section;

    if (category === "ORDINATEUR PORTABLE") {
      category = "PC";
    }

    if (EXCLUDED_CATEGORIES.has(category)) {
      continue;
    }

    // Exclusion des prestations non proposées pour le moment
    if (
      section === "Récupération de données" ||
      repairType?.toLowerCase().includes("récupération de données") ||
      repairType?.toLowerCase().includes("effacement de données") ||
      repairType?.toLowerCase().includes("joystick")
    ) {
      continue;
    }

    // Exclusion des modèles génériques PC non souhaités
    if (category === "PC") {
      const upperModel = model?.toUpperCase() || "";
      if (
        upperModel.includes("PC PORTABLE (TOUTES MARQUES)") ||
        upperModel.includes("PC PORTABLE & CARTE GRAPHIQUE")
      ) {
        continue;
      }
      if (brand === "TOUTES MARQUES" || brand === "AUTRE") {
        brand = "ENTRETIEN";
      }
    }

    if (category === "CONSOLE" && (brand === "AUTRE" || brand === "RÉTRO" || brand === "RETRO")) {
      brand = "RÉTRO";
      if (!generation || generation === "Consoles" || generation === "Sans génération") {
        generation = "Game Boy";
      }
    }

    if (category === "TELEPHONE" && brand === "APPLE") {
      if (generation === "Autres iPhone" || model?.toUpperCase().includes("IPHONE 17")) {
        generation = "iPhone 17";
      }
    }

    if (category === "CONSOLE" && brand === "NINTENDO") {
      if (repairType === "USB-C soudé") {
        repairType = "Connecteur USB-C soudé";
      }
      if (model === "NINTENDO SWITCH / OLED" || model?.includes("OLED")) {
        model = "NINTENDO SWITCH OLED";
      } else if (model?.includes("V1") || model?.includes("V2") || model === "NINTENDO SWITCH") {
        model = "NINTENDO SWITCH V1/V2";
      }
    }

    const key = `${category}||${brand}||${generation ?? ""}||${model}||${repairType}`;
    const cleanedPrice =
      row.price && row.price.trim().length > 0 ? row.price.trim() : PRICE_PLACEHOLDER;
    const item = { ...row, category, brand, generation, model, repair_type: repairType, section, price: cleanedPrice };

    if (!seen.has(key)) {
      seen.set(key, item);
    } else {
      const existing = seen.get(key)!;
      if (existing.price === PRICE_PLACEHOLDER && cleanedPrice !== PRICE_PLACEHOLDER) {
        seen.set(key, item);
      }
    }
  }

  // Symétrie des prestations pour les deux déclinaisons Nintendo Switch
  const switchModels = ["NINTENDO SWITCH V1/V2", "NINTENDO SWITCH OLED"];
  const switchPrestations = [
    { repair_type: "Écran", section: "Interventions classiques", defaultPrice: "Tarif à venir" },
    { repair_type: "Vitre tactile seule", section: "Interventions classiques", defaultPrice: "Tarif à venir" },
    { repair_type: "Batterie", section: "Interventions classiques", defaultPrice: "79 €" },
    { repair_type: "Connecteur USB-C soudé", section: "Interventions sur carte mère", defaultPrice: "109 €" },
  ];

  for (const m of switchModels) {
    for (const p of switchPrestations) {
      const key = `CONSOLE||NINTENDO||Nintendo Switch||${m}||${p.repair_type}`;
      if (!seen.has(key)) {
        seen.set(key, {
          id: `nintendo-${m}-${p.repair_type}`,
          category: "CONSOLE",
          brand: "NINTENDO",
          generation: "Nintendo Switch",
          model: m,
          repair_type: p.repair_type,
          price: p.defaultPrice,
          section: p.section,
        });
      }
    }
  }

  // Prestations Joysticks pour la catégorie MANETTES (uniquement ces 3 lignes dans cet ordre)
  const joystickPrestations = [
    { repair_type: "Remplacement 1 Joystick standard", price: "25 €" },
    { repair_type: "Remplacement Paire Joystick standard", price: "39 €" },
    { repair_type: "Remplacement Paire Joystick TMR (Haut de gamme)", price: "49 €" },
  ];

  for (let i = 0; i < joystickPrestations.length; i++) {
    const j = joystickPrestations[i];
    const key = `MANETTES||TOUTES MARQUES||Manettes||MANETTE PLAYSTATION 5 / XBOX SERIES||${j.repair_type}`;
    seen.set(key, {
      id: `manettes-${i}`,
      category: "MANETTES",
      brand: "TOUTES MARQUES",
      generation: "Manettes",
      model: "MANETTE PLAYSTATION 5 / XBOX SERIES",
      repair_type: j.repair_type,
      price: j.price,
      section: "Interventions classiques",
    });
  }

  return Array.from(seen.values());
};

const SECTION_ORDER = [
  "Interventions classiques",
  "Interventions sur carte mère",
  "Entretien & Thermique",
  "Diagnostic & Recherche de panne",
  "Accessoires & Protections",
  "Autres",
];


const Tarifs = () => {
  const scrollRef = useScrollReveal();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const [pricingRows, setPricingRows] = useState<PricingRow[]>([]);
  const [pricingLoading, setPricingLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      setPricingLoading(true);

      // 🔥 1. Charger le cache immédiatement
      const cached = localStorage.getItem(PRICING_CACHE_KEY);

      if (cached) {
        try {
          const parsedCache = JSON.parse(cached) as {
            data: PricingRow[];
            timestamp: number;
          };

          const isExpired =
            Date.now() - parsedCache.timestamp > PRICING_CACHE_DURATION;

          if (!isExpired) {
            setPricingRows(normalizePricingRows(parsedCache.data));
            setTimeout(() => {
              setPricingLoading(false);
            }, 800);
          } else {
            localStorage.removeItem(PRICING_CACHE_KEY);
          }
        } catch {
          localStorage.removeItem(PRICING_CACHE_KEY);
        }
      }

      // 🔄 2. Fetch Supabase (mise à jour silencieuse)
      const { data, error } = await supabase
        .from("pricing")
        .select("*")
        .range(0, 4999)
        .order("category", { ascending: true })
        .order("brand", { ascending: true })
        .order("generation", { ascending: true })
        .order("model", { ascending: true })
        .order("section", { ascending: true })
        .order("repair_type", { ascending: true });

      if (error) {
        console.error("Erreur chargement tarifs :", error);
        setPricingLoading(false);
        return;
      }

      const freshData = normalizePricingRows((data ?? []) as PricingRow[]);

      setPricingRows(freshData);

      // 💾 3. Sauvegarde cache
      localStorage.setItem(
        PRICING_CACHE_KEY,
        JSON.stringify({
          data: freshData,
          timestamp: Date.now(),
        })
      );

      setPricingLoading(false);
    };

    fetchPricing();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(pricingRows.map((row) => row.category)));
    const ORDER = [
      "TELEPHONE",
      "TABLETTE",
      "PC",
      "CONSOLE",
      "MANETTES",
      "MONTRE",
      "ECOUTEURS",
    ];

    return cats.sort((a, b) => {
      const indexA = ORDER.indexOf(a);
      const indexB = ORDER.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [pricingRows]);

  const brands = useMemo(() => {
    if (!selectedCategory) return [];

    if (selectedCategory === "TELEPHONE") {
      return ["APPLE", "SAMSUNG", "AUTRE MARQUE"];
    }

    if (selectedCategory === "TABLETTE") {
      return ["TOUTES MARQUES"];
    }

    if (selectedCategory === "PC") {
      return ["ENTRETIEN", "AUTRE RÉPARATION"];
    }

    if (selectedCategory === "MANETTES") {
      return ["TOUTES MARQUES"];
    }

    if (selectedCategory === "CONSOLE") {
      const CONSOLE_ORDER = ["NINTENDO", "SONY", "MICROSOFT", "RÉTRO"];
      const currentBrands = Array.from(
        new Set(
          pricingRows
            .filter((row) => row.category === selectedCategory)
            .map((row) => row.brand)
        )
      );
      return currentBrands.sort((a, b) => {
        const idxA = CONSOLE_ORDER.indexOf(a);
        const idxB = CONSOLE_ORDER.indexOf(b);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b);
      });
    }

    return Array.from(
      new Set(
        pricingRows
          .filter((row) => row.category === selectedCategory)
          .map((row) => row.brand)
      )
    );
  }, [pricingRows, selectedCategory]);

  const generations = useMemo(() => {
    if (!selectedCategory || !selectedBrand) return [];

    const gens = Array.from(
      new Set(
        pricingRows
          .filter(
            (row) =>
              row.category === selectedCategory &&
              row.brand === selectedBrand &&
              row.generation
          )
          .map((row) => row.generation as string)
      )
    );

    // 🔥 TRI DU PLUS RÉCENT AU PLUS ANCIEN
    return gens.sort((a, b) => {
      const getNumber = (str: string) => {
        const match = str.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };

      return getNumber(b) - getNumber(a);
    });
  }, [pricingRows, selectedCategory, selectedBrand]);

  const isDirectModelCategory =
    (selectedCategory === "PC" && selectedBrand === "ENTRETIEN") ||
    selectedCategory === "MANETTES";

  const models: ModelPricing[] = useMemo(() => {
    if (!selectedCategory || !selectedBrand) return [];
    if (!isDirectModelCategory && !selectedGeneration) return [];

    const modelNames = Array.from(
      new Set(
        pricingRows
          .filter(
            (row) =>
              row.category === selectedCategory &&
              row.brand === selectedBrand &&
              (isDirectModelCategory || row.generation === selectedGeneration)
          )
          .map((row) => row.model)
      )
    );

    return modelNames.map((modelName) => {
      const rowsForModel = pricingRows.filter(
        (row) =>
          row.category === selectedCategory &&
          row.brand === selectedBrand &&
          (isDirectModelCategory || row.generation === selectedGeneration) &&
          row.model === modelName
      );

      const groupedBySection = rowsForModel.reduce(
        (acc, row) => {
          const sectionName = row.section || "Autres";

          if (!acc[sectionName]) {
            acc[sectionName] = [];
          }

          acc[sectionName].push({
            label: row.repair_type,
            price: row.price,
          });

          return acc;
        },
        {} as Record<string, { label: string; price: string }[]>
      );

      return {
        model: modelName,
        sections: SECTION_ORDER.filter((section) => groupedBySection[section]?.length).map(
          (section) => ({
            title: section,
            items: groupedBySection[section],
          })
        ),
      };
    });
  }, [pricingRows, selectedCategory, selectedBrand, selectedGeneration, isDirectModelCategory]);

  const currentModel = useMemo(() => {
    if (!selectedModel) return null;
    return models.find((m) => m.model === selectedModel) ?? null;
  }, [models, selectedModel]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedBrand(null);
    setSelectedGeneration(null);
    setSelectedModel(null);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedGeneration(null);
    setSelectedModel(null);
  };


  const isQuoteOnly =
    (selectedCategory === "TELEPHONE" && selectedBrand === "AUTRE MARQUE") ||
    (selectedCategory === "TABLETTE" && selectedBrand === "TOUTES MARQUES") ||
    (selectedCategory === "PC" && selectedBrand === "AUTRE RÉPARATION");

  const quoteTitle =
    selectedCategory === "TELEPHONE"
      ? "Prix disponible en magasin"
      : selectedCategory === "TABLETTE"
      ? "Prix disponible en magasin"
      : "Réparation PC & Mac sur devis";

  const quoteText =
    selectedCategory === "TELEPHONE"
      ? "Nous réparons de nombreuses autres marques de smartphones (Xiaomi, Google Pixel, Huawei, Honor, Oppo, Motorola, etc.) dans notre atelier. Retrouvez nos tarifs et devis personnalisés directement en boutique."
      : selectedCategory === "TABLETTE"
      ? "Nous réparons les iPad ainsi que toutes les marques de tablettes Android (Samsung, Lenovo, Xiaomi, Huawei...) dans notre atelier. Retrouvez nos tarifs et devis personnalisés directement en boutique."
      : "Pour toute réparation matérielle (écran cassé, batterie, connecteur, clavier, carte mère ou réinstallation système), nous établissons un devis personnalisé directement en boutique.";


  const handleGenerationChange = (generation: string) => {
    setSelectedGeneration(generation);
    setSelectedModel(null);
  };

  const FilterButton = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-xl text-sm font-semibold uppercase tracking-wide transition-all duration-300 border ${active
        ? "bg-[#d87532] border-[#d87532] text-white shadow-lg"
        : "bg-[#f7f1e8] border-[#d8c8b5] text-[#102337] hover:bg-white hover:border-[#d87532]/50"
        }`}
    >
      {children}
    </button>
  );


  return (
    <Layout>
      <Helmet>
        <title>
          Tarifs de réparation | Smartphones, PC & Cartes électroniques | MOMUY & TECH
        </title>

        <meta
          name="description"
          content="Consultez les tarifs de réparation de smartphones, tablettes, PC, consoles et cartes électroniques chez MOMUY & TECH à Momuy. Sélectionnez votre appareil ou demandez un diagnostic."
        />
        <link rel="canonical" href="https://momuy-tech.fr/tarifs" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Tarifs de réparation à Momuy",
            url: "https://momuy-tech.fr/tarifs",
            description: "Tarifs de réparation de smartphones, tablettes, PC, consoles et cartes électroniques chez MOMUY & TECH.",
            isPartOf: { "@type": "WebSite", name: "MOMUY & TECH", url: "https://momuy-tech.fr/" },
          })}
        </script>
      </Helmet>
      <section className="py-16 md:py-24 bg-[#f4efe7] text-[#102337]" ref={scrollRef}>
        <div className="container mx-auto px-4">
          <nav aria-label="Fil d’Ariane" className="mb-8 text-center text-sm text-[#52606c]">
            <Link to="/" className="hover:text-[#d87532]">Accueil</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span>Tarifs de réparation</span>
          </nav>
          <div className="grid lg:grid-cols-[1fr_auto_1.2fr] gap-10 lg:gap-12 items-start">
            <div className="space-y-8 scroll-reveal max-w-sm mx-auto">
              <div className="text-center">
                <h1 className="font-serif text-3xl md:text-5xl leading-[0.95] font-bold text-[#102337] mb-2 uppercase">
                  NOS TARIFS DE RÉPARATION
                </h1>
                <p className="text-sm font-semibold text-[#d87532] uppercase tracking-[0.2em] mb-10">
                  réparation smartphone, tablette, pc, montre, écouteurs et carte électronique
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold mb-4 font-heading uppercase">
                  Appareil
                </h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <FilterButton
                      key={cat}
                      active={selectedCategory === cat}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat}
                    </FilterButton>
                  ))}
                </div>
              </div>

              {selectedCategory && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-lg font-bold mb-4 font-heading uppercase">
                    Marque
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => (
                      <FilterButton
                        key={brand}
                        active={selectedBrand === brand}
                        onClick={() => handleBrandChange(brand)}
                      >
                        {brand}
                      </FilterButton>
                    ))}
                  </div>
                </div>
              )}

              {selectedCategory && selectedBrand && !isQuoteOnly && !isDirectModelCategory && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-lg font-bold mb-4 font-heading uppercase">
                    Modèle
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {generations.map((generation) => (
                      <FilterButton
                        key={generation}
                        active={selectedGeneration === generation}
                        onClick={() => handleGenerationChange(generation)}
                      >
                        {generation}
                      </FilterButton>
                    ))}
                  </div>
                </div>
              )}

              {selectedCategory && selectedBrand && !isQuoteOnly && (isDirectModelCategory || selectedGeneration) && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-lg font-bold mb-4 font-heading uppercase">
                    Déclinaison
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {models.map((m) => (
                      <FilterButton
                        key={m.model}
                        active={selectedModel === m.model}
                        onClick={() => setSelectedModel(m.model)}
                      >
                        {m.model}
                      </FilterButton>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden lg:flex justify-center self-stretch">
              <div className="divider-glow-vertical self-stretch min-h-full" />
            </div>


            <div className="scroll-reveal">
              {isQuoteOnly ? (
                <div className="rounded-2xl bg-[#f7f1e8] border border-[#d8c8b5] shadow-sm p-8 md:p-10 text-center">
                  <h2 className="text-3xl font-bold text-[#102337] mb-6">
                    {quoteTitle}
                  </h2>

                  <p className="text-[#102337] leading-relaxed mb-4">
                    {quoteText}
                  </p>

                  <p className="text-[#102337] leading-relaxed mb-8">
                    En raison des nombreuses références et configurations existantes,
                    nous ne pouvons pas afficher un tarif unique.
                  </p>

                  <p className="text-[#102337] leading-relaxed mb-8">
                    Nous vous invitons à venir directement en boutique avec votre appareil
                    afin d'obtenir un devis adapté à votre réparation.
                  </p>

                  <Link
                    to="/contact"
                    className="inline-flex items-center rounded-xl bg-[#d87532] px-6 py-3 font-semibold text-white hover:bg-[#c96325] transition"
                  >
                    Venir en boutique
                  </Link>
                </div>
              ) : selectedModel && pricingLoading && pricingRows.length === 0 ? (
                <CircuitLoader />
              ) : currentModel ? (
                <div className="rounded-2xl bg-[#f7f1e8] border border-[#d8c8b5] shadow-sm p-5 md:p-8 animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="space-y-5">
                    {currentModel.sections.map((section) => (
                      <div
                        key={section.title}
                        className="rounded-xl bg-white/60 p-4 border border-[#d8c8b5]/50"
                      >
                        <div className="flex justify-between items-center mb-3 pb-1 border-b border-[#d8c8b5]/40">
                          <h3 className="text-[#d87532] font-bold text-sm tracking-wide uppercase">
                            {section.title}
                          </h3>
                          <span className="font-bold text-sm text-[#102337]">
                            Tarif
                          </span>
                        </div>

                        <div className="space-y-0">
                          {section.items.map((item) => {
                            const isPlaceholder = item.price.toLowerCase().includes("tarif à venir");
                            return (
                              <div
                                key={item.label}
                                className="flex justify-between items-center py-2 border-b border-[#d8c8b5]/30 last:border-0 hover:bg-white/80 px-2 -mx-2 rounded-lg transition-colors duration-200"
                              >
                                <span className="text-sm text-[#102337] font-medium">{item.label}</span>
                                <span
                                  className={`text-sm text-right ml-4 min-w-[70px] ${
                                    isPlaceholder
                                      ? "font-normal text-[#7a6b5d] italic"
                                      : "font-bold text-[#d87532]"
                                  }`}
                                >
                                  {item.price}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-[#f7f1e8] border border-[#d8c8b5] p-7 md:p-10 min-h-[420px] flex items-center justify-center">
                  <p className="text-sm text-[#52606c] text-center max-w-sm">
                    Sélectionnez un appareil, puis une marque, un modèle et une déclinaison pour afficher les tarifs correspondants.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout >
  );
};

export default Tarifs;