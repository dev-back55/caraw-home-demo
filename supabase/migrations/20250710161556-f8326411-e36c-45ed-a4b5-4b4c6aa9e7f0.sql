
-- Update all asociados records to set catcuota to 10000
UPDATE asociados 
SET catcuota = 10000 
WHERE catcuota IS NULL OR catcuota != 10000;
