import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import logoImg from "@/assets/icons/momuy-tech-top-logo.svg";
import { Helmet } from "react-helmet-async";

interface Section {
  title: string;
  paragraphs: string[];
}

const sections: Section[] = [
  {
    title: "Article 1 — Objet et champ d'application",
    paragraphs: [
      "Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des relations contractuelles entre l'atelier MOMUY & TECH et ses clients (particuliers ou professionnels) dans le cadre de prestations de réparation, diagnostic, maintenance électronique, micro-soudure sur cartes mères et vente d'accessoires ou pièces détachées.",
      "Toute commande ou dépôt d'appareil pour intervention implique l'acceptation pleine et entière des présentes conditions par le client.",
    ],
  },
  {
    title: "Article 2 — Devis, diagnostics et recherche de panne",
    paragraphs: [
      "Diagnostic standard (smartphones, ordinateurs, pannes matérielles courantes) : facturé 20 € TTC. Ce montant couvre l'examen initial de l'appareil et l'établissement du devis.",
      "Diagnostic approfondi et recherche de panne en Micro-soudure : les interventions complexes sur cartes mères (pannes d'allumage, courts-circuits, Face ID, rétro-éclairage, pannes réseau, etc.) nécessitent des investigations microscopiques et des mesures électroniques avancées. Ce diagnostic approfondi fait l'objet d'un forfait de recherche de 40 € TTC.",
      "Déduction intégrale en cas de réparation : si le devis de réparation est accepté et les travaux réalisés par MOMUY & TECH, le montant du diagnostic (20 € pour un diagnostic standard ou 40 € pour une recherche en micro-soudure) est intégralement déduit de la facture finale de réparation.",
      "Option de cession gratuite de l'appareil (sans frais pour le client) : si l'appareil s'avère non réparable, ou si le client refuse le devis proposé et ne souhaite pas s'acquitter des frais de diagnostic/recherche (20 € ou 40 €), il a la possibilité de céder gratuitement son appareil à MOMUY & TECH. En contrepartie de cette cession définitive pour recyclage écologique ou récupération de pièces détachées, aucun frais de recherche ou de diagnostic ne lui sera facturé.",
    ],
  },
  {
    title: "Article 3 — Spécificités de la micro-soudure et désoxydation",
    paragraphs: [
      "Micro-soudure et cartes mères fragilisées : les opérations de micro-soudure sont pratiquées sur des composants miniatures et des circuits imprimés multicouches soumis à des contraintes thermiques intenses. Sur des appareils ayant subi des chocs violents, chutes ou surtensions, des micro-fissures ou faiblesses internes invisibles peuvent exister. Le client reconnaît et accepte que l'intervention comporte un aléa technique inhérent à l'état initial de la carte mère, et que MOMUY & TECH ne pourra être tenu responsable de l'apparition de pannes secondaires latentes révélées par l'ouverture ou la chauffe du composant.",
      "Désoxydation (appareils oxydés ou tombés dans l'eau) : le traitement de désoxydation est une tentative de sauvetage visant en priorité le rétablissement de l'appareil et/ou la récupération des données. La corrosion liquide pouvant continuer d'évoluer chimiquement dans le temps sous les composants, les prestations consécutives à une désoxydation ne bénéficient d'aucune garantie.",
    ],
  },
  {
    title: "Article 4 — Données personnelles et sauvegardes",
    paragraphs: [
      "MOMUY & TECH s'engage à préserver la stricte confidentialité des données présentes sur les appareils qui lui sont confiés.",
      "Il appartient exclusivement au client d'effectuer une sauvegarde complète de ses données (photos, vidéos, contacts, documents, applications) avant le dépôt de son appareil. MOMUY & TECH ne saurait en aucun cas être tenu responsable de la perte, de l'altération, de l'effacement ou de la corruption de données consécutives à une réparation matérielle, logicielle ou à une panne de carte mère.",
    ],
  },
  {
    title: "Article 5 — Tarifs et modalités de paiement",
    paragraphs: [
      "Les prix de nos prestations sont exprimés en euros (€) toutes taxes comprises (TTC).",
      "Le règlement est exigible à la restitution de l'appareil réparé (ou à l'issue du diagnostic en cas de refus du devis sans option de cession).",
      "Jusqu'à nouvel ordre, le règlement s'effectue exclusivement par carte bancaire.",
    ],
  },
  {
    title: "Article 6 — Garantie contractuelle",
    paragraphs: [
      "Toutes nos réparations standards (hors désoxydation) bénéficient d'une garantie contractuelle dont la durée est mentionnée sur le devis ou la facture, couvrant la pièce remplacée et la main-d'œuvre liée à l'intervention.",
      "Sont expressément exclues de la garantie : les pannes résultant de chocs, chutes, écrasements, bris d'écran, oxydation ou contact avec un liquide survenus postérieurement à la réparation, toute utilisation anormale ou non conforme, ainsi que toute ouverture ou intervention effectuée par un tiers ou par le client lui-même.",
    ],
  },
  {
    title: "Article 7 — Gardiennage et appareils non réclamés",
    paragraphs: [
      "Le client est informé par SMS, appel téléphonique ou e-mail dès que son appareil est disponible en atelier.",
      "À compter de cette notification, le client dispose d'un délai de 3 mois pour retirer son appareil et régulariser sa facture. Passé ce délai de 3 mois et après relance restée sans effet, l'appareil sera considéré comme abandonné et MOMUY & TECH pourra en disposer librement (recyclage, destruction ou utilisation pour pièces détachées) sans qu'aucun dédommagement ne puisse être exigé.",
    ],
  },
  {
    title: "Article 8 — Responsabilité",
    paragraphs: [
      "MOMUY & TECH est tenu à une obligation de moyens dans l'exécution de ses prestations. En cas d'impossibilité technique avérée de réparer l'appareil, celui-ci est restitué en l'état sous réserve du règlement des frais de diagnostic convenus ou de sa cession gratuite selon les termes de l'Article 2.",
    ],
  },
  {
    title: "Article 9 — Droit applicable et litiges",
    paragraphs: [
      "Les présentes Conditions Générales de Vente sont soumises à la législation française.",
      "En cas de réclamation ou de litige, les parties s'engagent à rechercher prioritairement un accord amiable. À défaut, le client consommateur peut recourir gratuitement à un médiateur de la consommation conformément aux dispositions du Code de la consommation.",
    ],
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
          content="Consultez les Conditions Générales de Vente de MOMUY & TECH pour les prestations de réparation de smartphones, informatique et micro-soudure électronique."
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
                <h2 className="text-lg font-bold mb-4 font-heading">{s.title}</h2>
                <div className="space-y-3">
                  {s.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-muted-foreground leading-relaxed text-sm">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CGV;