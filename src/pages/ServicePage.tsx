import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const serviceAreas = [
  "Momuy",
  "Hagetmau",
  "Mugron",
  "Saint-Sever",
  "Orthez",
  "Mont-de-Marsan",
];

const services = {
  smartphone: {
    title: "Réparation téléphone près d’Hagetmau | MOMUY & TECH",
    description:
      "Réparation de téléphone et smartphone à Momuy, près d’Hagetmau : écran cassé, batterie, port de charge, téléphone HS et diagnostic. Nous vous accueillons durant nos horaires d’ouverture.",
    heading: "Réparation de téléphone près d’Hagetmau",
    paragraphs: [
      "MOMUY & TECH répare les téléphones et smartphones à Momuy, près d’Hagetmau. Nous prenons en charge les écrans cassés, batteries usées, ports de charge endommagés et pannes nécessitant un diagnostic.",
      "Votre téléphone ne s’allume plus, reste bloqué sur un écran noir, redémarre en boucle ou ne charge plus ? Un diagnostic permet d’identifier la panne et de vous présenter les possibilités de réparation avant toute intervention.",
      "Les tarifs disponibles sont consultables sur la page dédiée. Pour connaître la solution adaptée à votre modèle, demandez un diagnostic ou contactez directement l’atelier.",
    ],
    points: [
      "Réparation d’écran cassé et remplacement de batterie",
      "Port de charge, connecteur et caméra",
      "Téléphone HS, écran noir ou téléphone qui ne s’allume plus",
      "Diagnostic avant réparation",
      "Accueil des clients de Momuy, Hagetmau et des communes voisines",
    ],
  },
  pc: {
    title: "Réparation de PC portable à Momuy | MOMUY & TECH",
    description:
      "Réparation de PC portables à Momuy : écran, batterie, clavier et diagnostic. Atelier de proximité pour les habitants d’Hagetmau, Orthez et des Landes.",
    heading: "Réparation de PC portables",
    paragraphs: [
      "Nous accueillons les PC portables présentant un problème d’écran, de batterie, de clavier ou de fonctionnement général. Un diagnostic permet d’identifier la panne avant toute intervention.",
      "Pour les réparations nécessitant une étude particulière ou une intervention sur carte mère, nous vous indiquons les possibilités et le coût estimatif avant de commencer.",
    ],
    points: [
      "Remplacement d’écran",
      "Remplacement de batterie",
      "Remplacement de clavier",
      "Diagnostic et orientation vers une solution adaptée",
    ],
  },
  console: {
    title: "Réparation de console de jeux à Momuy | MOMUY & TECH",
    description:
      "Réparation de consoles de jeux à Momuy : diagnostic, connectique et interventions électroniques. Service de proximité pour Hagetmau, Orthez et les Landes.",
    heading: "Réparation de consoles de jeux",
    paragraphs: [
      "Votre console ne s’allume plus, ne charge plus ou présente un problème de connectique ? Notre atelier à Momuy peut effectuer un premier diagnostic et vous informer sur les possibilités de réparation.",
      "Chaque panne est étudiée selon le modèle et l’état de la console. Nous privilégions une information claire avant toute intervention.",
    ],
    points: [
      "Diagnostic de panne",
      "Problèmes de charge et de connectique",
      "Interventions électroniques selon le modèle",
      "Devis ou estimation avant réparation",
    ],
  },
  microsoudure: {
    title: "Micro-soudure et carte électronique à Momuy",
    description:
      "Micro-soudure et réparation de cartes électroniques à Momuy. Intervention sur composants et cartes selon la panne, pour les clients proches d’Hagetmau et des Landes.",
    heading: "Micro-soudure et réparation de cartes électroniques",
    paragraphs: [
      "La micro-soudure permet d’intervenir sur certains composants et certaines cartes électroniques lorsque la panne ne se limite pas à un simple remplacement de pièce.",
      "Kilian réalise ces interventions selon le diagnostic et l’état de la carte. Chaque demande est étudiée au cas par cas, avec une information claire sur les possibilités de réparation.",
    ],
    points: [
      "Diagnostic de carte électronique",
      "Remplacement de composants selon la panne",
      "Interventions de micro-soudure",
      "Étude préalable avant devis",
    ],
  },
} as const;

type ServiceKey = keyof typeof services;

const serviceRoutes: Record<ServiceKey, string> = {
  smartphone: "/reparation-smartphone",
  pc: "/reparation-pc",
  console: "/reparation-console",
  microsoudure: "/micro-soudure-carte-electronique",
};

const relatedServices: Record<ServiceKey, Array<{ label: string; path: string }>> = {
  smartphone: [
    { label: "Réparation de PC", path: "/reparation-pc" },
    { label: "Réparation de consoles", path: "/reparation-console" },
  ],
  pc: [
    { label: "Réparation de smartphones", path: "/reparation-smartphone" },
    { label: "Micro-soudure de cartes électroniques", path: "/micro-soudure-carte-electronique" },
  ],
  console: [
    { label: "Réparation de smartphones", path: "/reparation-smartphone" },
    { label: "Réparation de PC", path: "/reparation-pc" },
  ],
  microsoudure: [
    { label: "Réparation de smartphones", path: "/reparation-smartphone" },
    { label: "Réparation de PC", path: "/reparation-pc" },
  ],
};

