
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  GraduationCap, 
  Users, 
  Megaphone, 
  HandshakeIcon, 
  FileText, 
  TrendingUp 
} from 'lucide-react';

export const LandingServices = () => {
  const services = [
    {
      icon: GraduationCap,
      title: "Asesoramiento y Capacitaciones",
      description: "Programas de formación empresarial, talleres de capacitación y asesoría técnica para el crecimiento de tu negocio."
    },
    {
      icon: Users,
      title: "Representación Institucional",
      description: "Representamos tus intereses ante organismos públicos y privados, defendiendo los derechos del sector comercial."
    },
    {
      icon: Megaphone,
      title: "Difusión y Promoción",
      description: "Promovemos tu negocio a través de nuestras redes sociales, eventos y actividades institucionales."
    },
    {
      icon: HandshakeIcon,
      title: "Convenios y Descuentos",
      description: "Acceso exclusivo a convenios con proveedores, descuentos especiales y beneficios para socios."
    },
    {
      icon: FileText,
      title: "Gestión de Trámites",
      description: "Te ayudamos con la gestión de trámites comerciales, permisos y documentación empresarial."
    },
    {
      icon: TrendingUp,
      title: "Desarrollo Comercial",
      description: "Apoyo en el desarrollo de estrategias comerciales y acceso a oportunidades de negocio."
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Servicios y Beneficios
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubrí todos los servicios que ofrecemos a nuestros asociados para 
            potenciar el crecimiento de sus negocios.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mb-4">
                  <service.icon className="h-12 w-12 text-ccr-blue group-hover:text-ccr-blue-dark transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            ¿Querés conocer más detalles sobre nuestros servicios?
          </p>
          <button
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-3 border border-ccr-blue text-ccr-blue hover:bg-ccr-blue hover:text-white transition-colors rounded-md font-medium"
          >
            Contactanos
          </button>
        </div>
      </div>
    </section>
  );
};
