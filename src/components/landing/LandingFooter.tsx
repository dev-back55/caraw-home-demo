
import React from 'react';
import { Link } from 'react-router-dom';

export const LandingFooter = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/lovable-uploads/802f1823-b376-40ea-b87b-309982d8066b.png"
                alt="Cámara de Comercio Rawson"
                className="h-10 w-10 rounded-full object-contain"
              />
              <div>
                <h3 className="text-lg font-bold">Cámara de Comercio de Rawson</h3>
                <p className="text-sm text-gray-400">Fortaleciendo el comercio local</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              Representamos y apoyamos a los comerciantes de Rawson, Chubut, 
              promoviendo el desarrollo económico y el crecimiento sustentable 
              de nuestra comunidad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('inicio')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('quienes-somos')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Quiénes Somos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Login */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Acceso</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Asociarse
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2026 Cámara de Industria, Comercio, Producción y Turismo de Rawson. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => window.open('https://www.instagram.com/camara.de.comercio.rw/', '_blank')}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Instagram
            </button>
            <button
              onClick={() => window.open('https://www.facebook.com/camararawson/', '_blank')}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Facebook
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
