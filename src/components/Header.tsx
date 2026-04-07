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
    <header className="sticky top-0 z-50 shadow-md" style={{ backgroundColor: 'hsl(218, 22%, 72%)' }}>
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex-shrink-0">
          <img src={logoFull} alt="MOMUY & TECH" className="h-12 md:h-14 object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold tracking-wider transition-colors hover:text-accent ${
                location.pathname === link.path
                  ? "text-accent underline underline-offset-8 decoration-2"
                  : "text-primary-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-steel border-t border-border/20 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm font-semibold tracking-wider transition-colors ${
                location.pathname === link.path
                  ? "text-accent"
                  : "text-primary-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
