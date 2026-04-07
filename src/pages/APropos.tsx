import Layout from "@/components/Layout";
import atelier from "@/assets/atelier-reparation.webp";
import boutique from "@/assets/boutique.png";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const APropos = () => {
  const scrollRef = useScrollReveal();

  return (
    <Layout>
      <section className="py-16 md:py-24" ref={scrollRef}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="scroll-reveal text-center mb-16">
            <h1 className="text-2xl md:text-4xl font-bold font-heading">
              À <span className="text-gradient">propos</span>
            </h1>
          </div>

          <div className="space-y-20">
            <div className="grid md:grid-cols-2 gap-10 items-center scroll-reveal">
              <img
                src={boutique}
                alt="Boutique MOMUY & TECH"
                className="rounded-2xl shadow-premium-lg w-full h-72 object-cover"
                loading="lazy"
              />
              <div className="space-y-5">
                <h2 className="text-xl md:text-2xl font-bold font-heading">Notre boutique</h2>
                <p className="text-muted-foreground leading-relaxed">
                  MOMUY & TECH est un atelier de réparation de smartphones et d'électronique 
                  situé à Momuy, dans les Landes. Fondée par un couple passionné de technologie, 
                  notre boutique allie expertise technique et service de proximité.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Nous accueillons nos clients dans un espace convivial où chaque appareil 
                  est traité avec le plus grand soin.
                </p>
              </div>
            </div>

            <div className="divider-glow" />

            <div className="grid md:grid-cols-2 gap-10 items-center scroll-reveal">
              <div className="space-y-5 md:order-1">
                <h2 className="text-xl md:text-2xl font-bold font-heading">Notre atelier</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Équipé d'un matériel professionnel de pointe — microscopes, stations de 
                  micro-soudure, outils de diagnostic avancés — notre atelier nous permet 
                  d'intervenir sur les réparations les plus délicates.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  De la simple réparation d'écran à la micro-soudure de composants sur carte mère, 
                  nous mettons notre savoir-faire au service de la longévité de vos appareils.
                </p>
              </div>
              <img
                src={atelier}
                alt="Atelier de micro-soudure MOMUY & TECH"
                className="rounded-2xl shadow-premium-lg w-full h-72 object-cover md:order-2"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default APropos;
