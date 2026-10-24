import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import robotImg from "@/assets/robot-404.webp";
import { ArrowLeft, Home, PhoneCall } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 - Page non trouvée :", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <Helmet>
        <title>Page non trouvée - 404 | MOMUY & TECH</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="La page demandée est introuvable. Retrouvez l'ensemble de nos services de réparation électronique et micro-soudure à Momuy."
        />
      </Helmet>

      <section className="min-h-[75vh] flex items-center justify-center bg-[#f7f1e8] px-4 py-12 sm:py-20">
        <div className="w-full max-w-xl text-center flex flex-col items-center">
          
          {/* Illustration du Robot Assistant */}
          <div className="relative mb-6">
            {/* Ombre portée accentuée au sol */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-7 bg-[#102337]/35 rounded-[100%] blur-md" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 sm:w-44 h-4 bg-[#102337]/25 rounded-[100%] blur-sm" />
            <img
              src={robotImg}
              alt="Robot réparateur assistant MOMUY & TECH"
              className="relative z-10 w-56 sm:w-72 h-auto mx-auto select-none pointer-events-none"
            />
          </div>

          {/* Ruban collé "ERREUR 404" */}
          <div className="relative mb-4 z-20">
            <div className="inline-block transform -rotate-2 bg-[#d87532] text-white font-extrabold uppercase tracking-widest text-sm sm:text-base px-6 py-2 shadow-lg rounded-sm border-y border-dashed border-white/40 before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/10 before:via-transparent before:to-black/10">
              <span className="relative z-10 drop-shadow-sm">⚠️ ERREUR 404 ⚠️</span>
            </div>
          </div>

          {/* Titre "PAGE NOT FOUND" en bleu foncé */}
          <h1 className="text-3xl sm:text-5xl font-black text-[#102337] tracking-tight uppercase mb-3">
            PAGE NOT FOUND
          </h1>

          {/* Message explicatif */}
          <p className="text-base sm:text-lg text-[#5a4a3a] max-w-lg mx-auto mb-8 font-medium">
            Notre petit assistant a vérifié tous les circuits,
            <br />
            mais cette page reste introuvable
            <br />
            ou a été déplacée&nbsp;!
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#d87532] px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-md hover:bg-[#c96325] transition-all hover:shadow-lg active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[#09233a] bg-white/80 px-7 py-3.5 text-sm sm:text-base font-bold text-[#09233a] hover:bg-white hover:border-[#102337] transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              Nous contacter
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default NotFound;

