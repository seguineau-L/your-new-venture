import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import logoImg from "@/assets/icons/momuy-tech-top-logo.svg";
import { Helmet } from "react-helmet-async";

const sections = [
  {
    title: "Article 1 — Objet",
    content: "Les présentes conditions générales de vente régissent les relations contractuelles entre MOMUY & TECH et ses clients dans le cadre de prestations de réparation de smartphones et d'appareils électroniques.",
  },
  {
    title: "Article 2 — Devis et diagnostic",
    content: "Un diagnostic est réalisé avant toute intervention et facturé 20 €. Un devis est ensuite établi et doit être accepté par le client avant le début des travaux. Si la réparation est réalisée par MOMUY & TECH, le montant du diagnostic est déduit du prix total de la réparation.",
  },
  {
    title: "Article 3 — Garantie",
    content: "Toutes nos réparations bénéficient d'une garantie. La durée de garantie varie selon le type d'intervention. La garantie ne couvre pas les dommages résultant d'une mauvaise utilisation, de chocs ou de contact avec un liquide postérieur à la réparation.",
  },
  {
    title: "Article 4 — Paiement",
    content: "Le paiement est dû à la restitution de l'appareil. Jusqu'à nouvel ordre, le règlement s'effectue exclusivement par carte bancaire.",
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
      <Helmet>
        <title>
          Conditions Générales de Vente | MOMUY & TECH
        </title>

        <meta
          name="description"
          content="Consultez les Conditions Générales de Vente de MOMUY & TECH pour les prestations de réparation de smartphones et d’appareils électroniques."
        />
        <link rel="canonical" href="https://momuy-tech.fr/cgv" />
      </Helmet>
      <section className="py-16 md:py-24" ref={scrollRef}>
        <div className="container mx-auto px-4 max-w-3xl">
          <nav aria-label="Fil d’Ariane" className="mb-8 text-center text-sm text-muted-foreground">
            <a href="/" className="hover:text-[#d87532]">Accueil</a>
            <span aria-hidden="true" className="mx-2">/</span>
            <span>CGV</span>
          </nav>
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
