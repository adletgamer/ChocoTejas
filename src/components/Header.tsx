"use client";

import { useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
}

export function Header({ cartItemsCount = 0, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMobileMenuOpen(false);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false); // cerrar menú al hacer click
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        {/* Logo con icono */}
        <div className="flex items-center gap-2">
          {/* Icono al lado del texto */}
          <img
            src="src/assets/cacao.png"
            alt="Logo icon"
            className="h-8 w-8 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight">
              Chocolates
            </span>
            <span className="text-xs tracking-widest text-muted-foreground">
              DEV
            </span>
          </div>
        </div>
        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {["inicio", "productos", "Nosotros"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="text-sm font-medium transition-colors hover:text-foreground/80"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>

        {/* CARRITO + MENU MOBILE */}
        <div className="flex items-center gap-4 md:hidden relative">
          {/* Carrito */}

          {/* Botón menú */}
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 text-sm uppercase tracking-widest p-4">
          <li>
            <button
              onClick={() => scrollToSection("inicio")}
              className="block hover:text-white transition-colors"
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("productos")}
              className="block hover:text-white transition-colors"
            >
              Productos
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("Nosotros")}
              className="block hover:text-white transition-colors"
            >
              Nosotros
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
