import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/icons/momuy-tech-algerian.svg";

const navLinks = [
  { label: "ACCUEIL", path: "/" },
  { label: "TARIFS", path: "/tarifs" },
  { label: "À PROPOS", path: "/a-propos" },
  { label: "CONTACT", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="relative z-50 border-b border-[#d8c8b5] bg-[#f7f1e8]/95 backdrop-blur-md">
      <div className="w-full px-6 xl:px-12 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <img
            src={logoImg}
            alt="Momuy & Tech"
            className="block h-[86px] md:h-[100px] w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-10 text-xl font-bold uppercase">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative pb-1 transition-colors duration-300 ${isActive ? "text-[#102337]" : "text-[#102337]/80 hover:text-[#102337]"
                  }`}
              >
                {link.label}

                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-[#d87532] transition-all duration-300 ${isActive ? "w-full" : "w-0"
                    }`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="lg:hidden text-[#102337]"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-[#d8c8b5] bg-[#f7f1e8] px-6 py-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`w-fit text-base font-bold uppercase tracking-wide pb-1 border-b-2 ${isActive
                    ? "border-[#d87532] text-[#102337]"
                    : "border-transparent text-[#102337]/80"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;