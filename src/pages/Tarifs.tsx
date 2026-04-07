import { useState } from "react";
import Layout from "@/components/Layout";
import { categories, brands, applePricing, androidPricing, type Category, type Brand, type ModelPricing } from "@/data/pricing";

const Tarifs = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("TELEPHONE");
  const [selectedBrand, setSelectedBrand] = useState<Brand>("APPLE");
  const [selectedModel, setSelectedModel] = useState<string>("IPHONE 16");

  const models: ModelPricing[] = selectedBrand === "APPLE" ? applePricing : androidPricing;
  const currentModel = models.find((m) => m.model === selectedModel) || models[0];

  const handleBrandChange = (brand: Brand) => {
    setSelectedBrand(brand);
    const newModels = brand === "APPLE" ? applePricing : androidPricing;
    setSelectedModel(newModels[0]?.model || "");
  };

  const isTelephoneCategory = selectedCategory === "TELEPHONE";

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10">
            {/* Left: Filters */}
            <div className="space-y-8">
              <h1 className="text-2xl md:text-3xl font-bold font-heading underline underline-offset-8 decoration-2">
                NOS TARIFS
              </h1>
              <p className="text-muted-foreground text-sm">
                Sélectionnez la catégorie de votre appareil
              </p>

              {/* Categories */}
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                      selectedCategory === cat
                        ? "bg-steel text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {isTelephoneCategory && (
                <>
                  {/* Brands */}
                  <div>
                    <h2 className="text-lg font-bold mb-3 underline underline-offset-4 decoration-1">MARQUE</h2>
                    <div className="flex flex-wrap gap-3">
                      {brands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() => handleBrandChange(brand)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                            selectedBrand === brand
                              ? "bg-steel text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Models */}
                  <div>
                    <h2 className="text-lg font-bold mb-3 underline underline-offset-4 decoration-1">MODÈLE</h2>
                    <div className="flex flex-wrap gap-3">
                      {models.map((m) => (
                        <button
                          key={m.model}
                          onClick={() => setSelectedModel(m.model)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                            selectedModel === m.model
                              ? "bg-steel text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {m.model}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!isTelephoneCategory && (
                <div className="bg-card rounded-xl p-6 shadow-md">
                  <p className="text-muted-foreground text-sm">
                    Pour les réparations de <strong>{selectedCategory.toLowerCase()}</strong>, contactez-nous pour un devis personnalisé.
                  </p>
                </div>
              )}
            </div>

            {/* Right: Price table */}
            {isTelephoneCategory && currentModel && (
              <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-peach/30">
                <div className="space-y-8">
                  {currentModel.sections.map((section) => (
                    <div key={section.title}>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-accent font-semibold text-base">{section.title}</h3>
                        <span className="text-accent font-semibold text-sm">Prix (€ TTC)</span>
                      </div>
                      <div className="space-y-2">
                        {section.items.map((item) => (
                          <div
                            key={item.label}
                            className="flex justify-between items-center py-1.5 border-b border-border/40 last:border-0"
                          >
                            <span className="text-sm">{item.label}</span>
                            <span className="text-sm font-medium text-right ml-4">{item.price}</span>
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
