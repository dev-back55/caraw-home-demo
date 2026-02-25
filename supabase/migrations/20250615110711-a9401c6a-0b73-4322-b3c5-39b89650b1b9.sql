
-- Agregar campo "idsocio" a la tabla asociados (único, secuencial, no nulo)
ALTER TABLE public.asociados
  ADD COLUMN idsocio SERIAL NOT NULL UNIQUE;

-- Agregar campo "idclerk" a la tabla usuarios (único, puede ser nulo al principio)
ALTER TABLE public.usuarios
  ADD COLUMN idclerk TEXT UNIQUE;
