import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";

interface Section {
  title: string;
  paragraphs: string[];
}

const sections: Section[] = [
  {
    title: "1. Éditeur du site",
    paragraphs: [
      "Le site internet momuy-tech.fr est édité par l'atelier MOMUY & TECH, entreprise de réparation électronique et micro-soudure.",
      "Siège social : 121 route d'orthez, 40700 Momuy, Landes, France.",
      "Co-fondateurs et directeurs de la publication : Kilian et Léonie.",
      "Contact : Par téléphone au 09 61 08 13 02 ou directement à l'atelier.",
    ],
  },
  {
    title: "2. Hébergement du site",
    paragraphs: [
      "Le site momuy-tech.fr est hébergé sur des infrastructures cloud sécurisées conformes aux normes européennes de protection des données.",
      "Gestionnaire technique de déploiement : Netlify, Inc. / GitHub Pages.",
    ],
  },
  {
    title: "3. Propriété intellectuelle",
    paragraphs: [
      "L'ensemble des contenus présents sur ce site (textes, logos vectoriels SVG, photographies de l'atelier, illustrations, charte graphique) constitue la propriété exclusive de MOMUY & TECH, sauf mentions contraires.",
      "Toute reproduction, distribution, modification ou utilisation de ces éléments sans autorisation écrite préalable est strictement interdite.",
    ],
  },
  {
    title: "4. Protection des données personnelles & Confidentialité (RGPD)",
    paragraphs: [
      "MOMUY & TECH s'engage à respecter scrupuleusement la vie privée de ses clients.",
      "Données clients et facturation : Les coordonnées recueillies lors d'une intervention ou de l'établissement d'une facture (nom, prénom, téléphone) sont strictement destinées au suivi de vos réparations et aux obligations comptables. Elles ne sont jamais cédées, vendues ou partagées avec des tiers.",
      "Confidentialité des appareils en réparation : Dans le cadre de nos interventions en atelier, nous appliquons une politique de confidentialité stricte. Aucune donnée personnelle contenue dans vos smartphones, ordinateurs ou supports (photos, messages, fichiers) n'est consultée, copiée ou conservée sans votre accord explicite (par exemple dans le cas où vous demandez spécifiquement une prestation de sauvegarde de vos données sur support externe).",
      "Droits des clients (RGPD) : Vous disposez d'un droit d'accès, de rectification et d'effacement de vos coordonnées personnelles figurant dans notre fichier client sur simple demande écrite. (Note légale : les factures émises doivent être conservées conformément aux délais légaux imposés par le Code de commerce).",
    ],
  },
  {
    title: "5. Cookies et mesure d'audience",
    paragraphs: [
      "Ce site utilise des cookies de mesure d'audience anonymes via Google Analytics dans le seul but d'analyser la fréquentation du site et d'améliorer nos services.",
      "Conformément aux recommandations de la CNIL, ces traceurs ne sont activés qu'après votre accord explicite via notre bandeau de consentement. Vous pouvez refuser ou modifier votre choix à tout moment.",
    ],
  },
];

const MentionsLegales = () => {
  return (
    <Layout>
      <Helmet>
        <title>Mentions Légales & Confidentialité | MOMUY & TECH</title>
        <meta
          name="description"
          content="Mentions légales, politique de confidentialité et protection des données personnelles de l'atelier MOMUY & TECH à Momuy (40)."
        />
        <link rel="canonical" href="https://momuy-tech.fr/mentions-legales" />
      </Helmet>

      <section className="py-20 md:py-28 bg-[#f4efe7]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#102337] mb-4">
              Mentions Légales & Confidentialité
            </h1>
            <p className="text-sm uppercase tracking-widest text-[#d87532] font-semibold">
              MOMUY & TECH — Atelier de réparation électronique
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-white/80 rounded-2xl border border-[#d8c8b5] p-6 md:p-8 shadow-sm space-y-4"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#102337]">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[#52606c] leading-relaxed text-sm md:text-base"
                    >
                      {paragraph}
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

export default MentionsLegales;
