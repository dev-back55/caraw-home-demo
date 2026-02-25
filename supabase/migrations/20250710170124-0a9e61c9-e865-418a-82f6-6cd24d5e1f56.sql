
-- Add estado field to pagos table
ALTER TABLE pagos 
ADD COLUMN estado TEXT DEFAULT 'Pendiente';

-- Update existing records to have 'Pendiente' status
UPDATE pagos 
SET estado = 'Pendiente' 
WHERE estado IS NULL;
