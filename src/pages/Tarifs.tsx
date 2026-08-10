import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { supabase } from "@/lib/supabase";
import CircuitLoader from "@/components/CircuitLoader";
import logoImg from "@/assets/icons/momuy-tech-algerian.svg";
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

const PRICING_CACHE_KEY = "pricing_cache_v1";
const PRICING_CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

const SECTION_ORDER = [
  "Interventions classiques",
  "Interventions sur carte mère",
  "Récupération de données",
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
            setPricingRows(parsedCache.data);
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

      const freshData = (data ?? []) as PricingRow[];

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
      "ORDINATEUR PORTABLE",
      "CONSOLE",
    ];

    return cats.sort(
      (a, b) => ORDER.indexOf(a) - ORDER.indexOf(b)
    );
    // 🔥 PRIORITÉ TELEPHONE
    return cats.sort((a, b) => {
      if (a === "TELEPHONE") return -1;
      if (b === "TELEPHONE") return 1;
      return a.localeCompare(b);
    });
  }, [pricingRows]);

  const brands = useMemo(() => {
    if (!selectedCategory) return [];

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

  const models: ModelPricing[] = useMemo(() => {
    if (!selectedCategory || !selectedBrand || !selectedGeneration) return [];

    const modelNames = Array.from(
      new Set(
        pricingRows
          .filter(
            (row) =>
              row.category === selectedCategory &&
              row.brand === selectedBrand &&
              row.generation === selectedGeneration
          )
          .map((row) => row.model)
      )
    );

    return modelNames.map((modelName) => {
      const rowsForModel = pricingRows.filter(
        (row) =>
          row.category === selectedCategory &&
          row.brand === selectedBrand &&
          row.generation === selectedGeneration &&
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
  }, [pricingRows, selectedCategory, selectedBrand, selectedGeneration]);

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
    (selectedCategory === "ORDINATEUR PORTABLE" &&
      (selectedBrand === "APPLE" || selectedBrand === "AUTRE")) ||
    (selectedCategory === "TABLETTE" &&
      (selectedBrand === "APPLE" || selectedBrand === "AUTRE"));

  const quoteTitle =
    selectedCategory === "TABLETTE"
      ? "Réparation de tablette"
      : "Réparation d'ordinateur portable";

  const quoteText =
    selectedCategory === "TABLETTE"
      ? "Nous réparons les iPad ainsi que les tablettes Android dans notre atelier."
      : "Nous réparons les MacBook ainsi que les ordinateurs portables Windows dans notre atelier.";


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
          content="Consultez les tarifs de réparation de smartphones, tablettes et autres appareils. Pour les ordinateurs, cartes électroniques et réparations complexes, rendez-vous en boutique pour un diagnostic personnalisé."
        />
      </Helmet>
      <section className="py-16 md:py-24 bg-[#f4efe7] text-[#102337]" ref={scrollRef}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_auto_1.2fr] gap-10 lg:gap-12 items-start">
            <div className="space-y-8 scroll-reveal max-w-sm mx-auto">
              <div className="text-center">
                <h1 className="font-serif text-3xl md:text-5xl leading-[0.95] font-bold text-[#102337] mb-2 uppercase">
                  NOS TARIFS DE RÉPARATION
                </h1>
                <p className="text-sm font-semibold text-[#d87532] uppercase tracking-[0.2em] mb-6">
                  réparation smartphone, pc, tablette
                </p>
                <div className="max-w-[280px] mx-auto h-px bg-[#d87532]/20 mb-6" />
                <p className="text-[#52606c] text-sm leading-relaxed mb-10 italic">
                  Consultez nos forfaits pour la réparation de vos téléphones et smartphones. 
                  Notre atelier à Momuy prend également en charge les tablettes et ordinateurs, ainsi que vos besoins en micro-soudure.
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
                        {brand === "AUTRE"
                          ? selectedCategory === "TABLETTE"
                            ? "ANDROID"
                            : "WINDOWS"
                          : brand}
                      </FilterButton>
                    ))}
                  </div>
                </div>
              )}

              {selectedCategory && selectedBrand && !isQuoteOnly && (
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

              {selectedCategory && selectedBrand && selectedGeneration && (
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
                <div className="rounded-2xl bg-[#f7f1e8] border border-[#d8c8b5] shadow-sm">
                  <div className="space-y-5">
                    {currentModel.sections.map((section) => (
                      <div
                        key={section.title}
                        className="rounded-xl bg-white/60 p-4 border border-border/20"
                      >
                        <div className="flex justify-between items-center mb-3 pb-1 border-b border-accent/10">
                          <h3 className="text-[#d87532] font-bold text-sm tracking-wide uppercase">
                            {section.title}
                          </h3>
                          <span className="text-gradient font-bold text-sm">
                            Prix (€ TTC)
                          </span>
                        </div>

                        <div className="space-y-0">
                          {section.items.map((item) => (
                            <div
                              key={item.label}
                              className="flex justify-between items-center py-1.5 border-b border-border/20 last:border-0 hover:bg-accent/10 px-2 -mx-2 rounded-lg transition-colors duration-200"
                            >
                              <span className="text-sm">{item.label}</span>
                              <span className="text-sm font-semibold text-right ml-4 min-w-[70px]">
                                {item.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : currentModel ? (
                <div className="card-premium p-7 md:p-10 border-peach/20 animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="space-y-5">
                    {currentModel.sections.map((section) => (
                      <div
                        key={section.title}
                        className="rounded-xl bg-card/40 p-4 border border-border/20"
                      >
                        <div className="flex justify-between items-center mb-3 pb-1 border-b border-accent/10">
                          <h3 className="text-gradient font-bold text-sm tracking-wide uppercase">
                            {section.title}
                          </h3>
                          <span className="text-gradient font-bold text-sm">
                            Prix (€ TTC)
                          </span>
                        </div>

                        <div className="space-y-0">
                          {section.items.map((item) => (
                            <div
                              key={item.label}
                              className="flex justify-between items-center py-1.5 border-b border-border/20 last:border-0 hover:bg-accent/10 px-2 -mx-2 rounded-lg transition-colors duration-200"
                            >
                              <span className="text-sm">{item.label}</span>
                              <span className="text-sm font-semibold text-right ml-4 min-w-[70px]">
                                {item.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="card-premium p-7 md:p-10 border-peach/20 min-h-[420px] flex items-center justify-center">
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