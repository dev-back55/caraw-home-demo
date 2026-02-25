
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, CreditCard, TrendingUp, AlertCircle, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAsociados } from '@/hooks/useSupabaseAsociados';
import { useSupabaseCuotas } from '@/hooks/useSupabaseCuotas';
import { useSupabasePagos } from '@/hooks/useSupabasePagos';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Fetch data from Supabase
  const { data: asociados = [], isLoading: loadingAsociados } = useSupabaseAsociados();
  const { data: cuotas = [], isLoading: loadingCuotas } = useSupabaseCuotas();
  const { data: pagos = [], isLoading: loadingPagos } = useSupabasePagos();

  // Calculate real statistics
  const totalAsociados = asociados.length;
  
  // Calculate cuotas statistics
  const cuotasPagadas = cuotas.filter(c => c.estado === 'Pagada').length;
  const cuotasPendientes = cuotas.filter(c => c.estado === 'Pendiente').length;
  const cuotasVencidas = cuotas.filter(c => {
    if (c.estado === 'Vencida') return true;
    if (c.estado === 'Pendiente' && c.fecha_vencimiento) {
      return new Date(c.fecha_vencimiento) < new Date();
    }
    return false;
  }).length;

  // Calculate monetary values
  const totalCuotasCobradas = cuotas
    .filter(c => c.estado === 'Pagada')
    .reduce((sum, c) => sum + Number(c.monto || 0), 0);
  
  const tasaDeCobro = cuotas.length > 0 ? Math.round((cuotasPagadas / cuotas.length) * 100) : 0;

  // Monthly data for chart (last 6 months)
  const now = new Date();
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStr = month.toLocaleDateString('es-ES', { month: 'short' });
    const monthYear = month.toISOString().slice(0, 7);
    
    const pagosMes = pagos.filter(p => 
      p.fecha_pago && p.fecha_pago.startsWith(monthYear)
    );
    const cuotasMes = cuotas.filter(c => 
      c.fecha_pago && c.fecha_pago.startsWith(monthYear)
    );
    
    monthlyData.push({
      month: monthStr,
      pagos: pagosMes.reduce((sum, p) => sum + Number(p.monto || 0), 0),
      cuotas: cuotasMes.length
    });
  }

  // Status data for pie chart
  const statusData = [
    { name: 'Pagadas', value: cuotasPagadas, color: '#10b981' },
    { name: 'Pendientes', value: cuotasPendientes, color: '#f59e0b' },
    { name: 'Vencidas', value: cuotasVencidas, color: '#ef4444' }
  ];

  // Recent payments from real data
  const recentPayments = pagos
    .slice(0, 4)
    .map(pago => ({
      id: pago.id,
      asociado: pago.asociado?.nombre || pago.asociado?.comercio || 'Asociado',
      monto: Number(pago.monto || 0),
      fecha: pago.fecha_pago,
      estado: "Pagado"
    }));

  // Calculate previous month comparison for stats
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthStr = prevMonth.toISOString().slice(0, 7);
  const currentMonthStr = now.toISOString().slice(0, 7);
  
  const currentMonthPagos = pagos.filter(p => 
    p.fecha_pago && p.fecha_pago.startsWith(currentMonthStr)
  ).reduce((sum, p) => sum + Number(p.monto || 0), 0);
  
  const prevMonthPagos = pagos.filter(p => 
    p.fecha_pago && p.fecha_pago.startsWith(prevMonthStr)
  ).reduce((sum, p) => sum + Number(p.monto || 0), 0);
  
  const changePercent = prevMonthPagos > 0 ? 
    Math.round(((currentMonthPagos - prevMonthPagos) / prevMonthPagos) * 100) : 0;

  const stats = [
    {
      title: "Total Asociados",
      value: totalAsociados.toString(),
      change: "+0%", // Could be calculated if we track historical data
      changeType: "neutral",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Cuotas Cobradas",
      value: `$${totalCuotasCobradas.toLocaleString()}`,
      change: `${changePercent >= 0 ? '+' : ''}${changePercent}%`,
      changeType: changePercent >= 0 ? "positive" : "negative",
      icon: CreditCard,
      color: "bg-green-500"
    },
    {
      title: "Tasa de Cobro",
      value: `${tasaDeCobro}%`,
      change: "+0%", // Could be calculated with historical data
      changeType: "neutral",
      icon: TrendingUp,
      color: "bg-purple-500"
    },
    {
      title: "Cuotas Vencidas",
      value: cuotasVencidas.toString(),
      change: "+0%", // Could be calculated with historical data
      changeType: "neutral",
      icon: AlertCircle,
      color: "bg-red-500"
    }
  ];

  if (loadingAsociados || loadingCuotas || loadingPagos) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Cargando datos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Resumen de gestión de cobranza</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/reportes")}>
            <Eye className="h-4 w-4 mr-2" />
            Ver Reportes
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center mt-1">
                <span className={`text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 
                  stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolución de Pagos</CardTitle>
            <CardDescription>Ingresos y cantidad de cuotas por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'pagos' ? `$${value.toLocaleString()}` : value,
                    name === 'pagos' ? 'Pagos' : 'Cuotas'
                  ]}
                />
                <Bar dataKey="pagos" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Cuotas</CardTitle>
            <CardDescription>Distribución actual de cuotas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Pagos</CardTitle>
          <CardDescription>Pagos recientes de asociados</CardDescription>
        </CardHeader>
        <CardContent>
          {recentPayments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Asociado</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Monto</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Fecha</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{payment.asociado}</td>
                      <td className="py-3 px-4 text-gray-700">${payment.monto.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-700">{payment.fecha}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {payment.estado}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hay pagos recientes para mostrar
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
