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
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-semibold tracking-wider text-primary transition-all duration-200 active:scale-95 hover:text-primary/70 pb-1`}
              >
                {link.label}
                {/* Underline orange animée */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary active:scale-90 transition-transform duration-150"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border/20 px-4 pb-4" style={{ backgroundColor: 'hsl(218, 22%, 72%)' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-sm font-semibold tracking-wider text-primary transition-all duration-200 active:scale-95 ${
                  isActive ? "border-l-2 border-accent pl-3 text-accent" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Header;
