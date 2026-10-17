import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Laptop,
  Gamepad2,
  Watch,
  Headphones,
  Cpu,
  Smartphone,
  Tablet,
  Radio,
  Wrench,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Search,
  FileText,
} from "lucide-react";

const serviceAreas = [
  "Momuy",
  "Hagetmau",
  "Mugron",
  "Saint-Sever",
  "Orthez",
  "Mont-de-Marsan",
];

const methodSteps = [
  {
    number: "01",
    title: "Dépôt à l'atelier",
    description: "Déposez votre appareil directement à notre atelier situé à Momuy.",
    icon: Wrench,
  },
  {
    number: "02",
    title: "Diagnostic & Tests",
    description: "Recherche méthodique de la panne et test approfondi des composants.",
    icon: Search,
  },
  {
    number: "03",
    title: "Devis clair",
    description: "Validation systématique de votre accord et du tarif avant toute intervention.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Réparation & Validation",
    description: "Réparation avec pièces sélectionnées et tests de validation complets avant restitution.",
    icon: CheckCircle2,
  },
];

const services = {
  smartphone: {
    title: "Réparation de Smartphones & Tablettes | MOMUY & TECH",
    description:
      "Réparation de smartphones et tablettes à Momuy, près d’Hagetmau : écran cassé, batterie, port de charge, caméra, désoxydation et diagnostic. Pièces d'origine, reconditionnées ou compatibles.",
    heading: "Réparation de Smartphones & Tablettes",
    subheading: "Écrans cassés, batteries, connecteurs de charge, caméras, désoxydation et diagnostics complets à Momuy.",
    intro:
      "Chez MOMUY & TECH, nous réparons vos smartphones toutes marques avec des pièces d'origine, reconditionnées ou compatibles, selon la disponibilité et votre choix.",
    devices: [
      {
        category: "Apple iPhone",
        icon: Smartphone,
        items: "Tous modèles d'iPhone : écrans, batteries, connecteurs de charge, caméras, dos en verre...",
      },
      {
        category: "Smartphones Android",
        icon: Smartphone,
        items: "Samsung Galaxy, Xiaomi, Google Pixel, Huawei, Honor, Oppo, Vivo, Motorola, Realme...",
      },
      {
        category: "Tablettes & iPad",
        icon: Tablet,
        items: "Écrans cassés, vitres tactiles et remplacement de batterie pour iPad et tablettes Android.",
      },
    ],
    commonFailures: [
      {
        title: "Écran cassé ou tactile HS",
        text: "Vitre fissurée, lignes de couleur, taches noires ou écran qui ne répond plus au toucher.",
      },
      {
        title: "Batterie faible ou gonflée",
        text: "Autonomie en chute libre, téléphone qui coupe à 20 % ou batterie qui pousse l'écran.",
      },
      {
        title: "Problème de charge & connectique",
        text: "Le câble ne tient plus, faux contact ou port USB-C / Lightning encrassé ou abîmé.",
      },
      {
        title: "Caméra & Photos floues",
        text: "Lentille de protection brisée, capteur photo qui tremble ou mise au point impossible.",
      },
      {
        title: "Son, Micro & Haut-parleurs",
        text: "Vos correspondants ne vous entendent pas, son étouffé en appel ou grésillements.",
      },
      {
        title: "Chute dans l'eau & Liquides",
        text: "Désoxydation complète des composants électroniques sous cuve à ultrasons.",
      },
    ],
    failuresNote: "Cette liste est non exhaustive : pour toute autre anomalie (boutons, châssis tordu, problème réseau...), contactez-nous ou passez à l'atelier !",
  },
  pc: {
    title: "Réparation électronique, PC & Consoles | MOMUY & TECH",
    description:
      "Atelier de réparation pour PC portables & fixes, consoles de jeux, montres connectées, écouteurs sans fil et cartes électroniques à Momuy dans les Landes.",
    heading: "Réparation électronique, PC & Consoles",
    subheading: "PC portables & fixes, consoles de jeux, montres connectées, écouteurs sans fil et petits appareils high-tech.",
    intro:
      "À l'atelier MOMUY & TECH, nous prenons en charge une large variété d'équipements informatiques, multimédias et électroniques. Que ce soit pour un problème matériel, un écran brisé, une surchauffe ou une panne électrique, nous diagnostiquons et réparons vos appareils avec soin.",
    devices: [
      {
        category: "Informatique",
        icon: Laptop,
        items: "PC portables (écrans, claviers, batteries, charnières...), ordinateurs fixes (tours, alimentations, cartes mères).",
      },
      {
        category: "Consoles de jeux",
        icon: Gamepad2,
        items: "PlayStation, Xbox, Nintendo Switch (ports HDMI, connecteurs USB-C, lecteurs, ventilateurs, manettes, joysticks, écran).",
      },
      {
        category: "Montres connectées",
        icon: Watch,
        items: "Toutes marques / sous réserve de la disponibilité des pièces (écrans fissurés, batteries).",
      },
      {
        category: "Audio & Objets connectés",
        icon: Headphones,
        items: "Écouteurs sans fil (AirPods...), petits appareils électroniques du quotidien.",
      },
      {
        category: "Cartes électroniques en tout genre",
        icon: Cpu,
        items: "Cartes électroniques démontées de divers équipements (venir directement à l'atelier ou nous contacter avant de préférence).",
      },
    ],
    commonFailures: [
      {
        title: "Allumage & Alimentation",
        text: "L'appareil ne s'allume plus du tout, s'éteint brutalement ou redémarre en boucle.",
      },
      {
        title: "Affichage & Vidéo",
        text: "Écran noir, vitre brisée, artefacts visuels, port HDMI dessoudé ou arraché.",
      },
      {
        title: "Charge & Connectique",
        text: "Port USB-C tordu, faux contact, câble qui ne tient plus ou ne charge plus.",
      },
      {
        title: "Surchauffe & Bruit",
        text: "Ventilateur bruyant qui s'emballe, coupure thermique en pleine utilisation.",
      },
      {
        title: "Boutons & Commandes",
        text: "Touches bloquées, sticks qui dérivent (drifting), connecteurs internes cassés.",
      },
    ],
    failuresNote: "Cette liste est non exhaustive : si votre problème ou votre appareil n'est pas cité, cela ne signifie pas pour autant qu'il n'est pas réparable. Venez nous voir à l'atelier ou contactez-nous !",
  },
  console: {
    title: "Réparation de console de jeux à Momuy | MOMUY & TECH",
    description:
      "Réparation de consoles de jeux à Momuy : diagnostic, connectique et interventions électroniques. Service de proximité pour Hagetmau, Orthez et les Landes.",
    heading: "Réparation de consoles de jeux",
    subheading: "PlayStation, Xbox, Nintendo Switch : ports HDMI, connecteurs de charge, dépoussiérage et joystick drift.",
    intro:
      "Votre console ne s'allume plus, ne charge plus ou présente un port HDMI endommagé ? Notre atelier à Momuy prend en charge vos consoles de salon et portables.",
    devices: [
      {
        category: "Consoles de salon & portables",
        icon: Gamepad2,
        items: "PlayStation 4, PlayStation 5, Xbox One, Xbox Series, Nintendo Switch (Standard, Lite, OLED).",
      },
    ],
    commonFailures: [
      {
        title: "Port HDMI & Affichage",
        text: "Port HDMI enfoncé ou broches tordues, pas de signal vidéo sur la TV.",
      },
      {
        title: "Port de charge USB-C",
        text: "Nintendo Switch qui ne charge plus ou ne s'allume plus.",
      },
      {
        title: "Surchauffe & Bruit",
        text: "Ventilateur qui tourne à fond, message de surchauffe et arrêt automatique.",
      },
      {
        title: "Manettes & Joy-Con",
        text: "Sticks analogiques qui dérivent (drifting), boutons cassés ou gâchettes défaillantes.",
      },
    ],
    failuresNote: "Cette liste est non exhaustive. Contactez-nous pour toute autre panne sur votre console !",
  },
  microsoudure: {
    title: "Micro-soudure & Réparation de cartes électroniques | MOMUY & TECH",
    description:
      "Interventions de micro-soudure de précision sous microscope à Momuy : connecteurs arrachés, puces CMS, cartes mères smartphones, PC, consoles et cartes diverses.",
    heading: "Micro-soudure & Réparation de cartes électroniques",
    subheading: "Interventions de précision sous microscope au niveau des composants, connecteurs et circuits imprimés à Momuy.",
    intro:
      "Lorsque le simple remplacement d'une pièce ne suffit pas ou qu'un composant est directement soudé sur la carte mère, la micro-soudure permet de sauver votre appareil. À l'atelier MOMUY & TECH, Kilian réalise ces interventions minutieuses avec du matériel professionnel de haute précision.",
    devices: [
      {
        category: "Smartphones & Tablettes",
        icon: Smartphone,
        items: "Cartes mères iPhone, iPad et Android : connecteurs internes arrachés (batterie, écran), puces de charge, problème d'affichage/rétroéclairage, courts-circuits.",
      },
      {
        category: "Consoles de jeux",
        icon: Gamepad2,
        items: "Cartes mères (PS4, PS5, Xbox, Nintendo Switch) : ports HDMI dessoudés, puces d'affichage, connecteurs USB-C.",
      },
      {
        category: "PC portables & fixes",
        icon: Laptop,
        items: "Connecteurs d'alimentation DC-Jack soudés, puces de régulation de tension, composants CMS brûlés.",
      },
      {
        category: "Cartes électroniques diverses (démontées)",
        icon: Cpu,
        items: "Cartes d'électroménager, automatismes, outillage ou petits équipements électroniques (nous contacter ou passer à l'atelier de préférence).",
      },
    ],
    commonFailures: [
      {
        title: "Remplacement de connecteurs",
        text: "Ports HDMI, ports USB-C de charge, connecteurs internes de batterie ou d'écran arrachés.",
      },
      {
        title: "Composants CMS & Puces (CI)",
        text: "Remplacement de condensateurs en court-circuit, résistances, diodes, puces de gestion d'énergie.",
      },
      {
        title: "Reconstruction de pistes & pastilles coupées",
        text: "Réfection de liaisons arrachées par un choc ou une mauvaise manipulation à l'aide de micro-fils de cuivre (jumpers).",
      },
      {
        title: "Désoxydation & Réparation après liquide",
        text: "Nettoyage en cuve à ultrasons, retrait des traces de corrosion et reconstruction des soudures fragilisées.",
      },
      {
        title: "Recherche de court-circuit électrique",
        text: "Localisation thermique et électrique du composant défaillant qui bloque l'allumage.",
      },
    ],
    failuresNote: "Chaque carte électronique étant unique, nous réalisons systématiquement une étude préalable pour vous confirmer la faisabilité technique.",
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
    { label: "Réparation PC & Électronique", path: "/reparation-pc" },
    { label: "Micro-soudure de cartes électroniques", path: "/micro-soudure-carte-electronique" },
  ],
  pc: [
    { label: "Réparation de smartphones", path: "/reparation-smartphone" },
    { label: "Micro-soudure de cartes électroniques", path: "/micro-soudure-carte-electronique" },
  ],
  console: [
    { label: "Réparation PC & Électronique", path: "/reparation-pc" },
    { label: "Réparation de smartphones", path: "/reparation-smartphone" },
  ],
  microsoudure: [
    { label: "Réparation PC & Électronique", path: "/reparation-pc" },
    { label: "Réparation de smartphones", path: "/reparation-smartphone" },
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
        {/* En-tête héro */}
        <section className="py-16 md:py-20 border-b border-[#e0d2c1]">
          <div className="container mx-auto max-w-5xl px-4 text-center">
            <nav aria-label="Fil d’Ariane" className="mb-6 text-sm text-[#52606c]">
              <Link to="/" className="hover:text-[#d87532]">Accueil</Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span>{service.heading}</span>
            </nav>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d87532]">
              MOMUY & TECH — Atelier à Momuy
            </p>
            <h1 className="font-serif text-3xl font-bold leading-tight md:text-5xl">
              {service.heading}
            </h1>
            <p className="mt-4 text-base md:text-lg font-medium text-[#102337]/80 max-w-3xl mx-auto">
              {service.subheading}
            </p>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-[#52606c] max-w-3xl mx-auto">
              {service.intro}
            </p>
          </div>
        </section>

        {/* Bloc 1 : Quels appareils pouvez-vous nous apporter ? */}
        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block rounded-full bg-[#d87532]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#d87532] mb-3">
                Prise en charge
              </span>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-[#102337]">
                Quels appareils pouvez-vous nous apporter ?
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {service.devices.map((device) => {
                const Icon = device.icon;
                return (
                  <div
                    key={device.category}
                    className="card-premium p-6 flex flex-col justify-between hover:border-[#d87532]/60 transition-colors"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#09233a] text-white flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[#d87532]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#102337] mb-2">
                        {device.category}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#52606c]">
                        {device.items}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bloc 2 : Les pannes courantes prises en charge */}
        <section className="py-16 bg-[#f7f1e8] border-t border-b border-[#e0d2c1]">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block rounded-full bg-[#d87532]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#d87532] mb-3">
                Diagnostic & Réparation
              </span>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-[#102337]">
                Les pannes courantes prises en charge
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {service.commonFailures.map((failure) => (
                <div
                  key={failure.title}
                  className="card-premium p-6 bg-white shadow-sm hover:border-[#d87532]/60 transition-colors"
                >
                  <h3 className="text-base font-bold text-[#102337] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d87532] flex-shrink-0" />
                    {failure.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#52606c]">
                    {failure.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Note d'information non exhaustive */}
            <div className="mt-8 rounded-2xl bg-white border border-[#d87532]/30 p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-[#f4efe7] text-[#d87532] flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p className="text-sm text-[#52606c] leading-relaxed flex-1">
                {service.failuresNote}
              </p>
            </div>
          </div>
        </section>

        {/* Bloc 3 : Notre méthode à l'atelier */}
        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block rounded-full bg-[#d87532]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#d87532] mb-3">
                Démarche
              </span>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-[#102337]">
                Notre méthode à l'atelier
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {methodSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className="card-premium p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#09233a] text-[#d87532] flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-2xl font-serif font-bold text-[#d87532]/40">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#102337] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-[#52606c]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Boutons d'action */}
            <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/tarifs"
                className="inline-flex items-center justify-center rounded-xl bg-[#d87532] px-8 py-3.5 text-white font-bold uppercase hover:bg-[#c96325] transition"
              >
                Consulter les tarifs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/diagnostic"
                className="inline-flex items-center justify-center rounded-xl bg-[#09233a] px-8 py-3.5 text-white font-bold uppercase hover:bg-[#12314c] transition"
              >
                Comment se passe le diagnostic ?
              </Link>
              <Link
                to="/contact#contact"
                className="inline-flex items-center justify-center rounded-xl border border-[#09233a] px-8 py-3.5 text-[#09233a] font-bold uppercase hover:bg-[#f4efe7] transition"
              >
                Venir à l'atelier
              </Link>
            </div>
          </div>
        </section>

        {/* Zone géographique & Services associés */}
        <section className="py-12 bg-[#f4efe7] border-t border-[#e0d2c1]">
          <div className="container mx-auto max-w-5xl px-4 text-center">
            <h2 className="text-lg font-bold uppercase tracking-wider text-[#102337] mb-3">
              Atelier local au cœur des Landes
            </h2>
            <p className="text-sm text-[#52606c] max-w-2xl mx-auto mb-8">
              Nous accueillons les clients de Momuy et des communes voisines :{" "}
              <span className="font-semibold text-[#d87532]">
                {serviceAreas.join(" • ")}
              </span>
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase">
              {relatedServices[serviceKey].map((rel) => (
                <Link
                  key={rel.path}
                  to={rel.path}
                  className="rounded-lg bg-white px-4 py-2 border border-[#e0d2c1] text-[#102337] hover:border-[#d87532] hover:text-[#d87532] transition"
                >
                  {rel.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ServicePage;
