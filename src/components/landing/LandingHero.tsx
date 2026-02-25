
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export const LandingHero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('quienes-somos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-ccr-blue/10 to-ccr-blue-light/5">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/caraw.jpg"
          alt="Comercio local en Rawson"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ccr-blue/20 to-ccr-blue-light/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <img
            src="/lovable-uploads/802f1823-b376-40ea-b87b-309982d8066b.png"
            alt="Cámara de Comercio Rawson"
            className="h-24 w-24 mx-auto mb-6 rounded-full shadow-lg"
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          
          Camara de Industria, Comercio, Producción y Turismo
          <span className="block text-ccr-blue">de Rawson</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          Fortaleciendo el comercio local, unidos crecemos más
        </p>
        
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Representamos y apoyamos a los comerciantes de Rawson, Chubut, 
          promoviendo el desarrollo económico y el crecimiento sustentable de nuestra comunidad.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToAbout}
            size="lg"
            className="bg-ccr-blue hover:bg-ccr-blue-dark text-white px-8 py-3 text-lg"
          >
            Conocé más
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-ccr-blue text-ccr-blue hover:bg-ccr-blue hover:text-white px-8 py-3 text-lg"
          >
            Asociate ahora
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToAbout}
          className="text-ccr-blue hover:text-ccr-blue-dark transition-colors"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};
