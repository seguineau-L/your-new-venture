import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
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

type ModelPricing = {
  model: string;
  sections: {
    title: string;
    items: { label: string; price: string }[];
  }[];
};

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
        setPricingLoading(false);
        return;
      }

      const rows = (data ?? []) as PricingRow[];
      setPricingRows(rows);
      setPricingLoading(false);
    };

    fetchPricing();
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(pricingRows.map((row) => row.category)));
  }, [pricingRows]);

  const isTelephoneCategory = selectedCategory === "TELEPHONE";

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
    return Array.from(
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

      const orderedSections = [
        "Interventions classiques",
        "Interventions sur carte mère",
        "Récupération de données",
        "Autres",
      ];

      return {
        model: modelName,
        sections: orderedSections
          .filter((section) => groupedBySection[section]?.length)
          .map((section) => ({
            title: section,
            items: groupedBySection[section],
          })),
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
      className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${active
        ? "btn-premium"
        : "bg-card/60 text-muted-foreground hover:bg-card hover:shadow-premium border border-border/30"
        }`}
    >
      {children}
    </button>
  );

  return (
    <Layout>
      <section className="py-16 md:py-24" ref={scrollRef}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_auto_1.2fr] gap-10 lg:gap-12 items-start">
            <div className="space-y-8 scroll-reveal max-w-sm mx-auto">
              <div className="text-center">
                <h1 className="text-2xl md:text-4xl font-bold font-heading mb-3">
                  NOS <span className="text-gradient">TARIFS</span>
                </h1>
                <p className="text-muted-foreground text-sm">
                  Sélectionnez la catégorie de votre appareil
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

              {selectedCategory && isTelephoneCategory && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-lg font-bold mb-4 font-heading uppercase">
                    Marque
                  </h2>
                  <div className="flex flex-wrap gap-3">
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

              {selectedCategory && selectedBrand && isTelephoneCategory && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-lg font-bold mb-4 font-heading uppercase">
                    Modèle
                  </h2>
                  <div className="flex flex-wrap gap-3">
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

              {selectedCategory &&
                selectedBrand &&
                selectedGeneration &&
                isTelephoneCategory && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h2 className="text-lg font-bold mb-4 font-heading uppercase">
                      Déclinaison
                    </h2>
                    <div className="flex flex-wrap gap-3">
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

              {selectedCategory && !isTelephoneCategory && (
                <div className="card-premium p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p className="text-muted-foreground text-sm">
                    Pour les réparations de{" "}
                    <strong>{selectedCategory.toLowerCase()}</strong>, contactez-nous
                    pour un devis personnalisé.
                  </p>
                </div>
              )}
            </div>

            <div className="hidden lg:flex justify-center self-stretch">
              <div className="divider-glow-vertical self-stretch min-h-full" />
            </div>

            <div className="scroll-reveal">
              {pricingLoading ? (
                <div className="card-premium p-7 md:p-10 border-peach/20 min-h-[420px] flex items-center justify-center">
                  <p className="text-sm text-muted-foreground text-center max-w-sm">
                    Chargement des tarifs...
                  </p>
                </div>
              ) : isTelephoneCategory && currentModel ? (
                <div className="card-premium p-7 md:p-10 border-peach/20 animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="space-y-8">
                    {currentModel.sections.map((section) => (
                      <div key={section.title}>
                        <div className="flex justify-between items-center mb-5 pb-2 border-b border-accent/20">
                          <h3 className="text-gradient font-bold text-base">
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
                              className="flex justify-between items-center py-2 border-b border-border/20 last:border-0 hover:bg-accent/5 px-2 -mx-2 rounded-lg transition-colors duration-200"
                            >
                              <span className="text-sm">{item.label}</span>
                              <span className="text-sm font-semibold text-right ml-4">
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
                  <p className="text-sm text-muted-foreground text-center max-w-sm">
                    Sélectionnez un appareil, puis une marque, un modèle et une déclinaison pour afficher les tarifs correspondants.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tarifs;