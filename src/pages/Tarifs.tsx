import { useState } from "react";
import Layout from "@/components/Layout";
import { categories, brands, applePricing, androidPricing, type Category, type Brand, type ModelPricing } from "@/data/pricing";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Tarifs = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("TELEPHONE");
  const [selectedBrand, setSelectedBrand] = useState<Brand>("APPLE");
  const [selectedModel, setSelectedModel] = useState<string>("IPHONE 16");
  const scrollRef = useScrollReveal();

  const models: ModelPricing[] = selectedBrand === "APPLE" ? applePricing : androidPricing;
  const currentModel = models.find((m) => m.model === selectedModel) || models[0];

  const handleBrandChange = (brand: Brand) => {
    setSelectedBrand(brand);
    const newModels = brand === "APPLE" ? applePricing : androidPricing;
    setSelectedModel(newModels[0]?.model || "");
  };

  const isTelephoneCategory = selectedCategory === "TELEPHONE";

  const FilterButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
        active
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
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
            {/* Left: Filters */}
            <div className="space-y-10 scroll-reveal">
              <h1 className="text-2xl md:text-4xl font-bold font-heading">
                NOS <span className="text-gradient">TARIFS</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Sélectionnez la catégorie de votre appareil
              </p>

              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <FilterButton key={cat} active={selectedCategory === cat} onClick={() => setSelectedCategory(cat)}>
                    {cat}
                  </FilterButton>
                ))}
              </div>

              {isTelephoneCategory && (
                <>
                  <div>
                    <h2 className="text-lg font-bold mb-4 font-heading">MARQUE</h2>
                    <div className="flex flex-wrap gap-3">
                      {brands.map((brand) => (
                        <FilterButton key={brand} active={selectedBrand === brand} onClick={() => handleBrandChange(brand)}>
                          {brand}
                        </FilterButton>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold mb-4 font-heading">MODÈLE</h2>
                    <div className="flex flex-wrap gap-3">
                      {models.map((m) => (
                        <FilterButton key={m.model} active={selectedModel === m.model} onClick={() => setSelectedModel(m.model)}>
                          {m.model}
                        </FilterButton>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!isTelephoneCategory && (
                <div className="card-premium p-8">
                  <p className="text-muted-foreground text-sm">
                    Pour les réparations de <strong>{selectedCategory.toLowerCase()}</strong>, contactez-nous pour un devis personnalisé.
                  </p>
                </div>
              )}
            </div>

            {/* Right: Price table */}
            {isTelephoneCategory && currentModel && (
              <div className="card-premium p-7 md:p-10 border-peach/20 scroll-reveal">
                <div className="space-y-8">
                  {currentModel.sections.map((section) => (
                    <div key={section.title}>
                      <div className="flex justify-between items-center mb-5 pb-2 border-b border-accent/20">
                        <h3 className="text-gradient font-bold text-base">{section.title}</h3>
                        <span className="text-gradient font-bold text-sm">Prix (€ TTC)</span>
                      </div>
                      <div className="space-y-0">
                        {section.items.map((item) => (
                          <div
                            key={item.label}
                            className="flex justify-between items-center py-2.5 border-b border-border/20 last:border-0 hover:bg-accent/5 px-2 -mx-2 rounded-lg transition-colors duration-200"
                          >
                            <span className="text-sm">{item.label}</span>
                            <span className="text-sm font-semibold text-right ml-4">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tarifs;
