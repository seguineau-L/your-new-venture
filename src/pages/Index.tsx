import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import atelier from "@/assets/atelier-reparation.webp";
import { Smartphone, Cpu, Shield, Clock, Search, Wrench, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Search,
    title: "DIAGNOSTIC",
    items: ["contrôle phonecheck", "recherche de panne", "contrôle", "conseil réparation"],
  },
  {
    icon: Cpu,
    title: "ÉLECTRONIQUE",
    items: ["cartes électronique", "console", "pc", "batterie d'écouteurs"],
  },
  {
    icon: Smartphone,
    title: "SMARTPHONES",
    items: ["écrans", "batteries", "connecteur de charge", "prise jack"],
  },
  {
    icon: Wrench,
    title: "MICROSOUDURE",
    items: ["connectique", "désoxydation", "composant", "intervention fine sur carte"],
  },
];

const reasons = [
  {
    title: "UN ATELIER LOCAL",
    desc: "Un service de proximité, avec un vrai interlocuteur et un suivi simplifié.",
  },
  {
    title: "UNE VRAIE LOGIQUE DE DIAGNOSTIQUE",
    desc: "Chaque appareil est analysé en profondeur avant toute intervention.",
  },
  {
    title: "UNE EXPERTISE TECHNIQUE",
    desc: "Au-delà de la réparation classique, nous intervenons aussi sur l'électronique et la micro-soudure.",
  },
];

const OrangeDivider = () => (
  <div className="relative h-8 my-8 flex items-center justify-center">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent blur-[1px]" />
    </div>
    <div className="absolute inset-0 flex items-center">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />
    </div>
  </div>
);

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight font-heading uppercase tracking-wide">
              Réparation<br />
              <span className="text-foreground">smartphone et carte électronique</span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
              Diagnostic, réparation et intervention sur smartphones,
              console, pc, carte électronique et accessoires high-tech.
              Nous sommes un atelier local, sérieux et orienté réparation durable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground/5 font-semibold">
                <Link to="/contact">Venir à l'atelier</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground/5 font-semibold">
                <Link to="/contact">Nos horaires</Link>
              </Button>
            </div>
          </div>
          <div>
            <img
              src={atelier}
              alt="Atelier de micro-soudure MOMUY & TECH"
              className="rounded-xl shadow-lg w-full h-64 md:h-80 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <OrangeDivider />

      {/* Nos Services */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 font-heading uppercase tracking-wide">
            Nos Services
          </h2>
          <p className="text-center text-muted-foreground text-sm max-w-xl mx-auto mb-10">
            Nous vous proposons une prise en charge claire,
            du diagnostic à la réparation grâce à un check-up complet,
            la prise en charge et la remise de l'appareil
            ainsi que grâce à un suivi de réparation en direct.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-steel/10 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg mb-4 text-center font-heading">{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrangeDivider />

      {/* Pourquoi choisir */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 font-heading uppercase tracking-wide">
            Pourquoi choisir MOMUY & TECH
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="bg-steel/10 rounded-xl p-8 text-center hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-base mb-4 font-heading uppercase">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrangeDivider />

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-lg font-semibold">Besoin d'un diagnostic ?</p>
          <p className="text-muted-foreground">
            Appelez-nous ou passez à l'atelier pour échanger sur votre appareil.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold mt-4">
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
