import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import atelier from "@/assets/atelier-reparation.webp";
import { Search, Cpu, Smartphone } from "lucide-react";
import solderIcon from "@/assets/logoPen.png";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
 
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
    icon: "custom-solder",
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

const Index = () => {
  
  const scrollRef = useScrollReveal();

  return (
    <Layout>
      <div ref={scrollRef}>
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
            <div className="space-y-8 scroll-reveal">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight font-heading uppercase tracking-wide">
                Réparation<br />
                <span className="text-gradient">smartphone</span> et carte électronique
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-lg text-base">
                Diagnostic, réparation et intervention sur smartphones,
                console, pc, carte électronique et accessoires high-tech.
                Nous sommes un atelier local, sérieux et orienté réparation durable.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/contact"
                  className="btn-premium px-8 py-3 rounded-xl text-sm inline-block"
                >
                  Venir à l'atelier
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3 rounded-xl text-sm font-semibold border-2 border-primary/20 text-primary hover:border-accent hover:text-accent transition-all duration-300 inline-block"
                >
                  Nos horaires
                </Link>
              </div>
            </div>
            <div className="scroll-reveal">
              <img
                src={atelier}
                alt="Atelier de micro-soudure MOMUY & TECH"
                className="rounded-2xl shadow-premium-lg w-full h-72 md:h-96 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <div className="divider-glow my-4" />

        {/* Nos Services */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="scroll-reveal text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold mb-5 font-heading uppercase tracking-wide">
                Nos <span className="text-gradient">Services</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Nous vous proposons une prise en charge claire,
                du diagnostic à la réparation grâce à un check-up complet,
                la prise en charge et la remise de l'appareil
                ainsi que grâce à un suivi de réparation en direct.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-reveal">
             {services.map((s) => (
                <div
                  key={s.title}
                  className="card-premium p-7 stagger-child group transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:border-accent/15"
                >

            {/* ICON + TITRE */}
            <div className="flex items-center gap-3 mb-4">
             <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center transition-all duration-300 group-hover:bg-accent/15 shrink-0">
                {s.icon === "custom-solder" ? (
                  <img
                    src={solderIcon}
                    alt="Fer à souder"
                    className="w-12 h-12 object-contain"
                   />
                ) : (
                    <s.icon className="w-6 h-6 text-accent transition-opacity duration-300 group-hover:opacity-90" />
                )}
              </div>

              <h3 className="font-bold text-lg font-heading transition-colors duration-300 group-hover:text-accent">
                {s.title}
              </h3>
            </div>

            {/* LISTE */}
             <ul className="space-y-2.5">
              {s.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-accent mt-0.5 text-xs">●</span>
                    {item}
                </li>
              ))}
            </ul>
        </div>
      ))}
  </div>
</div>
 </section>

        <div className="divider-glow my-4" />

        {/* Pourquoi choisir */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="scroll-reveal text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-bold font-heading uppercase tracking-wide">
                Pourquoi choisir <span className="text-gradient">MOMUY & TECH</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 scroll-reveal">
              {reasons.map((r) => (
                <div
                  key={r.title}
                  className="card-premium p-10 text-center stagger-child"
                >
                  <h3 className="font-bold text-base mb-5 font-heading uppercase tracking-wide">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-glow my-4" />

        {/* CTA */}
        <section className="py-16 md:py-24 scroll-reveal">
          <div className="container mx-auto px-4 text-center space-y-6">
            <p className="text-xl md:text-2xl font-bold font-heading">Besoin d'un diagnostic ?</p>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              Appelez-nous ou passez à l'atelier pour échanger sur votre appareil.
            </p>
            <Link
              to="/contact"
              className="btn-premium px-10 py-4 rounded-xl text-sm inline-block mt-4"
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
