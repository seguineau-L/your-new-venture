import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoFull from "@/assets/logo-full.png";

const navLinks = [
  { label: "ACCUEIL", path: "/" },
  { label: "TARIF", path: "/tarifs" },
  { label: "A PROPOS", path: "/a-propos" },
  { label: "CONTACT", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      className="sticky top-0 z-50 shadow-md"
      style={{ backgroundColor: "hsl(218, 22%, 72%)" }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="grid min-h-[80px] grid-cols-[auto_1fr_auto] items-center">
          <Link to="/" className="justify-self-start flex-shrink-0">
            <img
              src={logoFull}
              alt="MOMUY & TECH"
              className="h-12 md:h-14 object-contain"
            />
          </Link>

         <nav className="hidden md:flex items-center gap-12 justify-self-end">
  {navLinks.map((link) => {
    const isActive = location.pathname === link.path;

    return (
      <Link
        key={link.path}
        to={link.path}
        className="group relative pb-1 text-sm font-semibold tracking-wider text-primary transition-colors duration-200 hover:text-primary/70"
      >
        {link.label}

        <span
  className={`absolute left-0 bottom-0 h-[3px] transition-all duration-500 ease-out ${
    isActive ? "w-full" : "w-0 group-hover:w-full"
  }`}
  style={{
    background: "linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)",
    filter: "blur(1px)",
  }}
/>
      </Link>
              );
            })}
          </nav>

          <div className="hidden md:block" />

          <button
            className="justify-self-end text-primary transition-transform duration-150 active:scale-90 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-border/20 px-4 pb-4 md:hidden"
          style={{ backgroundColor: "hsl(218, 22%, 72%)" }}
        >
          {navLinks.map((link) => {
  const isActive = location.pathname === link.path;

  return (
    <Link
      key={link.path}
      to={link.path}
      onClick={() => setMobileOpen(false)}
      className="group relative block w-fit py-3 text-sm font-semibold tracking-wider text-primary transition-colors duration-200 hover:text-primary/70"
    >
      {link.label}

      <span
        className={`absolute left-0 bottom-1 h-[3px] transition-all duration-500 ease-out ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)",
          filter: "blur(1px)",
        }}
      />
    </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Header;
