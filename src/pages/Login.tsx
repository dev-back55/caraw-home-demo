
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, ArrowLeft } from 'lucide-react';
import { SignIn } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div className="w-full max-w-md space-y-8">
      {/* Back to home link */}
      <div className="text-center">
        <Link 
          to="/" 
          className="inline-flex items-center text-ccr-blue hover:text-ccr-blue-dark transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Link>
      </div>

      {/* Logo central */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <img
            src="/lovable-uploads/802f1823-b376-40ea-b87b-309982d8066b.png"
            alt="Cámara de Comercio"
            className="w-20 h-20 rounded-full object-contain mx-auto"
            style={{ background: "#fff" }}
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Cámara de Comercio Rawson</h1>
        <p className="text-gray-600 mt-2">Sistema de Gestión de Cobranza</p>
      </div>
      
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Iniciar Sesión Administrador
          </CardTitle>
          <CardDescription className="text-center">
            Solo para usuarios autorizados por Cámara de Comercio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignIn
            appearance={{ elements: { logoImageUrl: "/lovable-uploads/802f1823-b376-40ea-b87b-309982d8066b.png" } }}
            fallbackRedirectUrl="/dashboard"
            routing="hash"
          />
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500">
        <p>© 2025 Cámara de Comercio de Rawson</p>
        <p>Todos los derechos reservados</p>
      </div>
    </div>
  </div>
);

export default Login;
