import Layout from "@/components/Layout";
import atelier from "@/assets/atelier-reparation.webp";
import boutique from "@/assets/boutique.webp";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import logoImg from "@/assets/icons/momuy-tech-algerian.svg";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Helmet } from "react-helmet-async";

const defaultContent = {
  about_title: "À propos",

  about_shop_title: "Notre boutique",

  about_shop_text_1:
    "Chez MOMUY & TECH, nous vous accueillons pour toute réparation de smartphones, de consoles et d’appareils électroniques.\nSituée à Momuy, dans les Landes, notre boutique a été fondée par Kilian et Léonie en 2026, par pure passion de la réparation.\n\nNotre aventure a débuté en plein confinement, lors de la grande pénurie de cartes graphiques. Passionné de technologie, Kilian décide alors d'apprendre à réparer ces composants introuvables et devenus hors de prix. Installé dans un atelier de fortune au sous-sol de notre ancien logement, il y consacre chaque heure de son temps libre : tests, persévérance, achat de matériel hors service pour s’exercer encore et encore.\n\nToute cette agitation pique la curiosité de Léonie, qui s'intéresse à son tour à la réparation. Kilian l'encourage en lui permettant de suivre une formation certifiée en réparation de téléphonie.",

  about_shop_text_2:
    "Aujourd’hui, nous sommes fiers de vous ouvrir les portes de notre boutique landaise. Notre objectif est simple : mettre nos compétences techniques au service de vos appareils, pour que vous n’ayez plus jamais à entendre un SAV vous annoncer : « La carte mère est morte, il faut racheter un appareil neuf », dans la mesure du possible.\n\nNous intervenons notamment sur les cartes électroniques grâce à la micro-soudure, ainsi que sur le remplacement de pièces de vos appareils. Nous vous accueillons dans un espace convivial, où chaque demande est prise en charge avec soin et où la confidentialité de vos données est respectée.",

  about_workshop_title: "Notre atelier",

  about_workshop_text_1:
    "Pour vous garantir des réparations durables et soignées, nous avons fait le choix d’investir dans un équipement moderne et adapté à chaque besoin.\n\nCôté atelier, Kilian dispose de tout le matériel nécessaire pour intervenir avec une précision chirurgicale : microscope haute définition pour inspecter les circuits presque invisibles à l’œil nu, stations de soudure de précision et outils de diagnostic avancés. Cela nous permet de localiser les pannes complexes et de réparer vos cartes électroniques pouvant aller jusqu’à la reconstruction des pistes.",

  about_workshop_text_2:
    "Nous sommes également équipés d’une machine de découpe de film hydrogel sur mesure. En quelques secondes, elle nous permet de découper et de poser une protection d'écran ultra-résistante, parfaitement ajustée à n’importe quel modèle : smartphones (anciens comme récents), consoles portables, tablettes ou montres connectées.\n\nChaque appareil qui passe entre nos mains bénéficie ainsi du bon outil et de toute notre attention.",
};

