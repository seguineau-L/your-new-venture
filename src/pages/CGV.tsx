import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const sections = [
  {
    title: "Article 1 — Objet",
    content: "Les présentes conditions générales de vente régissent les relations contractuelles entre MOMUY & TECH et ses clients dans le cadre de prestations de réparation de smartphones et d'appareils électroniques.",
  },
  {
    title: "Article 2 — Devis et diagnostic",
    content: "Un diagnostic est réalisé avant toute intervention. Un devis est établi et doit être accepté par le client avant le début des travaux. Le diagnostic est gratuit.",
  },
  {
    title: "Article 3 — Garantie",
    content: "Toutes nos réparations bénéficient d'une garantie. La durée de garantie varie selon le type d'intervention. La garantie ne couvre pas les dommages résultant d'une mauvaise utilisation, de chocs ou de contact avec un liquide postérieur à la réparation.",
  },
  {
    title: "Article 4 — Paiement",
    content: "Le paiement est dû à la restitution de l'appareil. Nous acceptons les paiements par carte bancaire, espèces et virement.",
  },
  {
    title: "Article 5 — Responsabilité",
    content: "MOMUY & TECH s'engage à apporter tout le soin nécessaire à la réparation de votre appareil. En cas d'impossibilité de réparation, l'appareil est restitué en l'état sans frais.",
  },
];

const CGV = () => {
  const scrollRef = useScrollReveal();

  return (
    <Layout>
      <section className="py-16 md:py-24" ref={scrollRef}>
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="scroll-reveal text-center mb-14">
            <h1 className="text-2xl md:text-4xl font-bold font-heading">
              Conditions Générales de <span className="text-gradient">Vente</span>
            </h1>
          </div>

          <div className="space-y-8 scroll-reveal">
            {sections.map((s) => (
              <div key={s.title} className="card-premium p-8">
                <h2 className="text-lg font-bold mb-3 font-heading">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CGV;
