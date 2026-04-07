import Layout from "@/components/Layout";

const CGV = () => {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl prose prose-sm">
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-center mb-12">
            Conditions Générales de Vente
          </h1>

          <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Article 1 — Objet</h2>
              <p>
                Les présentes conditions générales de vente régissent les relations contractuelles
                entre MOMUY & TECH et ses clients dans le cadre de prestations de réparation
                de smartphones et d'appareils électroniques.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Article 2 — Devis et diagnostic</h2>
              <p>
                Un diagnostic est réalisé avant toute intervention. Un devis est établi et doit 
                être accepté par le client avant le début des travaux. Le diagnostic est gratuit.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Article 3 — Garantie</h2>
              <p>
                Toutes nos réparations bénéficient d'une garantie. La durée de garantie varie 
                selon le type d'intervention. La garantie ne couvre pas les dommages résultant 
                d'une mauvaise utilisation, de chocs ou de contact avec un liquide postérieur 
                à la réparation.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Article 4 — Paiement</h2>
              <p>
                Le paiement est dû à la restitution de l'appareil. Nous acceptons les paiements 
                par carte bancaire, espèces et virement.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Article 5 — Responsabilité</h2>
              <p>
                MOMUY & TECH s'engage à apporter tout le soin nécessaire à la réparation 
                de votre appareil. En cas d'impossibilité de réparation, l'appareil est 
                restitué en l'état sans frais.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CGV;
