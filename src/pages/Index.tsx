import {
  Clock,
  MapPin,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/atelier-reparation.webp";
import diagnosticImg from "@/assets/icons/diagnostique.svg";
import electroniqueImg from "@/assets/icons/carte-elec.svg";
import smartphonesImg from "@/assets/icons/reparation.svg";
import microsoudureImg from "@/assets/icons/microsoudure.svg";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <main className="min-h-screen bg-[#f4efe7] text-[#102337]">
        <section className="relative overflow-hidden bg-[#f4efe7]">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] min-h-[450px] gap-8 lg:gap-0">
            <div className="relative z-10 py-10 flex items-center bg-[#f4efe7] justify-center">
              <div className="w-full max-w-lg px-6 lg:translate-x-4">
                <p className="uppercase tracking-[0.18em] text-[#d87532] font-bold mb-5">
                  Atelier de réparation
                </p>

                <h1 className="font-serif text-6xl md:text-6xl xl:text-5xl leading-[0.9] font-bold text-[#102337] mb-5">
                  <span className="block">L’EXPERTISE</span>
                  <span className="block">AU SERVICE DE</span>
                  <span className="block">VOS APPAREILS</span>
                </h1>

                <p className="text-base md:text-lg leading-8 text-[#2b3d4d] mb-6">
                  Diagnostic, réparation et intervention sur smartphones,
                  consoles, PC, carte électronique et accessoires high-tech.
                  Un atelier local, un savoir-faire précis et un service durable.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact#map"
                    className="inline-flex items-center justify-center gap-3 rounded-md bg-[#d87532] px-7 py-4 text-white font-bold uppercase shadow-lg hover:bg-[#c96325] transition"
                  >
                    <MapPin className="w-5 h-5" />
                    Venir à l’atelier
                  </Link>

                  <Link
                    to="/contact#time"
                    className="inline-flex items-center justify-center gap-3 rounded-md border border-[#d87532] px-7 py-4 text-[#102337] font-bold uppercase hover:bg-white/60 transition"
                  >
                    <Clock className="w-5 h-5" />
                    Nos horaires
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative min-h-[calc(80vh-110px)]">
              <img
                src={heroImage}
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
                  alt={item.title}
                  className="block w-28 h-28 mb-4 object-contain flex-shrink-0"
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

        <section className="bg-[#f4efe7] text-center px-6 py-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-[0.18em] uppercase mb-3">
            Besoin d’un diagnostic ?
          </h2>
          <p className="text-[#52606c] mb-6">
            Passez à l’atelier pour échanger sur votre appareil.
          </p>
          <Link
            to="/contact#contact"
            className="inline-flex items-center justify-center rounded-md bg-[#09233a] px-10 py-3 text-white font-bold uppercase hover:bg-[#12314c] transition"
          >
            Nous contacter →
          </Link>
        </section>
      </main>
    </Layout>
  );
};

export default Index;