
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Download, Filter, Search, CreditCard, Receipt } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { exportPagosToCSV } from "@/utils/csvUtils";
import { generatePagoPDF, generatePagosReportePDF } from "@/utils/pdfUtils";
import { useSearch } from "@/context/SearchContext";
import { useSupabasePagos } from "@/hooks/useSupabasePagos";
import PagosTable from "@/components/PagosTable";

const Pagos = () => {
  const { term } = useSearch();
  const [searchTerm, setSearchTerm] = useState(term);
  const [dateFilter, setDateFilter] = useState('all');
  const { data: pagosData, isLoading } = useSupabasePagos();
  const pagos = pagosData || [];

  // Actualizar searchTerm local cuando cambia el term global
  useEffect(() => {
    setSearchTerm(term);
  }, [term]);

  const filteredPagos = pagos.filter(pago => 
    pago.asociado?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pago.asociado?.comercio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pago.comprobante?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estadísticas de pagos basadas en datos reales
  const stats = {
    totalPagos: pagos.length,
    pagosAprobados: pagos.filter(p => p.estado === 'Aprobado').length,
    pagosPendientes: pagos.filter(p => p.estado === 'Pendiente').length,
    pagosRechazados: pagos.filter(p => p.estado === 'Rechazado').length,
    montoTotal: pagos.reduce((sum, p) => sum + (p.monto || 0), 0),
    montoAprobado: pagos.filter(p => p.estado === 'Aprobado').reduce((sum, p) => sum + (p.monto || 0), 0),
    montoPendiente: pagos.filter(p => p.estado === 'Pendiente').reduce((sum, p) => sum + (p.monto || 0), 0),
    montoRechazado: pagos.filter(p => p.estado === 'Rechazado').reduce((sum, p) => sum + (p.monto || 0), 0),
    comisionesTotal: 0 // No hay comisiones por el momento
  };

  // Acción Exportar a CSV
  const handleExportar = () => {
    exportPagosToCSV(filteredPagos);
  };

  // Acción PDF Individual
  const handleDescargarPDF = (pago: any) => {
    generatePagoPDF(pago);
  };

  // Acción Reporte PDF masivo
  const handleGenerarReportePDF = () => {
    generatePagosReportePDF(filteredPagos);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando pagos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pagos</h1>
          <p className="text-gray-600 mt-1">Registro y seguimiento de pagos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportar}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={handleGenerarReportePDF}>
            <Receipt className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recaudado</CardTitle>
            <CreditCard className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${stats.montoAprobado.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">
              {stats.pagosAprobados} pagos aprobados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pagosPendientes}
            </div>
            <p className="text-xs text-gray-600">
              ${stats.montoPendiente.toLocaleString()} pendientes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos Rechazados</CardTitle>
            <Filter className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.pagosRechazados}
            </div>
            <p className="text-xs text-gray-600">
              ${stats.montoRechazado.toLocaleString()} rechazados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comisiones</CardTitle>
            <Receipt className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${stats.comisionesTotal.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">
              No hay comisiones
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por asociado, comercio o comprobante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por fecha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los períodos</SelectItem>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pagos */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
          <CardDescription>Últimos pagos registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <PagosTable 
            pagos={filteredPagos}
            onDescargarPDF={handleDescargarPDF}
          />
        </CardContent>
      </Card>

      {/* Resumen del período */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Métodos de Pago</CardTitle>
            <CardDescription>Distribución por método de pago</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Mercado Pago', 'Transferencia Bancaria', 'Tarjeta de Crédito'].map((metodo) => {
                const count = pagos.filter(p => p.metodo_pago === metodo).length;
                const percentage = pagos.length > 0 ? (count / pagos.length) * 100 : 0;
                return (
                  <div key={metodo} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metodo}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estados de Pago</CardTitle>
            <CardDescription>Distribución por estado actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { estado: 'Aprobado', color: 'bg-green-500' },
                { estado: 'Pendiente', color: 'bg-yellow-500' },
                { estado: 'Rechazado', color: 'bg-red-500' }
              ].map(({ estado, color }) => {
                const count = pagos.filter(p => p.estado === estado).length;
                const percentage = pagos.length > 0 ? (count / pagos.length) * 100 : 0;
                return (
                  <div key={estado} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{estado}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${color} h-2 rounded-full`} 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pagos;
