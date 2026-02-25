
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook 
} from 'lucide-react';

export const LandingContact = () => {
  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contacto
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Contactanos para más información 
            sobre nuestros servicios o para asociarte.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-ccr-blue mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Dirección</h3>
                    <p className="text-gray-700">
                      [Dirección de la Cámara de Comercio]<br />
                      Rawson, Chubut, Argentina
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-ccr-blue mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Teléfono</h3>
                    <p className="text-gray-700">
                      [Número de teléfono]
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-ccr-blue mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-700">
                      [email@camararawson.com]
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-ccr-blue mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Horarios de atención</h3>
                    <p className="text-gray-700">
                      Lunes a Viernes: 9:00 - 17:00<br />
                      Sábados: 9:00 - 13:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Redes Sociales</h3>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-ccr-blue text-ccr-blue hover:bg-ccr-blue hover:text-white"
                  onClick={() => window.open('https://www.instagram.com/camara.de.comercio.rw/', '_blank')}
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-ccr-blue text-ccr-blue hover:bg-ccr-blue hover:text-white"
                  onClick={() => window.open('https://www.facebook.com/camararawson/', '_blank')}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-96 lg:h-full min-h-[400px]">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1629.648875502222!2d-65.10479719488595!3d-43.303772032445565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbe01578bf319dfef%3A0x1e0713aead755855!2sCamara%20De%20Comercio%20Industria!5e0!3m2!1ses-419!2sar!4v1772027443868!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
