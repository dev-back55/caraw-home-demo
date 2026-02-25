
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LandingNews = () => {
  const news = [
    {
      id: 1,
      title: "Nueva Capacitación en Marketing Digital",
      excerpt: "Inscripciones abiertas para el taller de marketing digital dirigido a comerciantes y emprendedores de Rawson.",
      date: "15 Enero 2025",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Convenio con Banco Patagonia",
      excerpt: "Nuevo convenio que ofrece condiciones preferenciales en créditos para socios de la Cámara de Comercio.",
      date: "10 Enero 2025",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Asamblea Anual 2025",
      excerpt: "Te invitamos a participar de nuestra Asamblea Anual donde presentaremos los logros del año y los proyectos futuros.",
      date: "05 Enero 2025",
      image: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=400&h=250&fit=crop"
    }
  ];

  return (
    <section id="novedades" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Novedades y Actividades
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mantente al día con las últimas noticias, eventos y actividades 
            de la Cámara de Comercio de Rawson.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-ccr-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                    Novedad
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ccr-blue transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {item.excerpt}
                </p>
                <button className="inline-flex items-center text-ccr-blue hover:text-ccr-blue-dark font-medium">
                  Leer más
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">
            Seguinos en nuestras redes sociales para más novedades
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              className="border-ccr-blue text-ccr-blue hover:bg-ccr-blue hover:text-white"
              onClick={() => window.open('https://www.instagram.com/camara.de.comercio.rw/', '_blank')}
            >
              Instagram
            </Button>
            <Button
              variant="outline"
              className="border-ccr-blue text-ccr-blue hover:bg-ccr-blue hover:text-white"
              onClick={() => window.open('https://www.facebook.com/camararawson/', '_blank')}
            >
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
