
-- Tabla de asociados 
CREATE TABLE public.asociados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  comercio TEXT,
  email TEXT,
  telefono TEXT,
  cuit TEXT,
  direccion TEXT,
  categoria TEXT,
  fecha_ingreso DATE NOT NULL DEFAULT CURRENT_DATE,
  estado TEXT DEFAULT 'Activo',
  deuda NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla de usuarios (perfil extendido)
CREATE TABLE public.usuarios (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  nombre TEXT,
  rol TEXT DEFAULT 'miembro', -- para futuro uso de roles tipo 'admin', 'miembro', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla de cuotas (emisiones mensuales)
CREATE TABLE public.cuotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asociado_id UUID NOT NULL REFERENCES public.asociados(id) ON DELETE CASCADE,
  periodo VARCHAR(7) NOT NULL, -- formato 'YYYY-MM'
  monto NUMERIC NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  estado TEXT DEFAULT 'Pendiente', -- 'Pendiente', 'Pagada', 'Vencida'
  fecha_pago DATE,
  metodo_pago TEXT,
  comprobante TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla de pagos (histórico de pagos de cuotas)
CREATE TABLE public.pagos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cuota_id UUID NOT NULL REFERENCES public.cuotas(id) ON DELETE CASCADE,
  asociado_id UUID NOT NULL REFERENCES public.asociados(id) ON DELETE CASCADE,
  usuario_id UUID REFERENCES public.usuarios(id),
  monto NUMERIC NOT NULL,
  fecha_pago DATE NOT NULL DEFAULT CURRENT_DATE,
  metodo_pago TEXT,
  comprobante TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Opcional: habilitar RLS para seguridad y control granular (puedes pedirlo si deseas)
