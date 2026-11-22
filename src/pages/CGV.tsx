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
    title: "Article 1 — Objet, champ d'application et règles d'accueil",
    paragraphs: [
      "Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des relations contractuelles entre l'atelier MOMUY & TECH et ses clients (particuliers ou professionnels) dans le cadre de prestations de réparation, diagnostic, maintenance électronique, micro-soudure sur cartes mères et vente d'accessoires ou pièces détachées.",
      "Toute commande ou dépôt d'appareil pour intervention implique l'acceptation pleine et entière des présentes conditions par le client.",
      "Réserve d'acceptation et motifs légitimes de refus : MOMUY & TECH se réserve le droit de refuser la prise en charge ou l'intervention sur tout appareil pour des motifs légitimes, notamment en cas d'impossibilité technique, d'altération trop sévère du matériel, de risque manifeste pour la sécurité de l'atelier ou des personnes (batteries gonflées, risques de court-circuit dangereux), d'antécédents d'impayés, de litiges non résolus ou de doute fondé sur la capacité du client à honorer le règlement de la prestation.",
      "Respect mutuel et sérénité des échanges : MOMUY & TECH s'engage à accueillir sa clientèle avec professionnalisme et bienveillance. En retour, un respect strict envers notre équipe est exigé au sein de notre établissement comme lors des échanges téléphoniques ou écrits. Tout comportement irrespectueux, agressif, menaçant ou injurieux à l'égard de notre personnel entraînera le refus ou l'interruption immédiate de toute prestation, la restitution de l'appareil en l'état et, le cas échéant, fera l'objet de poursuites judiciaires conformément aux dispositions du Code pénal.",
    ],
  },
  {
    title: "Article 2 — Devis, diagnostics, recherche de panne et responsabilité",
    paragraphs: [
      "Diagnostic standard (smartphones, ordinateurs, pannes matérielles courantes) : facturé 20 € TTC. Ce montant couvre l'examen initial de l'appareil et l'établissement du devis.",
      "Diagnostic et recherche de panne en Micro-soudure : en raison de la complexité des circuits électroniques, les diagnostics sur cartes mères font l'objet de deux niveaux de forfaits selon l'intervention requise :",
      "— Forfait Diagnostic Micro-soudure de base (40 € TTC) : recherche de panne sur carte mère mono-couche ou composants accessibles (court-circuit identifié, connecteurs FPC, rétro-éclairage, pannes d'alimentation classiques).",
      "— Forfait Diagnostic Micro-soudure complexe (70 € TTC) : investigations approfondies nécessitant le désassemblage thermique de cartes mères superposées dites « sandwich » (notamment sur iPhone récents et appareils multi-niveaux). Ce forfait comprend l'ouverture sous station thermique, les mesures sous microscope, la recherche de panne et, en cas de refus du devis ou d'impossibilité de réparation, le réassemblage complet de la carte mère avant restitution.",
      "Déduction intégrale en cas de réparation : si le devis de réparation est accepté et les travaux réalisés par MOMUY & TECH, le montant du diagnostic réglé (20 € pour un diagnostic standard, 40 € pour un diagnostic micro-soudure de base ou 70 € pour un diagnostic micro-soudure complexe) est intégralement déduit de la facture finale de réparation.",
      "Obligation de moyens et appareils irréparables : MOMUY & TECH met en œuvre tout son savoir-faire et ses équipements pour tenter de sauver votre appareil. Si celui-ci s'avère techniquement irréparable en raison de dégâts internes trop importants, notre responsabilité ne pourra être engagée. L’appareil est alors restitué en l’état après règlement des frais de diagnostic engagés.",
      "Option de cession gratuite de l'appareil (sans frais pour le client) : si l'appareil s'avère non réparable, ou si le client refuse le devis proposé et ne souhaite pas s'acquitter des frais de diagnostic/recherche (20 €, 40 € ou 70 €), il a la possibilité de céder gratuitement son appareil à MOMUY & TECH. En contrepartie de cette cession définitive pour recyclage écologique ou récupération de pièces détachées, aucun frais de recherche ou de diagnostic ne lui sera facturé.",
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

      "Acompte sur les prestations d'un montant égal ou supérieur à 200 € TTC : Pour toute prestation dont le montant total du devis est supérieur ou égal à 200 € TTC, un acompte de 30 % du montant total TTC du devis est exigé lors de son acceptation par le client.",

      "Cet acompte constitue un premier versement sur le prix convenu et confirme l'engagement contractuel des parties, sous réserve des droits légaux du consommateur.",

      "La réception de cet acompte conditionne la commande des pièces éventuellement nécessaires ainsi que le lancement de la prestation.",

      "Le montant de l'acompte est expressément indiqué sur le devis et déduit du montant total de la facture finale.",

      "En cas d'annulation, d'impossibilité d'exécution ou de résolution du contrat, le sort de l'acompte est déterminé conformément aux dispositions légales applicables et aux circonstances de la situation. Il n'est pas automatiquement acquis à MOMUY & TECH.",

      "Règlement du solde : Le solde du prix est exigible à la restitution de l'appareil réparé. En cas de refus du devis, les éventuels frais de diagnostic restent exigibles selon les conditions prévues à l'article 2, sauf application de l'option de cession gratuite de l'appareil.",

      "Jusqu'à nouvel ordre, les règlements s'effectuent exclusivement par carte bancaire.",
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
      "Le client est informé par SMS, appel téléphonique ou e-mail dès que son appareil est disponible à l'atelier, que la réparation ait été effectuée ou non.",

      "À compter de cette notification, le client dispose d'un délai de trois (3) mois calendaires pour récupérer son appareil, sans frais de gardiennage supplémentaires.",

      "Passé ce délai de trois mois, et après une relance écrite restée sans effet, des frais de gardiennage de 0,50 € TTC par jour calendaire seront facturés à compter de la date la plus tardive entre l'expiration du délai gratuit et la relance écrite, jusqu'au retrait effectif de l'appareil, conformément aux conditions acceptées par le client lors de la prise en charge.",

      "Ces frais correspondent aux coûts de stockage et de conservation du matériel. Ils ne sont pas appliqués lorsque le retard de retrait est imputable à MOMUY & TECH.",

      "En cas de non-retrait de l'appareil pendant un an, MOMUY & TECH pourra engager la procédure prévue par la loi du 31 décembre 1903 relative à la vente de certains objets abandonnés, dans le respect des conditions et autorisations judiciaires applicables.",
    ],
  },
  {
    title: "Article 8 — Droit applicable, réclamations et médiation de la consommation",
    paragraphs: [
      "Droit applicable : Les présentes Conditions Générales de Vente et les opérations qui en découlent sont soumises au droit français.",
      "Réclamation préalable : En cas de différend ou de réclamation relative à une intervention, le client s'engage à contacter en priorité MOMUY & TECH (par téléphone au 09 61 08 13 02 ou par courrier à l'atelier : 121 route d'Orthez, 40700 Momuy) afin de rechercher une solution amiable.",
      "Médiation de la consommation : Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, en cas d'échec de la demande de réclamation préalable auprès de notre atelier ou en l'absence de réponse dans un délai d'un (1) mois, le client consommateur a le droit de recourir gratuitement au service de médiation de la consommation auquel nous adhérons.",
      "Coordonnées du médiateur compétent : CM2C (Centre de la Médiation de la Consommation de Conciliateurs de Justice) — 49 Rue de Ponthieu, 75008 Paris.",
      "Modalités de saisine du médiateur : La saisine peut être effectuée soit en ligne sur le site internet www.cm2c.net via le formulaire dédié, soit par e-mail à cm2c@cm2c.net, soit par courrier postal : CM2C, 49 Rue de Ponthieu, 75008 Paris. La saisine doit intervenir dans un délai maximal d'un an à compter de la réclamation préalable adressée à MOMUY & TECH.",
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