type ServicePageProps = {
  serviceKey: ServiceKey;
};

const ServicePage = ({ serviceKey }: ServicePageProps) => {
  const service = services[serviceKey];
  const canonical = `https://momuy-tech.fr${serviceRoutes[serviceKey]}`;

  return (
    <Layout>
      <Helmet>
        <title>{service.title}</title>
        <meta name="description" content={service.description} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.heading,
            description: service.description,
            serviceType: service.heading,
            url: canonical,
            provider: {
              "@type": "LocalBusiness",
              name: "MOMUY & TECH",
              url: "https://momuy-tech.fr/",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Momuy",
                postalCode: "40700",
                addressRegion: "Landes",
                addressCountry: "FR",
              },
            },
            areaServed: serviceAreas.map((name) => ({
              "@type": "City",
              name,
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://momuy-tech.fr/" },
              { "@type": "ListItem", position: 2, name: service.heading, item: canonical },
            ],
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-[#f4efe7] text-[#102337]">
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <nav aria-label="Fil d’Ariane" className="mb-6 text-sm text-[#52606c]">
                <Link to="/" className="hover:text-[#d87532]">Accueil</Link>
                <span aria-hidden="true" className="mx-2">/</span>
                <span>{service.heading}</span>
              </nav>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d87532]">
                MOMUY & TECH — Atelier à Momuy
              </p>
              <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
                {service.heading}
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#52606c]">
                {service.description}
              </p>
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-[1.15fr_0.85fr]">
              <article className="card-premium space-y-5 p-7 md:p-10">
                {service.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-8 text-[#52606c]">
                    {paragraph}
                  </p>
                ))}
              </article>

              <aside className="card-premium p-7 md:p-10">
                <h2 className="mb-5 text-xl font-bold">Interventions possibles</h2>
                <ul className="space-y-3 text-[#52606c]">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="font-bold text-[#d87532]">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>

            {serviceKey === "smartphone" && (
              <div className="mt-8 flex justify-center">
                <Link
                  to="/contact#horaires"
                  className="rounded-xl border border-[#d87532] px-6 py-3 text-center font-bold text-[#102337] transition hover:bg-white/60"
                >
                  Voir les horaires d’ouverture
                </Link>
              </div>
            )}

            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/tarifs"
                className="rounded-xl bg-[#d87532] px-7 py-4 text-center font-bold uppercase text-white transition hover:bg-[#c96325]"
              >
                Voir les tarifs
              </Link>
              <Link
                to="/contact#contact"
                className="rounded-xl border border-[#d87532] px-7 py-4 text-center font-bold uppercase text-[#102337] transition hover:bg-white/60"
              >
                Demander un diagnostic
              </Link>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="card-premium p-7">
                <h2 className="mb-4 text-xl font-bold">Questions fréquentes</h2>
                <div className="space-y-4 text-sm leading-7 text-[#52606c]">
                  <div>
                    <h3 className="font-semibold text-[#102337]">Faut-il demander un diagnostic ?</h3>
                    <p>Oui. Chaque appareil est examiné avant intervention afin de confirmer la panne et la solution adaptée.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#102337]">Où intervenez-vous ?</h3>
                    <p>L’atelier est situé à Momuy et accueille les clients de Hagetmau, Mugron, Saint-Sever, Orthez et Mont-de-Marsan.</p>
                  </div>
                </div>
              </div>
              <div className="card-premium p-7">
                <h2 className="mb-4 text-xl font-bold">Autres services</h2>
                <ul className="space-y-3 text-sm text-[#52606c]">
                  {relatedServices[serviceKey].map((related) => (
                    <li key={related.path}>
                      <Link to={related.path} className="font-semibold text-[#d87532] hover:underline">
                        {related.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {serviceKey === "smartphone" && (
              <section className="card-premium mt-12 grid gap-7 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9" aria-labelledby="zone-reparation">
                <div>
                  <h2 id="zone-reparation" className="mb-3 text-2xl font-bold">Réparation de téléphone près de Hagetmau</h2>
                  <p className="leading-8 text-[#52606c]">
                    L’atelier MOMUY & TECH se trouve au 121 route d’Orthez, 40700 Momuy, dans les Landes. Nous accueillons les personnes qui recherchent un réparateur de téléphone à Hagetmau, Momuy et dans les communes voisines.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#52606c]">
                    Zone desservie : {serviceAreas.slice(1).join(", ")}.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=121+route+d%27Orthez+40700+Momuy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-[#d87532] px-5 py-3 text-center text-sm font-bold text-[#102337] transition hover:bg-white/60"
                  >
                    Voir l’itinéraire
                  </a>
                  <Link
                    to="/contact#contact"
                    className="rounded-xl bg-[#d87532] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#c96325]"
                  >
                    Nous contacter
                  </Link>
                </div>
              </section>
            )}

            <p className="mt-12 text-center text-sm leading-7 text-[#52606c]">
              L’atelier est situé à Momuy, dans les Landes. Nous accueillons également les clients des communes voisines, notamment {serviceAreas.slice(1).join(", ")}.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ServicePage;
