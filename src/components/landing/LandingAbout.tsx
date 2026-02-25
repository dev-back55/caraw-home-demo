
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Heart } from 'lucide-react';

export const LandingAbout = () => {
  return (
    <section id="quienes-somos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quiénes Somos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            La Cámara de Comercio de Rawson es una institución comprometida con el desarrollo 
            económico y comercial de nuestra ciudad y región.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Nuestra Historia
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Desde nuestra fundación, hemos trabajado incansablemente para representar 
              los intereses del sector comercial de Rawson, capital de la provincia de Chubut. 
              Somos el nexo entre los comerciantes y las instituciones públicas y privadas.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nuestro compromiso es promover un entorno favorable para el desarrollo de 
              los negocios, fomentar la capacitación empresarial y fortalecer los lazos 
              de cooperación entre los asociados.
            </p>
          </div>

          {/* Team Image */}
          <div className="relative">
            <img
              src="/lovable-uploads/802f1823-b376-40ea-b87b-309982d8066b.png"
              alt="Integrantes actuales de la Cámara de Comercio"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ccr-blue/20 to-transparent rounded-lg"></div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="mb-4">
                <Target className="h-12 w-12 text-ccr-blue mx-auto" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Misión</h4>
              <p className="text-gray-700 leading-relaxed">
                Representar, promover y defender los intereses del sector comercial de Rawson, 
                brindando servicios de calidad que contribuyan al crecimiento sostenible 
                de nuestros asociados.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="mb-4">
                <Eye className="h-12 w-12 text-ccr-blue mx-auto" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Visión</h4>
              <p className="text-gray-700 leading-relaxed">
                Ser la institución líder en la representación empresarial de Rawson, 
                reconocida por su compromiso con el desarrollo económico local y 
                la excelencia en el servicio a nuestros socios.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="mb-4">
                <Heart className="h-12 w-12 text-ccr-blue mx-auto" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Valores</h4>
              <p className="text-gray-700 leading-relaxed">
                Transparencia, compromiso, solidaridad, innovación y respeto. 
                Trabajamos con integridad para construir una comunidad comercial 
                próspera y unida.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
