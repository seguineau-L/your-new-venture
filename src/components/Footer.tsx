import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Youtube,
  Music2,
} from "lucide-react";

import logoImg from "@/assets/icons/Momuy-Tech-abreviation-beige.svg";

const footerLinks = [
  { label: "Accueil", path: "/" },
  { label: "Tarifs", path: "/tarifs" },
  { label: "À propos", path: "/a-propos" },
  { label: "Contact", path: "/contact" },
  { label: "CGV", path: "/cgv" },
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
    url: "#",
  },
  {
    label: "Facebook",
    icon: Facebook,
    url: "#",
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
      <div className="container mx-auto px-6 py-8 grid lg:grid-cols-[1fr_auto_1fr] items-center gap-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center lg:justify-start"
        >
          <img
            src={logoImg}
            alt="Momuy & Tech"
            className="w-[100px] md:w-[140px] lg:w-[180px] h-auto object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm font-bold uppercase">
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

        {/* Réseaux */}
        <div className="flex items-center justify-center lg:justify-end gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-[#d87532] hover:border-[#d87532] transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
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