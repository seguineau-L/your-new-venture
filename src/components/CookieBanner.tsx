import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, ShieldCheck } from "lucide-react";
import { initGA, setCookieConsent, hasCookieConsent } from "@/lib/analytics";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(() => hasCookieConsent() === null);

  useEffect(() => {
    const consent = hasCookieConsent();
    if (consent === true) {
      initGA();
    }
    const handleOpen = () => setIsVisible(true);
    window.addEventListener("open_cookie_banner", handleOpen);
    return () => window.removeEventListener("open_cookie_banner", handleOpen);
  }, []);

  const handleAccept = () => {
    setCookieConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    setCookieConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 bg-[#09233a] border-2 border-[#d87532] rounded-2xl p-5 md:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-white animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3.5 mb-3">
        <div className="p-2.5 bg-[#d87532]/20 border border-[#d87532]/50 rounded-xl text-[#d87532] shrink-0">
          <Cookie className="w-6 h-6 text-[#d87532]" />
        </div>
        <div>
          <h2 id="cookie-title" className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            Gestion des cookies
          </h2>
          <p className="text-xs text-[#d87532] font-semibold uppercase tracking-wider">
            MOMUY & TECH
          </p>
        </div>
      </div>

      <p id="cookie-desc" className="text-xs md:text-sm text-white/85 leading-relaxed mb-4">
        Nous utilisons des cookies pour la mesure d'audience et l'affichage des services interactifs (comme la carte Google Maps). Vous pouvez accepter ou refuser ces traceurs à tout moment.{" "}
        <Link
          to="/mentions-legales"
          className="text-[#d87532] underline hover:text-[#e88c4d] font-medium transition-colors"
        >
          En savoir plus
        </Link>
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
        <button
          type="button"
          onClick={handleDecline}
          className="w-full sm:w-1/2 py-2.5 px-4 text-xs md:text-sm font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white/90 border border-white/20 transition-all text-center"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="w-full sm:w-1/2 py-2.5 px-4 text-xs md:text-sm font-bold rounded-xl bg-[#d87532] hover:bg-[#c26223] text-white transition-all shadow-md text-center"
        >
          Accepter
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
