import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import boutique from "@/assets/boutique.png";
import atelier from "@/assets/atelier-reparation.webp";
import { Smartphone, Cpu, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Smartphone,
    title: "Réparation Smartphone",
    desc: "Écran, batterie, connecteur de charge, caméra... Toutes marques.",
  },
  {
    icon: Cpu,
    title: "Micro-soudure",
    desc: "Réparation de cartes mères avec équipement professionnel de précision.",
  },
  {
    icon: Shield,
    title: "Garantie",
    desc: "Toutes nos réparations sont garanties pour votre tranquillité.",
  },
  {
    icon: Clock,
    title: "Rapidité",
    desc: "La plupart des réparations sont effectuées dans la journée.",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-primary-foreground space-y-6 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight font-heading">
              Votre expert en{" "}
              <span className="text-accent">réparation</span> de smartphones &amp; électronique
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-lg">
              Atelier spécialisé en micro-soudure et réparation de cartes électroniques.
              Un savoir-faire artisanal au service de vos appareils.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                <Link to="/tarifs">Voir nos tarifs</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img
              src={boutique}
              alt="Boutique MOMUY & TECH"
              className="rounded-xl shadow-2xl w-full h-56 md:h-72 object-cover"
              loading="lazy"
            />
            <img
              src={atelier}
              alt="Atelier de micro-soudure"
              className="rounded-xl shadow-2xl w-full h-56 md:h-72 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-heading">
            Nos <span className="text-accent">services</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <f.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center text-primary-foreground space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold font-heading">
            Un problème avec votre appareil ?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Apportez-le nous pour un diagnostic gratuit. Notre équipe vous proposera la meilleure solution.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <Link to="/contact">Demander un devis</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
