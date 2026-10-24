declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-28Q7RZ9E6M";

export const initGA = () => {
  if (typeof window === "undefined") return;

  // Éviter de charger plusieurs fois le script
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // Google Analytics exige l'objet `arguments` (et non un tableau) dans le dataLayer.
    // Ne pas remplacer par des paramètres rest : les mesures ne seraient plus comptées.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
  });
};

export const hasCookieConsent = (): boolean | null => {
  if (typeof window === "undefined") return null;
  const consent = localStorage.getItem("momuy_cookie_consent");
  if (consent === "accepted") return true;
  if (consent === "declined") return false;
  return null;
};

export const setCookieConsent = (accepted: boolean) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    "momuy_cookie_consent",
    accepted ? "accepted" : "declined"
  );
  if (accepted) {
    // Réactiver au cas où il avait été désactivé
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
    initGA();
  } else {
    // Désactiver Google Analytics
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    // Supprimer les cookies Google Analytics existants
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });
  }
  window.dispatchEvent(new Event("cookie_consent_updated"));
};
