import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Search,
  Microscope,
  Zap,
  FileText,
  Droplets,
  Plug,
  BatteryWarning,
  Fan,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Écoute & Symptômes",
    icon: Search,
    description:
      "Chaque réparation commence par ce que vous observez au quotidien : un comportement inhabituel, une petite chute ou un signe avant-coureur… Vos explications sont le point de départ de nos recherches pour trouver ensemble la solution adaptée.",
  },
  {
    number: "02",
    title: "Inspection visuelle & Microscope",
    icon: Microscope,
    description:
      "Un premier examen visuel est d'abord établi. Pour les pannes plus minutieuses, nous sommes équipés d'un microscope pour repérer les pistes abîmées, soudures fissurées, composants endommagés ou traces d'oxydation.",
  },
  {
    number: "03",
    title: "Mesures & Recherche électrique",
    icon: Zap,
    description:
      "Nos appareils de mesure permettent de déceler les dysfonctionnements électriques invisibles à l'œil nu grâce à l'alimentation stabilisée, la caméra thermique ou encore le multimètre.",
  },
  {
    number: "04",
    title: "Devis clair & Sans surprise",
    icon: FileText,
    description:
      "Explication claire de la panne et devis transparent. Rien n'est engagé sans votre accord préalable : si une anomalie cachée apparaît au démontage, nous vous recontactons systématiquement avant toute nouvelle action.",
  },
];

const reflexes = [
  {
    title: "Téléphone tombé dans l'eau : le mythe du riz",
    icon: Droplets,
    badge: "Idée reçue courante",
    myth: "« Mets ton téléphone dans un bol de riz pendant 48 heures, ça va absorber toute l'humidité. »",
    reality:
      "C'est une légende ! Le riz absorbe très peu l'eau emprisonnée à l'intérieur. Pire encore : la poussière d'amidon du riz s'infiltre dans les connecteurs et se transforme en pâte collante. L'eau stagnante commence à corroder les circuits électroniques en quelques heures seulement.",
    goodReflex:
      "Éteignez immédiatement l'appareil. Ne le branchez SURTOUT PAS au chargeur et n'essayez pas de l'allumer. Apportez-le le plus rapidement possible à l'atelier pour un démontage complet, un séchage et si nécessaire une désoxydation dans la cuve à ultrasons.",
  },
  {
    title: "Port de charge qui ne fonctionne plus : souvent juste sale",
    icon: Plug,
    badge: "Panne fréquente",
    myth: "« Mon câble ne tient plus ou ne charge plus, le connecteur de charge est cassé, il faut tout remplacer. »",
    reality:
      "Dans la grande majorité des cas, ce sont simplement des peluches de poche, de la poussière ou des résidus textiles compactés au fond du port USB-C ou Lightning par les branchements successifs.",
    goodReflex:
      "N'insérez jamais d'aiguille en métal, de trombone ou d'objet conducteur (risque de court-circuit irréversible sur les broches d'alimentation). Passez à l'atelier : nous réalisons GRATUITEMENT un nettoyage sous microscope avec des outils antistatiques adaptés.",
  },
  {
    title: "Batterie qui gonfle ou écran qui se soulève",
    icon: BatteryWarning,
    badge: "Alerte sécurité",
    myth: "« L'écran se décolle, je vais remettre un point de colle pour le faire tenir. »",
    reality:
      "Quand une batterie lithium vieillit anormalement ou a subi un choc thermique, elle produit des gaz sous pression qui poussent l'écran ou la coque arrière vers l'extérieur. Ce phénomène peut survenir sur n'importe quel appareil équipé d'une batterie (smartphone, PC portable, console portable, montre connectée...).",
    goodReflex:
      "Cessez immédiatement de recharger l'appareil. N'appuyez surtout pas sur l'écran pour tenter de le refermer et ne percez jamais la batterie. Déposez-le à l'atelier pour un remplacement en toute sécurité.",
  },
  {
    title: "PC ou console qui s'emballe, chauffe et/ou s'éteint",
    icon: Fan,
    badge: "Entretien préventif",
    myth: "« C'est vieux, c'est normal que ça souffle comme un avion et que ça coupe en jeu. »",
    reality:
      "Avec le temps, la poussière colmate les radiateurs et la pâte thermique sèche, perdant toute efficacité conductrice. Le processeur se met alors en sécurité thermique pour éviter de brûler.",
    goodReflex:
      "Un entretien périodique complet (dépoussiérage interne, nettoyage des ventilateurs et renouvellement de la pâte thermique haute performance) redonne une seconde jeunesse à votre équipement et évite une panne irréversible de la carte mère. Si vous n'êtes pas à l'aise pour le réaliser vous-même, nous proposons ce service complet à l'atelier.",
  },
];

