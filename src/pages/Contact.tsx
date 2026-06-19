import Layout from "@/components/Layout";
import { MapPin, Phone, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { supabase } from "@/lib/supabase";
import facade from "@/assets/facade.jpg"; // remplace si ton fichier a un autre nom

type OpeningHour = {
  id: number;
  day_key: string;
  day_label: string;
  open_morning: string | null;
  close_morning: string | null;
  open_afternoon: string | null;
  close_afternoon: string | null;
  is_closed: boolean;
  sort_order: number;
};

const CONTACT_ADDRESS = "À venir — Momuy, Landes (40)";
const CONTACT_PHONE = "À venir";

/**
 * Remplace cette URL dès que tu as l’adresse exacte du magasin.
 * Exemple :
 * https://www.google.com/maps/search/?api=1&query=40+Rue+Exemple+40250+Mugron
 */
const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=121+route+d%27orthez+40700+momuy";

const contactInfo = [
  { icon: MapPin, title: "Adresse", value: CONTACT_ADDRESS },
  { icon: Phone, title: "Téléphone", value: CONTACT_PHONE },
];

const Contact = () => {
  const scrollRef = useScrollReveal();
  const location = useLocation();
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
  const [hoursLoading, setHoursLoading] = useState(true);
  const [facadeImageUrl, setFacadeImageUrl] = useState(facade);

  useEffect(() => {
    const fetchOpeningHours = async () => {
      setHoursLoading(true);

      const { data, error } = await supabase
        .from("opening_hours")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Erreur chargement horaires :", error);
        setHoursLoading(false);
        return;
      }

      setOpeningHours((data ?? []) as OpeningHour[]);

      const { data: imageData, error: imageError } = await supabase
        .from("site_images")
        .select("image_url")
        .eq("image_key", "contact_facade_image")
        .single();

      if (!imageError && imageData?.image_url?.startsWith("http")) {
        setFacadeImageUrl(imageData.image_url);
      }

      setHoursLoading(false);
    };

    fetchOpeningHours();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);

      if (element) {
        setTimeout(() => {
          const yOffset =
            location.hash === "#horaires" ? -140 : -80;

          const y =
            element.getBoundingClientRect().top +
            window.scrollY +
            yOffset;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [location]);
  const formatHours = (hour: OpeningHour) => {
    if (hour.is_closed) return "Fermé";

    const morning =
      hour.open_morning && hour.close_morning
        ? `${hour.open_morning} - ${hour.close_morning}`
        : null;

    const afternoon =
      hour.open_afternoon && hour.close_afternoon
        ? `${hour.open_afternoon} - ${hour.close_afternoon}`
        : null;

    if (morning && afternoon) return `${morning} / ${afternoon}`;
    if (morning) return morning;
    if (afternoon) return afternoon;

    return "Fermé";
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-[#f4efe7] text-[#102337]" ref={scrollRef}>
        <div id="time" className="container mx-auto px-4">
          <div className="scroll-reveal text-center mb-14">
            <h1 className="font-serif text-4xl md:text-5xl leading-[0.95] font-bold text-[#102337]">
              <span className="text-[#d87532]">Contactez</span>-nous
            </h1>
          </div>

          <div className="max-w-6xl mx-auto space-y-10">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Colonne gauche */}
              <div className="space-y-8 scroll-reveal">
                <div
                  id="horaires"
                  className="rounded-2xl bg-[#f7f1e8] border border-[#d8c8b5] shadow-sm p-8"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#d87532]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">Horaires</h3>
                      <p className="text-[#52606c] text-sm">
                        Nos horaires d’ouverture
                      </p>
                    </div>
                  </div>

                  {hoursLoading ? (
                    <p className="text-sm text-[#52606c]">Chargement...</p>
                  ) : (
                    <div className="space-y-2">
                      {openingHours.map((hour) => (
                        <div
                          key={hour.id}
                          className="flex justify-between gap-4 text-sm border-b border-border/20 pb-2 last:border-0"
                        >
                          <span className="font-medium">{hour.day_label}</span>
                          <span className="text-[#52606c] text-right">
                            {formatHours(hour)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl bg-[#f7f1e8] border border-[#d8c8b5] shadow-sm p-8">
                  {contactInfo.map((info) => (
                    <div
                      id="contact"
                      key={info.title}
                      className="flex items-start gap-6 py-3 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#d87532]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d87532]/20 transition-all duration-300">
                        <info.icon className="w-5 h-5 text-[#d87532]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#102337] mb-1 text-base">{info.title}</h3>
                        <p className="text-[#52606c] text-sm">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colonne droite */}
              <div className="scroll-reveal">
                <div className="rounded-2xl bg-[#f7f1e8] border border-[#d8c8b5] shadow-sm">
                  <img
                    src={facadeImageUrl}
                    alt="Façade du magasin"
                    className="w-full h-[420px] md:h-[520px] object-cover object-center rounded-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Carte pleine largeur en bas */}
            <div className="scroll-reveal">
              <div
                id="map"
                className="rounded-2xl overflow-hidden border border-[#d8c8b5] bg-[#f7f1e8] shadow-sm"
              >
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative"
                  aria-label="Ouvrir la localisation dans Maps"
                >
                  <iframe
                    title="Carte du magasin"
                    src="https://www.google.com/maps?q=121+route+d%27orthez+40700+momuy&z=16&output=embed"
                    className="w-full h-[360px] md:h-[440px] border-0 rounded-2xl"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  <div className="absolute inset-0 bg-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto">
                    <div className="inline-flex items-center gap-2 rounded-xl bg-background/90 backdrop-blur px-4 py-3 text-sm font-semibold shadow-premium">
                      <MapPin className="w-4 h-4 text-accent" />
                      Ouvrir dans Maps / Démarrer l’itinéraire
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout >
  );
};

export default Contact;