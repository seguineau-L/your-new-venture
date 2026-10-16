declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
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
    initGA();
  }
};