const Diagnostic = () => {
  const canonical = "https://momuy-tech.fr/diagnostic";

  return (
    <Layout>
      <Helmet>
        <title>Diagnostic et conseils réparation | MOMUY & TECH</title>
        <meta
          name="description"
          content="Découvrez comment se déroule un diagnostic chez MOMUY & TECH à Momuy. Méthode transparente sous microscope, recherche de panne et bons réflexes en cas de panne."
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Diagnostic et recherche de panne électronique",
            description:
              "Diagnostic méthodique sous microscope, mesures électriques et devis clair pour smartphones, PC, consoles et cartes électroniques.",
            serviceType: "Diagnostic électronique",
            url: canonical,
            provider: {
              "@type": "LocalBusiness",
              name: "MOMUY & TECH",
              url: "https://momuy-tech.fr/",
              address: {
                "@type": "PostalAddress",
                streetAddress: "121 route d'orthez",
                addressLocality: "Momuy",
                postalCode: "40700",
                addressRegion: "Landes",
                addressCountry: "FR",
              },
            },
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-[#f4efe7] text-[#102337]">
        {/* En-tête héro */}
        <section className="py-14 md:py-18 bg-[#09233a] text-[#f4efe7] border-b border-white/10 shadow-inner">
          <div className="container mx-auto max-w-5xl px-4 text-center">
            <nav aria-label="Fil d’Ariane" className="mb-6 text-sm text-[#f4efe7]/60">
              <Link to="/" className="hover:text-[#d87532] transition-colors">
                Accueil
              </Link>
              <span aria-hidden="true" className="mx-2 text-[#d87532]">
                /
              </span>
              <span className="text-[#f4efe7]/90">Diagnostic</span>
            </nav>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#d87532]">
              Méthode & Transparence
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-[#f4efe7]">
              Comment se passe un diagnostic à l'atelier ?
            </h1>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[#f4efe7]/80 max-w-3xl mx-auto">
              Chez <strong className="text-white">MOMUY & TECH</strong>, nous n'établissons pas de devis au hasard. Chaque appareil fait l'objet d'un contrôle rigoureux avec du matériel professionnel pour identifier la cause exacte du problème avant d'engager des frais.
            </p>
          </div>
        </section>

        {/* Les 4 étapes du diagnostic */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-block rounded-full bg-[#d87532]/10 border border-[#d87532]/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#d87532] mb-3">
                Méthodologie
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-[#09233a]">
                Notre démarche en 4 étapes
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className="card-premium p-6 flex flex-col justify-between hover:border-[#d87532]/60 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#09233a] text-white flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#d87532]" />
                        </div>
                        <span className="text-3xl font-serif font-bold text-[#d87532]/40">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#09233a] mb-2 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#52606c] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Rubrique : Les bons gestes & Idées reçues */}
        <section className="py-12 md:py-16 bg-[#f7f1e8] border-t border-b border-[#e0d2c1]">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-block rounded-full bg-[#d87532]/10 border border-[#d87532]/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#d87532] mb-3">
                Guide pratique & Prévention
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-[#09233a] mb-3">
                Les bons réflexes & Idées reçues
              </h2>
              <p className="text-sm md:text-base text-[#52606c] leading-relaxed">
                Face à une panne ou un accident, certains réflexes intuitifs peuvent aggraver les dégâts. Voici ce qu'il faut vraiment faire.
              </p>
            </div>

            <div className="space-y-6">
              {reflexes.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="card-premium p-6 md:p-8 bg-white shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e0d2c1] pb-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#09233a] flex items-center justify-center flex-shrink-0 text-white">
                          <Icon className="w-6 h-6 text-[#d87532]" />
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#d87532] block mb-1">
                            {item.badge}
                          </span>
                          <h3 className="text-lg md:text-xl font-bold text-[#09233a]">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="rounded-xl bg-red-50/80 border border-red-200/80 p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2.5 font-bold text-red-900 mb-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                            <span>L'idée reçue à éviter</span>
                          </div>
                          <p className="italic text-sm text-red-950 font-medium mb-2">
                            {item.myth}
                          </p>
                        </div>
                        <p className="text-xs leading-relaxed text-red-900/85">
                          {item.reality}
                        </p>
                      </div>

                      <div className="rounded-xl bg-emerald-50/80 border border-emerald-200/80 p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2.5 font-bold text-emerald-900 mb-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>Le bon réflexe à adopter</span>
                          </div>
                        </div>
                        <p className="text-xs md:text-sm leading-relaxed text-emerald-950 font-medium">
                          {item.goodReflex}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section de réassurance & engagement */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-[#09233a] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7 text-[#d87532]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#09233a] mb-3 uppercase tracking-wide">
              Un doute sur votre appareil ?
            </h2>
            <p className="text-[#52606c] max-w-2xl mx-auto leading-relaxed mb-8">
              N'attendez pas qu'une petite anomalie s'aggrave. Venez directement à l'atelier à <strong>Momuy</strong> pour un avis technique clair et sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact#contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#09233a] px-8 py-3.5 text-white font-bold uppercase hover:bg-[#12314c] transition"
              >
                Venir à l'atelier
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/tarifs"
                className="inline-flex items-center justify-center rounded-xl border border-[#09233a] px-8 py-3.5 text-[#09233a] font-bold uppercase hover:bg-[#f4efe7] transition"
              >
                Consulter les forfaits
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Diagnostic;
