
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/lovable-uploads/802f1823-b376-40ea-b87b-309982d8066b.png"
              alt="Cámara de Comercio Rawson"
              className="h-10 w-10 rounded-full object-contain"
            />
            <div className="hidden sm:block">
              <h2 className="text-lg font-bold text-ccr-blue">CCR</h2>
              <p className="text-xs text-gray-600">Cámara de Comercio</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-gray-700 hover:text-ccr-blue transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('quienes-somos')}
              className="text-gray-700 hover:text-ccr-blue transition-colors"
            >
              Quiénes Somos
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="text-gray-700 hover:text-ccr-blue transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('novedades')}
              className="text-gray-700 hover:text-ccr-blue transition-colors"
            >
              Novedades
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-gray-700 hover:text-ccr-blue transition-colors"
            >
              Contacto
            </button>
            <Link to="/login">
              <Button className="bg-ccr-blue hover:bg-ccr-blue-dark text-white">
                Iniciar Sesión
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-ccr-blue"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('inicio')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-ccr-blue hover:bg-gray-50 rounded-md"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('quienes-somos')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-ccr-blue hover:bg-gray-50 rounded-md"
              >
                Quiénes Somos
              </button>
              <button
                onClick={() => scrollToSection('servicios')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-ccr-blue hover:bg-gray-50 rounded-md"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('novedades')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-ccr-blue hover:bg-gray-50 rounded-md"
              >
                Novedades
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-ccr-blue hover:bg-gray-50 rounded-md"
              >
                Contacto
              </button>
              <div className="px-3 py-2">
                <Link to="/login">
                  <Button className="w-full bg-ccr-blue hover:bg-ccr-blue-dark text-white">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
