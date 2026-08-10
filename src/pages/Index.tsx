import { useEffect, useState } from "react";
import {
  Clock,
  MapPin,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import heroImage from "@/assets/atelier-reparation.webp";
import diagnosticImg from "@/assets/icons/diagnostique.svg";
import electroniqueImg from "@/assets/icons/carte-elec.svg";
import smartphonesImg from "@/assets/icons/reparation.svg";
import microsoudureImg from "@/assets/icons/microsoudure.svg";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";



const defaultContent = {
  home_hero_kicker: "Atelier de réparation",
  home_hero_title_line_1: "L’EXPERTISE",
  home_hero_title_line_2: "AU SERVICE DE",
  home_hero_title_line_3: "VOS APPAREILS",
  home_hero_description:
    "Diagnostic, réparation et intervention sur smartphones, consoles, PC, carte électronique et accessoires high-tech. Un atelier local, un savoir-faire précis et un service durable.",
  home_cta_map: "Venir à l’atelier",
  home_cta_hours: "Nos horaires",
  contact_phone: "À venir",
  contact_address: "121 route d'orthez, 40700 Momuy, Landes",
};

const Index = () => {
  const [content, setContent] = useState(defaultContent);
  const [heroImageUrl, setHeroImageUrl] = useState(heroImage);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content_key, content_value");

      if (error) {
        console.error("Erreur chargement contenu accueil :", error);
        return;
      }

      const formattedContent = { ...defaultContent };

      data?.forEach((item) => {
        if (item.content_key in formattedContent) {
          formattedContent[item.content_key as keyof typeof defaultContent] =
            item.content_value;
        }
      });

      setContent(formattedContent);
      const { data: imageData, error: imageError } = await supabase
        .from("site_images")
        .select("image_url")
        .eq("image_key", "home_hero_image")
        .single();

      if (!imageError && imageData?.image_url?.startsWith("http")) {
        setHeroImageUrl(imageData.image_url);
      }
    };

    fetchContent();
  }, []);
  return (
    <Layout>
      <Helmet>
        <title>
          Réparation Smartphone & Informatique Landes (40) | MOMUY & TECH | Hagetmau, Orthez
        </title>

        <meta
          name="description"
          content="Atelier de réparation électronique à Momuy. Service de proximité pour Hagetmau, Orthez et Mont-de-Marsan. Spécialiste smartphones, tablettes, PC et micro-soudure de précision dans les Landes (40)."
        />

        <meta
          name="keywords"
          content="réparation smartphone Hagetmau, réparateur téléphone Orthez, réparation PC Mont-de-Marsan, micro-soudure Landes, MOMUY TECH, réparation console Landes"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "MOMUY & TECH",
            "image": "https://momuy-tech.fr/assets/atelier-reparation.webp",
            "telePhone": content.contact_phone,
            "url": "https://momuy-tech.fr",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": content.contact_address,
              "addressLocality": "Momuy",
              "postalCode": "40700",
              "addressRegion": "Landes",
              "addressCountry": "FR"
            },
            "areaServed": [
              { "@type": "City", "name": "Momuy" },
              { "@type": "City", "name": "Hagetmau" },
              { "@type": "City", "name": "Orthez" },
              { "@type": "City", "name": "Mont-de-Marsan" },
              { "@type": "City", "name": "Saint-Sever" },
              { "@type": "City", "name": "Mugron" }
            ],
            "description": content.home_hero_description,
            "priceRange": "$$"
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-[#f4efe7] text-[#102337]">
        <section className="relative overflow-hidden bg-[#f4efe7]">
          <div className="relative lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] min-h-[calc(100vh-110px)] gap-8 lg:gap-0">

            {/* Image en fond sur mobile */}
            <div className="absolute inset-0 lg:hidden">
              <img
                src={heroImageUrl}
                alt="Atelier de réparation électronique"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#f4efe7]/85 backdrop-blur-[1px]" />
            </div>

            {/* Texte */}
            <div className="relative z-10 py-10 flex items-center justify-center bg-transparent lg:bg-[#f4efe7]">
              <div className="w-full max-w-lg px-6 text-center lg:text-left lg:translate-x-4">
                <p className="uppercase tracking-[0.18em] text-[#d87532] font-bold mb-5">
                  {content.home_hero_kicker}
                </p>

                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-5xl leading-[0.9] font-bold text-[#102337] mb-5">
                  <span className="block">{content.home_hero_title_line_1}</span>
                  <span className="block">{content.home_hero_title_line_2}</span>
                  <span className="block">{content.home_hero_title_line_3}</span>
                </h1>

                <p className="text-base md:text-lg leading-8 text-[#2b3d4d] mb-6">
                  {content.home_hero_description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    to="/contact#map"
                    className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#d87532] px-7 py-4 text-white font-bold uppercase shadow-lg hover:bg-[#c96325] transition"
                  >
                    <MapPin className="w-5 h-5" />
                    {content.home_cta_map}
                  </Link>

                  <Link
                    to="/contact#horaires"
                    className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#d87532] px-7 py-4 text-[#102337] font-bold uppercase hover:bg-white/60 transition"
                  >
                    <Clock className="w-5 h-5" />
                    {content.home_cta_hours}
                  </Link>
                </div>
              </div>
            </div>

            {/* Image à droite sur desktop */}
            <div className="relative hidden lg:block min-h-[calc(80vh-110px)]">
              <img
                src={heroImageUrl}
                alt="Atelier de réparation électronique"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#f4efe7] via-[#f4efe7]/90 to-transparent backdrop-blur-[1px]" />
            </div>
          </div>
        </section>

        <section className="bg-[#09233a] text-white">
          <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Diagnostic",
                text: "Contrôle et recherche de panne",
              },
              {
                title: "Électronique",
                text: "Cartes électroniques, PC, consoles",
              },
              {
                title: "Smartphones",
                text: "Écrans, batteries, connecteurs",
              },
              {
                title: "Microsoudure",
                text: "Soudure fine, composants et interventions délicates",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`flex flex-col items-center text-center px-6 ${index !== 0 ? "md:border-l md:border-[#d87532]/60" : ""
                  }`}
              >
                <img
                  src={
                    item.title === "Diagnostic"
                      ? diagnosticImg
                      : item.title === "Électronique"
                        ? electroniqueImg
                        : item.title === "Smartphones"
                          ? smartphonesImg
                          : microsoudureImg
                  }
                  alt={`${item.title} - Service de réparation électronique à Momuy`}
                  className={`block w-32 h-32 mb-4 object-contain flex-shrink-0 ${item.title === "Électronique" ? "scale-150" : ""
                    }`}
                />
                <h3 className="uppercase font-bold tracking-wide mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f7f1e8] border-b border-[#e0d2c1]">
          <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Un atelier local",
                text: "Service de proximité, suivi personnalisé.",
              },
              {
                icon: ShieldCheck,
                title: "Diagnostic transparent",
                text: "Devis clair et détaillé, sans surprise.",
              },
              {
                icon: Wrench,
                title: "Expertise technique",
                text: "Matériel professionnel et réparations durables.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`flex items-center gap-5 ${index !== 0 ? "md:border-l md:border-[#d8c8b5] md:pl-8" : ""
                  }`}
              >
                <item.icon className="w-12 h-12 text-[#102337]" />
                <div>
                  <h3 className="uppercase font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-[#52606c] leading-6">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f7f1e8] py-12 border-t border-[#e0d2c1]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-xl font-bold uppercase tracking-widest text-[#102337] mb-4">
              Atelier local à Momuy
            </h2>
            <p className="text-[#52606c] text-sm max-w-2xl mx-auto leading-relaxed">
              Notre atelier est situé au cœur des Landes à <strong>Momuy</strong>. Nous accueillons les clients de tout le département et sommes la solution de proximité pour :
              <br />
              <span className="font-semibold text-[#d87532]">
                Hagetmau • Mugron • Saint-Sever • Orthez • Mont-de-Marsan • Aire-sur-l'Adour
              </span>
            </p>
          </div>
        </section>

        <section className="bg-[#f7f1e8] py-12 border-t border-[#e0d2c1]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-xl font-bold uppercase tracking-widest text-[#102337] mb-4">
              Atelier local à Momuy
            </h2>
            <p className="text-[#52606c] text-sm max-w-2xl mx-auto leading-relaxed">
              Notre atelier est situé au cœur des Landes à <strong>Momuy</strong>. Nous accueillons les clients de tout le département et sommes la solution de proximité pour :
              <br />
              <span className="font-semibold text-[#d87532]">
                Hagetmau • Mugron • Saint-Sever • Orthez • Mont-de-Marsan • Aire-sur-l'Adour
              </span>
            </p>
          </div>
        </section>

        <section className="bg-[#f4efe7] py-16">
          <div className="container mx-auto px-6">
            <div className="card-premium p-10 text-center animate-in fade-in duration-300">
              <h2 className="text-2xl md:text-3xl font-bold tracking-[0.18em] uppercase mb-3">
                Besoin d’un diagnostic ?
              </h2>
              <p className="text-[#52606c] mb-6">
                Passez à l’atelier pour échanger sur votre appareil.
              </p>
              <Link
                to="/contact#contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#09233a] px-10 py-3 text-white font-bold uppercase hover:bg-[#12314c] transition"
              >
                Nous contacter →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout >
  );
};

export default Index;