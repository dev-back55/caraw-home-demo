
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCuotasGeneradas: () => void;
}

export const GenerarCuotasDialog: React.FC<Props> = ({ open, onOpenChange, onCuotasGeneradas }) => {
  const [periodo, setPeriodo] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [urlPago, setUrlPago] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerar = async () => {
    if (!periodo || !vencimiento) {
      toast({ title: "Complete todos los campos obligatorios", variant: "destructive" });
      return;
    }
    setLoading(true);
    
    // 1. Leer todos los asociados activos con su catcuota
    const { data: asociados, error: errorAsociados } = await supabase
      .from("asociados")
      .select("id, estado, deuda, catcuota")
      .eq("estado", "Activo");
    
    if (errorAsociados) {
      toast({ title: "Error consultando asociados", description: errorAsociados.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    // 2. Revisar para cada asociado si ya existe la cuota de ese periodo
    let insertCount = 0, skipCount = 0;
    for (const asociado of asociados) {
      // Check if cuota exists for this asociado and periodo
      const { data: existing, error: errorCuota } = await supabase
        .from("cuotas")
        .select("id")
        .eq("asociado_id", asociado.id)
        .eq("periodo", periodo)
        .maybeSingle();
      
      if (!errorCuota && !existing) {
        // Usar el catcuota del asociado como monto de la cuota
        const montoCuota = asociado.catcuota || 0;
        
        // Crear cuota con el monto del catcuota del asociado
        const cuotaData: any = {
          asociado_id: asociado.id,
          periodo,
          monto: montoCuota,
          fecha_vencimiento: vencimiento,
          estado: "Pendiente"
        };
        
        // Solo agregar url_pago si se proporcionó
        if (urlPago.trim()) {
          cuotaData.url_pago = urlPago.trim();
        }
        
        const { error: errorInsert } = await supabase.from("cuotas").insert([cuotaData]);
        if (!errorInsert) {
          // 3. Actualizar la deuda del asociado sumando el monto de la nueva cuota
          const nuevaDeuda = (asociado.deuda || 0) + montoCuota;
          const { error: errorDeuda } = await supabase
            .from("asociados")
            .update({ deuda: nuevaDeuda })
            .eq("id", asociado.id);
          
          if (!errorDeuda) {
            insertCount++;
          } else {
            console.error("Error actualizando deuda del asociado:", errorDeuda);
            skipCount++;
          }
        } else {
          console.error("Error insertando cuota:", errorInsert);
          skipCount++;
        }
      } else {
        skipCount++;
      }
    }
    
    setLoading(false);
    toast({
      title: "Generación de cuotas finalizada",
      description: `${insertCount} cuotas generadas, ${skipCount} ya existentes.`,
      variant: insertCount ? "default" : "destructive"
    });
    onOpenChange(false);
    onCuotasGeneradas();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generar cuotas para todos los asociados</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div>
            <label htmlFor="periodo" className="block text-sm font-medium mb-1">Período (ej: 2025-07) *</label>
            <Input id="periodo" type="text" placeholder="YYYY-MM" value={periodo} onChange={e => setPeriodo(e.target.value)} />
          </div>
          <div>
            <label htmlFor="vencimiento" className="block text-sm font-medium mb-1">Fecha de vencimiento *</label>
            <Input id="vencimiento" type="date" value={vencimiento} onChange={e => setVencimiento(e.target.value)} />
          </div>
          <div>
            <label htmlFor="urlPago" className="block text-sm font-medium mb-1">URL de pago (opcional)</label>
            <Input id="urlPago" type="url" placeholder="https://ejemplo.com/pago" value={urlPago} onChange={e => setUrlPago(e.target.value)} />
          </div>
          <div className="text-sm text-gray-600">
            <p>El monto de cada cuota será tomado del campo "catcuota" de cada asociado.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancelar</Button>
          <Button onClick={handleGenerar} disabled={loading}>
            {loading ? "Generando..." : "Generar cuotas"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
