import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Youtube,
  Music2,
} from "lucide-react";

import logoImg from "@/assets/icons/m&t bleu, fond blanc, 2lignes orange.svg";

const footerLinks = [
  { label: "Accueil", path: "/" },
  { label: "Tarifs", path: "/tarifs" },
  { label: "À propos", path: "/a-propos" },
  { label: "Contact", path: "/contact" },
  { label: "CGV", path: "/cgv" },
  { label: "Mentions Légales", path: "/mentions-legales" },
];

const serviceLinks = [
  { label: "Diagnostic", path: "/diagnostic" },
  { label: "Réparation smartphone", path: "/reparation-smartphone" },
  { label: "Réparation PC", path: "/reparation-pc" },
  { label: "Réparation console", path: "/reparation-console" },
  { label: "Micro-soudure", path: "/micro-soudure-carte-electronique" },
];

const socialLinks = [
  {
    label: "TikTok",
    icon: Music2,
    url: "#",
  },
  {
    label: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/momuy_tech/",
  },
  {
    label: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/profile.php?id=61594369072643",
  },
  {
    label: "YouTube",
    icon: Youtube,
    url: "#",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#09233a] text-white">
      <div className="container mx-auto px-6 py-8 flex flex-col gap-8">

        {/* Ligne 1 : Navigation des services (Haut) */}
        <nav
          aria-label="Services de réparation"
          className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold"
        >
          {serviceLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-white/85 hover:text-[#d87532] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Ligne 2 : Logo à gauche + Liens institutionnels au centre + Réseaux sociaux à droite */}
        <div className="border-t border-white/10 pt-6 flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center lg:justify-start flex-shrink-0"
          >
            <img
              src={logoImg}
              alt="Momuy & Tech"
              loading="lazy"
              decoding="async"
              width="148"
              height="32"
              className="w-[96px] md:w-[120px] lg:w-[148px] h-auto object-contain"
            />
          </Link>

          {/* Navigation institutionnelle */}
          <nav
            aria-label="Navigation institutionnelle"
            className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs md:text-sm font-bold uppercase"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.path + link.label}
                to={link.path}
                className="text-white/60 hover:text-[#d87532] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Réseaux sociaux */}
          <div className="flex items-center justify-center lg:justify-end gap-2 lg:gap-3 flex-shrink-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={
                    social.url === "#"
                      ? `${social.label} — compte à venir`
                      : `Suivre MOMUY & TECH sur ${social.label}`
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-[#d87532] hover:text-[#d87532] md:h-11 md:w-11"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

        </div>

      </div>

      {/* Bas footer */}
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/45">
        © {new Date().getFullYear()} MOMUY & TECH — Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;