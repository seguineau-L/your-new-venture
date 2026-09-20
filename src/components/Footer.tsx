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
];

const serviceLinks = [
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
      <div className="container mx-auto grid grid-cols-[1fr_auto] items-center gap-5 px-6 py-8 lg:grid-cols-[auto_1fr_auto] lg:gap-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-start"
        >
          <img
            src={logoImg}
            alt="Momuy & Tech"
            className="w-[96px] md:w-[120px] lg:w-[148px] h-auto object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav aria-label="Navigation du pied de page" className="col-span-2 row-start-2 flex w-full flex-wrap items-center justify-center gap-4 text-sm font-bold uppercase lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:w-auto lg:flex-1 lg:gap-6 xl:gap-8">
          {footerLinks.map((link) => (
            <Link
              key={link.path + link.label}
              to={link.path}
              className="text-white/75 hover:text-[#d87532] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Services de réparation" className="col-span-2 row-start-3 mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-sm lg:col-span-3 lg:row-start-2">
          {serviceLinks.map((link) => (
            <Link key={link.path} to={link.path} className="text-white/70 hover:text-[#d87532] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Réseaux — placeholders visibles, liens fictifs conservés */}
        <div className="order-2 ml-auto flex items-center justify-end gap-2 lg:order-none lg:col-start-3 lg:row-start-1 lg:gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.url === "#" ? `${social.label} — compte à venir` : `Suivre MOMUY & TECH sur ${social.label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-[#d87532] hover:text-[#d87532] md:h-11 md:w-11"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
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