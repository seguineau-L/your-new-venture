import Layout from "@/components/Layout";
import atelier from "@/assets/atelier-reparation.webp";
import boutique from "@/assets/boutique.png";

const APropos = () => {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-center mb-12">
            À <span className="text-accent">propos</span>
          </h1>

          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src={boutique}
                alt="Boutique MOMUY & TECH"
                className="rounded-xl shadow-lg w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Notre boutique</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  MOMUY & TECH est un atelier de réparation de smartphones et d'électronique 
                  situé à Momuy, dans les Landes. Fondée par un couple passionné de technologie, 
                  notre boutique allie expertise technique et service de proximité.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nous accueillons nos clients dans un espace convivial où chaque appareil 
                  est traité avec le plus grand soin.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 md:order-1">
                <h2 className="text-xl font-bold">Notre atelier</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Équipé d'un matériel professionnel de pointe — microscopes, stations de 
                  micro-soudure, outils de diagnostic avancés — notre atelier nous permet 
                  d'intervenir sur les réparations les plus délicates.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  De la simple réparation d'écran à la micro-soudure de composants sur carte mère, 
                  nous mettons notre savoir-faire au service de la longévité de vos appareils.
                </p>
              </div>
              <img
                src={atelier}
                alt="Atelier de micro-soudure MOMUY & TECH"
                className="rounded-xl shadow-lg w-full h-64 object-cover md:order-2"
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