const APropos = () => {
  const scrollRef = useScrollReveal();
  const [content, setContent] = useState(defaultContent);
  const [shopImageUrl, setShopImageUrl] = useState(boutique);
  const [workshopImageUrl, setWorkshopImageUrl] = useState(atelier);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content_key, content_value");

      if (error) {
        console.error(error);
        return;
      }

      const formattedContent = { ...defaultContent };

      data?.forEach((item) => {
        if (item.content_key in formattedContent && item.content_value) {
          // Ignorer les anciens textes par défaut de la base si non personnalisés
          if (
            item.content_key === "about_workshop_text_1" &&
            item.content_value.includes("Équipé d’un matériel professionnel")
          ) {
            return;
          }
          if (
            item.content_key === "about_workshop_text_2" &&
            item.content_value.includes("De la simple réparation d’écran")
          ) {
            return;
          }
          if (
            item.content_key === "about_shop_text_1" &&
            item.content_value.includes("Fondée par un couple passionné de technologie")
          ) {
            return;
          }
          if (
            item.content_key === "about_shop_text_2" &&
            item.content_value.includes("Nous accueillons nos clients dans un espace convivial")
          ) {
            return;
          }

          formattedContent[
            item.content_key as keyof typeof defaultContent
          ] = item.content_value;
        }
      });

      setContent(formattedContent);
      const { data: imagesData, error: imagesError } = await supabase
        .from("site_images")
        .select("image_key, image_url");

      if (!imagesError && imagesData) {
        imagesData.forEach((image) => {
          if (
            image.image_key === "about_shop_image" &&
            image.image_url.startsWith("http")
          ) {
            setShopImageUrl(image.image_url);
          }

          if (
            image.image_key === "about_workshop_image" &&
            image.image_url.startsWith("http")
          ) {
            setWorkshopImageUrl(image.image_url);
          }
        });
      }
    };

    fetchContent();
  }, []);

  const fullShopText =
    (content.about_shop_text_1 || "") +
    (content.about_shop_text_2 ? "\n\n" + content.about_shop_text_2 : "");

  const splitIndex = fullShopText.search(/Aujourd['’]hui/i);
  const topShopText =
    splitIndex !== -1
      ? fullShopText.slice(0, splitIndex).trim()
      : content.about_shop_text_1;
  const bottomShopTextRaw =
    splitIndex !== -1
      ? fullShopText.slice(splitIndex).trim()
      : content.about_shop_text_2;

  const bottomShopText = bottomShopTextRaw
    ? bottomShopTextRaw
        .replace(
          /«\s*La carte mère est morte, il faut racheter un appareil neuf\s*»\.?(?!\s*,\s*dans la mesure)/i,
          "« La carte mère est morte, il faut racheter un appareil neuf », dans la mesure du possible."
        )
        .replace(/\.\./g, ".")
    : "";

  return (
    <Layout>
      <Helmet>
        <title>
          À propos de MOMUY & TECH | Atelier de réparation électronique
        </title>

        <meta
          name="description"
          content="Découvrez MOMUY & TECH, atelier de réparation électronique situé à Momuy. Une entreprise spécialisée dans la réparation de smartphones, ordinateurs, cartes électroniques et micro-soudure de précision."
        />
        <link rel="canonical" href="https://momuy-tech.fr/a-propos" />
      </Helmet>
      <section className="py-16 md:py-24 bg-[#f4efe7] text-[#102337]"
        ref={scrollRef} >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="scroll-reveal text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl leading-[0.95] font-bold text-[#102337]">
              {content.about_title}
            </h1>
          </div>

          <div className="space-y-16 md:space-y-20">
            {/* Section Notre boutique conforme à la maquette */}
            <div className="space-y-6 scroll-reveal">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start">
                <img
                  src={shopImageUrl}
                  alt={`Boutique MOMUY & TECH - Votre réparateur de proximité à Momuy`}
                  width="600"
                  height="450"
                  loading="lazy"
                  decoding="async"
                  className="rounded-2xl border border-[#d8c8b5] shadow-sm w-full aspect-[4/3] object-cover"
                />
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#102337]">
                    {content.about_shop_title}
                  </h2>
                  <p className="text-[#52606c] leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {topShopText}
                  </p>
                </div>
              </div>

              {bottomShopText && (
                <p className="text-[#52606c] leading-relaxed whitespace-pre-line text-sm sm:text-base pt-1">
                  {bottomShopText}
                </p>
              )}
            </div>

            <div className="divider-glow" />

            <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-start scroll-reveal">
              <div className="space-y-4 md:order-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#102337]">
                  {content.about_workshop_title}
                </h2>
                <p className="text-[#52606c] leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {content.about_workshop_text_1}
                </p>
                <p className="text-[#52606c] leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {content.about_workshop_text_2}
                </p>
              </div>
              <img
                src={workshopImageUrl}
                alt={`Atelier de micro-soudure MOMUY & TECH - Expertise électronique Landes`}
                width="600"
                height="450"
                loading="lazy"
                decoding="async"
                className="rounded-2xl border border-[#d8c8b5] shadow-sm w-full aspect-[4/3] object-cover md:order-2"
              />

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default APropos;
