
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export const LandingCTA = () => {
  const benefits = [
    "Representación ante organismos públicos",
    "Capacitaciones y talleres exclusivos",
    "Descuentos en servicios y productos",
    "Networking con otros comerciantes",
    "Asesoría técnica especializada",
    "Promoción de tu negocio"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-ccr-blue to-ccr-blue-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Querés asociarte a la Cámara?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Sumate y accedé a todos los beneficios que tenemos para 
              potenciar tu negocio y hacer crecer el comercio en Rawson.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-ccr-blue hover:bg-gray-100 px-8 py-3 text-lg"
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Asociate ahora
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="border-white bg-white text-ccr-blue hover:bg-white hover:text-ccr-blue px-8 py-3 text-lg"
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Más información
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/caraw.jpg"
              alt="Comercio en crecimiento"
              className="w-full h-80 object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ccr-blue/30 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
