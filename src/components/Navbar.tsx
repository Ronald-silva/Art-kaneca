// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import CartIcon from "./CartIcon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Início" },
    { href: "/products", label: "Produtos" },
    { href: "/customize", label: "Personalizar" },
    { href: "/contact", label: "Contato" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/artkaneca-logo.png"
              alt="Art Kaneca"
              className="h-16 w-16 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-secondary leading-tight">
                Art Kaneca
              </span>
              <span className="text-xs text-secondary/70">
                Artigos Personalizados
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-secondary hover:text-primary transition-colors ${
                  location.pathname === link.href
                    ? "font-semibold border-b-2 border-primary"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <CartIcon />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <CartIcon />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-secondary hover:text-primary transition-colors ${
                    location.pathname === link.href ? "font-semibold" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;