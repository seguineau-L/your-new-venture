import Layout from "@/components/Layout";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { supabase } from "@/lib/supabase";
import facade from "@/assets/facade.jpg"; // remplace si ton fichier a un autre nom
import logoImg from "@/assets/icons/momuy-tech-algerian.svg";

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
const CONTACT_EMAIL = "À venir";

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
  { icon: Mail, title: "Email", value: CONTACT_EMAIL },
];

const Contact = () => {
  const scrollRef = useScrollReveal();
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
  const [hoursLoading, setHoursLoading] = useState(true);

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
      setHoursLoading(false);
    };

    fetchOpeningHours();
  }, []);

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
      <section className="py-16 md:py-24" ref={scrollRef}>
        <div id="time" className="container mx-auto px-4">
          <div className="scroll-reveal text-center mb-14">
            <h1 className="text-2xl md:text-4xl font-bold font-heading">
              <span className="text-gradient">Contactez</span>-nous
            </h1>
          </div>

          <div className="max-w-6xl mx-auto space-y-10">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              {/* Colonne gauche */}
              <div className="space-y-8 scroll-reveal">
                <div className="card-premium p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">Horaires</h3>
                      <p className="text-muted-foreground text-sm">
                        Nos horaires d’ouverture
                      </p>
                    </div>
                  </div>

                  {hoursLoading ? (
                    <p className="text-sm text-muted-foreground">Chargement...</p>
                  ) : (
                    <div className="space-y-2">
                      {openingHours.map((hour) => (
                        <div
                          key={hour.id}
                          className="flex justify-between gap-4 text-sm border-b border-border/20 pb-2 last:border-0"
                        >
                          <span className="font-medium">{hour.day_label}</span>
                          <span className="text-muted-foreground text-right">
                            {formatHours(hour)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="card-premium p-6 md:p-8 space-y-6">
                  {contactInfo.map((info) => (
                    <div id="contact" key={info.title} className="flex items-start gap-5 group">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:shadow-premium-glow transition-all duration-300">
                        <info.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-base">{info.title}</h3>
                        <p className="text-muted-foreground text-sm">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colonne droite */}
              <div className="scroll-reveal">
                <div className="card-premium p-0 overflow-hidden">
                  <img
                    src={facade}
                    alt="Façade du magasin"
                    className="w-full h-[420px] md:h-[520px] object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Carte pleine largeur en bas */}
            <div className="scroll-reveal">
              <div id="map" className="card-premium p-0 overflow-hidden">
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
                    className="w-full h-[360px] md:h-[440px] border-0 pointer-events-none"
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
    </Layout>
  );
};

export default Contact;