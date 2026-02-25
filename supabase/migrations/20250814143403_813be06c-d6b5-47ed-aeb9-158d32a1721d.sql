-- Actualizar el campo monto en la tabla cuotas a 5000
UPDATE public.cuotas 
SET monto = 5000;

-- Actualizar el campo deuda en la tabla asociados a 5000
UPDATE public.asociados 
SET deuda = 5000;