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
    title: "Réparation de téléphone et smartphone à Momuy",
    description:
      "Réparation de téléphones et smartphones à Momuy : écran, batterie, connecteur de charge, caméra et diagnostic. Atelier proche d’Hagetmau, Orthez et Mont-de-Marsan.",
    heading: "Réparation de téléphones et smartphones",
    paragraphs: [
      "Notre atelier situé à Momuy prend en charge les téléphones et smartphones présentant un écran cassé, une batterie usée, un connecteur de charge endommagé ou une panne nécessitant un diagnostic.",
      "Selon l’appareil et la panne, nous vous expliquons les possibilités de réparation et vous proposons une solution adaptée. Les tarifs disponibles sont consultables sur la page dédiée ou directement auprès de l’atelier.",
    ],
    points: [
      "Remplacement d’écran et de batterie",
      "Connecteur de charge et caméra",
      "Diagnostic avant réparation",
      "Accueil des clients de Momuy et des communes voisines",
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

type ServicePageProps = {
  serviceKey: ServiceKey;
};

const ServicePage = ({ serviceKey }: ServicePageProps) => {
  const service = services[serviceKey];
  const canonical = `https://momuy-tech.fr/${
    serviceKey === "smartphone"
      ? "reparation-smartphone"
      : serviceKey === "pc"
        ? "reparation-pc"
        : serviceKey === "console"
          ? "reparation-console"
          : "micro-soudure-carte-electronique"
  }`;

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
            provider: {
              "@type": "LocalBusiness",
              name: "MOMUY & TECH",
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
      </Helmet>

      <main className="min-h-screen bg-[#f4efe7] text-[#102337]">
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="mx-auto max-w-3xl text-center">
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
