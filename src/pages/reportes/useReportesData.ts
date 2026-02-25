
import { useState } from "react";
import { useSupabaseAsociados } from '@/hooks/useSupabaseAsociados';
import { useSupabaseCuotas } from '@/hooks/useSupabaseCuotas';
import { useSupabasePagos } from '@/hooks/useSupabasePagos';

// Hook para compartir datos y lógica auxiliar de reportes conectado a Supabase

export function useReportesData() {
  const [selectedPeriod, setSelectedPeriod] = useState('2025');
  
  // Fetch real data from Supabase
  const { data: asociados = [], isLoading: loadingAsociados } = useSupabaseAsociados();
  const { data: cuotas = [], isLoading: loadingCuotas } = useSupabaseCuotas();
  const { data: pagos = [], isLoading: loadingPagos } = useSupabasePagos();

  // Calculate real monthly data for the current year
  const currentYear = new Date().getFullYear();
  const monthlyData = [];
  
  for (let month = 0; month < 12; month++) {
    const monthDate = new Date(currentYear, month, 1);
    const monthStr = monthDate.toLocaleDateString('es-ES', { month: 'short' });
    const monthYear = `${currentYear}-${String(month + 1).padStart(2, '0')}`;
    
    // Filter payments for this month
    const pagosMes = pagos.filter(p => 
      p.fecha_pago && p.fecha_pago.startsWith(monthYear)
    );
    
    // Filter quotas for this month
    const cuotasMes = cuotas.filter(c => 
      c.fecha_pago && c.fecha_pago.startsWith(monthYear)
    );
    
    // Calculate associates count (cumulative)
    const asociadosMes = asociados.filter(a => {
      if (!a.fecha_ingreso) return false;
      const ingresoDate = new Date(a.fecha_ingreso);
      return ingresoDate <= new Date(currentYear, month + 1, 0); // Last day of month
    }).length;

    // Calculate morosity for this month
    const cuotasVencidasMes = cuotas.filter(c => {
      if (!c.fecha_vencimiento) return false;
      const vencimiento = new Date(c.fecha_vencimiento);
      const inicioMes = new Date(currentYear, month, 1);
      const finMes = new Date(currentYear, month + 1, 0);
      return vencimiento >= inicioMes && vencimiento <= finMes && c.estado !== 'Pagada';
    }).length;
    
    const totalCuotasMes = cuotas.filter(c => {
      if (!c.fecha_vencimiento) return false;
      const vencimiento = new Date(c.fecha_vencimiento);
      const inicioMes = new Date(currentYear, month, 1);
      const finMes = new Date(currentYear, month + 1, 0);
      return vencimiento >= inicioMes && vencimiento <= finMes;
    }).length;

    const morosidadMes = totalCuotasMes > 0 ? Math.round((cuotasVencidasMes / totalCuotasMes) * 100) : 0;

    monthlyData.push({
      mes: monthStr,
      ingresos: pagosMes.reduce((sum, p) => sum + Number(p.monto || 0), 0),
      asociados: asociadosMes,
      cuotas: cuotasMes.length,
      morosidad: morosidadMes
    });
  }

  // Calculate real category data from asociados
  const categoryCounts = asociados.reduce((acc, asociado) => {
    const categoria = asociado.categoria || 'Otros';
    acc[categoria] = (acc[categoria] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryCounts).map(([name, value], index) => ({
    name,
    value,
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]
  }));

  // Calculate payment method data from real payments
  const paymentMethodCounts = pagos.reduce((acc, pago) => {
    const metodo = pago.metodo_pago || 'No especificado';
    acc[metodo] = (acc[metodo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const paymentMethodData = Object.entries(paymentMethodCounts).map(([name, value], index) => ({
    name,
    value,
    color: ['#0891b2', '#059669', '#dc2626', '#7c3aed', '#ea580c'][index % 5]
  }));

  // Calculate real morosity data by category
  const morosityData = Object.keys(categoryCounts).map(categoria => {
    const totalAsociados = categoryCounts[categoria];
    const asociadosCategoria = asociados.filter(a => (a.categoria || 'Otros') === categoria);
    
    let morosos = 0;
    asociadosCategoria.forEach(asociado => {
      const cuotasAsociado = cuotas.filter(c => c.asociado_id === asociado.id);
      const tieneCuotasVencidas = cuotasAsociado.some(c => {
        if (c.estado === 'Vencida') return true;
        if (c.estado === 'Pendiente' && c.fecha_vencimiento) {
          return new Date(c.fecha_vencimiento) < new Date();
        }
        return false;
      });
      if (tieneCuotasVencidas) morosos++;
    });

    return {
      categoria,
      morosos,
      total: totalAsociados,
      porcentaje: totalAsociados > 0 ? Number(((morosos / totalAsociados) * 100).toFixed(1)) : 0
    };
  });

  // Calculate totals
  const totalIngresos = monthlyData.reduce((sum, item) => sum + item.ingresos, 0);
  const totalAsociados = asociados.length;
  
  // Calculate average morosity
  const cuotasPagadas = cuotas.filter(c => c.estado === 'Pagada').length;
  const cuotasTotal = cuotas.length;
  const tasaCobro = cuotasTotal > 0 ? Math.round((cuotasPagadas / cuotasTotal) * 100) : 0;
  const promedioMorosidad = 100 - tasaCobro;

  return {
    selectedPeriod,
    setSelectedPeriod,
    monthlyData,
    categoryData,
    paymentMethodData,
    morosityData,
    totalIngresos,
    totalAsociados,
    promedioMorosidad,
    isLoading: loadingAsociados || loadingCuotas || loadingPagos
  };
}
