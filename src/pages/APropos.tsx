import Layout from "@/components/Layout";
import atelier from "@/assets/atelier-reparation.webp";
import boutique from "@/assets/boutique.png";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import logoImg from "@/assets/icons/momuy-tech-algerian.svg";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const defaultContent = {
  about_title: "À propos",

  about_shop_title: "Notre boutique",

  about_shop_text_1:
    "MOMUY & TECH est un atelier de réparation de smartphones et d’électronique situé à Momuy, dans les Landes. Fondée par un couple passionné de technologie, notre boutique allie expertise technique et service de proximité.",

  about_shop_text_2:
    "Nous accueillons nos clients dans un espace convivial où chaque appareil est traité avec le plus grand soin.",

  about_workshop_title: "Notre atelier",

  about_workshop_text_1:
    "Équipé d’un matériel professionnel de pointe — microscopes, stations de micro-soudure, outils de diagnostic avancés — notre atelier nous permet d’intervenir sur les réparations les plus délicates.",

  about_workshop_text_2:
    "De la simple réparation d’écran à la micro-soudure de composants sur carte mère, nous mettons notre savoir-faire au service de la longévité de vos appareils.",
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
        if (item.content_key in formattedContent) {
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

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-[#f4efe7] text-[#102337]"
        ref={scrollRef} >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="scroll-reveal text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl leading-[0.95] font-bold text-[#102337]">
              {content.about_title}
            </h1>
          </div>

          <div className="space-y-20">
            <div className="grid md:grid-cols-2 gap-10 items-center scroll-reveal">
              <img
                src={shopImageUrl}
                alt="Boutique MOMUY & TECH"
                className="rounded-2xl border border-[#d8c8b5] shadow-sm w-full h-72 object-cover"
                loading="lazy"
              />
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-bold text-[#102337]">
                  {content.about_shop_title}
                </h2>
                <p className="text-[#52606c] leading-relaxed">
                  {content.about_shop_text_1}
                </p>
                <p className="text-[#52606c] leading-relaxed">
                  {content.about_shop_text_2}
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-[#d8c8b5]" />

            <div className="grid md:grid-cols-2 gap-10 items-center scroll-reveal">
              <div className="space-y-5 md:order-1">
                <h2 className="text-xl md:text-2xl font-bold font-heading">
                  {content.about_workshop_title}
                </h2>
                <p className="text-[#52606c] leading-relaxed">
                  {content.about_workshop_text_1}
                </p>
                <p className="text-[#52606c] leading-relaxed">
                  {content.about_workshop_text_2}
                </p>
              </div>
              <img
                src={workshopImageUrl}
                alt="Atelier de micro-soudure MOMUY & TECH"
                className="rounded-2xl border border-[#d8c8b5] shadow-sm w-full h-72 object-cover md:order-2"
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
