import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export interface ResumenCuota {
  id: string;
  periodo: string;
  monto: number;
  fecha_vencimiento: string;
  existia: boolean;
}

export const usePagoMultipleCuotas = () => {
  const [loading, setLoading] = useState(false);
  const [cuotasResumen, setCuotasResumen] = useState<ResumenCuota[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generarPeriodos = (fechaDesde: string, fechaHasta: string): string[] => {
    // Extraer año y mes directamente del string de fecha
    const [yearDesde, monthDesde] = fechaDesde.split('-').map(Number);
    const [yearHasta, monthHasta] = fechaHasta.split('-').map(Number);
    
    const periodos: string[] = [];
    
    let currentYear = yearDesde;
    let currentMonth = monthDesde;
    
    while (currentYear < yearHasta || (currentYear === yearHasta && currentMonth <= monthHasta)) {
      const monthStr = String(currentMonth).padStart(2, '0');
      periodos.push(`${currentYear}-${monthStr}`);
      
      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
    }

    return periodos;
  };

  const calcularCuotasResumen = async (asociadoId: string, fechaDesde: string, fechaHasta: string) => {
    setLoading(true);
    try {
      // 1. Obtener datos del asociado (incluyendo fecha de ingreso)
      const { data: asociado, error: errorAsociado } = await supabase
        .from("asociados")
        .select("catcuota, fecha_ingreso")
        .eq("id", asociadoId)
        .single();

      if (errorAsociado) {
        toast({ title: "Error consultando asociado", description: errorAsociado.message, variant: "destructive" });
        return [];
      }

      // 2. Generar períodos del rango
      const todosPeriodos = generarPeriodos(fechaDesde, fechaHasta);
      
      // 2.1. Filtrar períodos anteriores a la fecha de ingreso
      const fechaIngreso = new Date(asociado.fecha_ingreso);
      const periodos = todosPeriodos.filter(periodo => {
        const [year, month] = periodo.split('-');
        const fechaPeriodo = new Date(parseInt(year), parseInt(month) - 1, 1);
        return fechaPeriodo >= new Date(fechaIngreso.getFullYear(), fechaIngreso.getMonth(), 1);
      });
      
      // 3. Verificar cuotas existentes
      const { data: cuotasExistentes, error: errorCuotas } = await supabase
        .from("cuotas")
        .select("id, periodo, monto, fecha_vencimiento, estado")
        .eq("asociado_id", asociadoId)
        .in("periodo", periodos);

      if (errorCuotas) {
        toast({ title: "Error consultando cuotas", description: errorCuotas.message, variant: "destructive" });
        return [];
      }

      // 4. Crear resumen de cuotas (solo las que necesitan procesarse)
      const resumen: ResumenCuota[] = [];
      const cuotasExistentesMap = new Map(cuotasExistentes?.map(c => [c.periodo, c]) || []);

      for (const periodo of periodos) {
        const cuotaExistente = cuotasExistentesMap.get(periodo);
        
        // Solo incluir en el resumen si la cuota NO existe o necesita ser pagada
        if (cuotaExistente) {
          // Incluir cuotas existentes solo si están pendientes (para ser pagadas)
          if (cuotaExistente.estado === 'Pendiente') {
            resumen.push({
              id: cuotaExistente.id,
              periodo,
              monto: cuotaExistente.monto,
              fecha_vencimiento: cuotaExistente.fecha_vencimiento,
              existia: true
            });
          }
        } else {
          // Generar fecha de vencimiento (día 15 del mes)
          const [year, month] = periodo.split('-');
          const fechaVencimiento = `${year}-${month}-15`;
          
          resumen.push({
            id: `temp-${periodo}`,
            periodo,
            monto: asociado.catcuota || 0,
            fecha_vencimiento: fechaVencimiento,
            existia: false
          });
        }
      }

      setCuotasResumen(resumen);
      return resumen;
    } catch (error) {
      console.error("Error calculando resumen:", error);
      toast({ title: "Error calculando cuotas", variant: "destructive" });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const procesarPagoMultiple = async (
    asociadoId: string,
    metodoPago: string,
    comprobante: string
  ) => {
    setLoading(true);
    try {
      // 1. Generar cuotas faltantes
      const cuotasPorGenerar = cuotasResumen.filter(c => !c.existia);
      
      for (const cuota of cuotasPorGenerar) {
        const { error } = await supabase.from("cuotas").insert({
          asociado_id: asociadoId,
          periodo: cuota.periodo,
          monto: cuota.monto,
          fecha_vencimiento: cuota.fecha_vencimiento,
          estado: "Pendiente"
        });
        
        if (error) {
          console.error("Error generando cuota:", error);
          throw error;
        }
      }

      // 2. Obtener todas las cuotas actualizadas (incluye las recién creadas)
      const periodos = cuotasResumen.map(c => c.periodo);
      const { data: cuotasFinales, error: errorCuotasFinales } = await supabase
        .from("cuotas")
        .select("id, monto, periodo")
        .eq("asociado_id", asociadoId)
        .in("periodo", periodos);

      if (errorCuotasFinales) throw errorCuotasFinales;

      // 3. Actualizar todas las cuotas a pagadas
      const fechaPago = new Date().toISOString().split('T')[0];
      const cuotaIds = cuotasFinales?.map(c => c.id) || [];
      
      const { error: errorUpdate } = await supabase
        .from("cuotas")
        .update({
          estado: "Pagada",
          fecha_pago: fechaPago,
          metodo_pago: metodoPago,
          comprobante: comprobante || null
        })
        .in("id", cuotaIds);

      if (errorUpdate) throw errorUpdate;

      // 4. Crear registros en tabla pagos
      const pagosBatch = cuotasFinales?.map(cuota => ({
        cuota_id: cuota.id,
        asociado_id: asociadoId,
        monto: cuota.monto,
        periodo: cuota.periodo,
        fecha_pago: fechaPago,
        metodo_pago: metodoPago,
        comprobante: comprobante || null,
        estado: "Completado"
      })) || [];

      const { error: errorPagos } = await supabase
        .from("pagos")
        .insert(pagosBatch);

      if (errorPagos) throw errorPagos;

      // 5. Actualizar deuda del asociado
      const montoTotal = cuotasResumen.reduce((sum, c) => sum + c.monto, 0);
      
      const { data: asociadoActual, error: errorAsociadoActual } = await supabase
        .from("asociados")
        .select("deuda")
        .eq("id", asociadoId)
        .single();

      if (errorAsociadoActual) throw errorAsociadoActual;

      const nuevaDeuda = Math.max(0, (asociadoActual.deuda || 0) - montoTotal);
      
      const { error: errorDeuda } = await supabase
        .from("asociados")
        .update({ deuda: nuevaDeuda })
        .eq("id", asociadoId);

      if (errorDeuda) throw errorDeuda;

      // 6. Invalidar queries para refrescar datos
      queryClient.invalidateQueries({ queryKey: ["cuotas"] });
      queryClient.invalidateQueries({ queryKey: ["pagos"] });
      queryClient.invalidateQueries({ queryKey: ["asociados"] });

      toast({
        title: "Pago procesado exitosamente",
        description: `Se procesaron ${cuotasResumen.length} cuotas por un total de $${montoTotal.toLocaleString()}`,
      });

      setCuotasResumen([]);
      return true;
    } catch (error) {
      console.error("Error procesando pago:", error);
      toast({
        title: "Error procesando pago",
        description: "Ocurrió un error al procesar el pago múltiple",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    cuotasResumen,
    calcularCuotasResumen,
    procesarPagoMultiple,
    setCuotasResumen
  };
};