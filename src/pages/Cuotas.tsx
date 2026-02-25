import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CuotasTable from '@/components/CuotasTable';
import { descargarComprobantePDF } from '@/utils/pdfUtils';
import { useCuotasFilters, SupabaseCuota } from '@/hooks/useCuotasFilters';
import { CuotasResumen } from '@/components/CuotasResumen';
import { exportCuotasCSV } from '@/utils/csvUtils';
import { useSearch } from '@/context/SearchContext';
import { useSupabaseCuotas } from "@/hooks/useSupabaseCuotas";
import { GenerarCuotasDialog } from "@/components/GenerarCuotasDialog";
import { PagarMultiplesCuotasDialog } from "@/components/PagarMultiplesCuotasDialog";
import { CuotasFiltros } from "@/components/CuotasFiltros";
import { CuotasHeader } from "@/components/CuotasHeader";
import { getStatusColor, getStatusIcon } from "@/utils/cuotasVisual";

// Util para casteo seguro de cuotas
function safeArray(val: any): SupabaseCuota[] {
  if (!Array.isArray(val)) return [];
  // solo acepta objetos válidos con asociado embebido
  return val.filter(Boolean).filter(
    (c: any) => typeof c === "object" && c.asociado && typeof c.asociado === "object"
  );
}

const Cuotas = () => {
  const [openGenerar, setOpenGenerar] = useState(false);
  const [openPagoMultiple, setOpenPagoMultiple] = useState(false);

  const { term } = useSearch();
  const { data: cuotasData, refetch, isLoading, error } = useSupabaseCuotas();

  // Defensa: Si Supabase falla o da undefined, garantizamos array vacío
  const cuotas: SupabaseCuota[] = safeArray(cuotasData);

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setSearchInput(term || '');
  }, [term]);

  const {
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredCuotas,
    cuotasPorEstado,
    resumen,
  } = useCuotasFilters(cuotas);

  useEffect(() => {
    setSearchTerm(searchInput);
  }, [searchInput, setSearchTerm]);

  // Log para ayuda en debug
  useEffect(() => {
    console.log("[Cuotas] isLoading:", isLoading, "| error:", error, "| cuotas:", cuotas);
    if (error) {
      alert("Hubo un error recuperando las cuotas: " + error.message);
    }
  }, [isLoading, error, cuotas]);

  // Cargando
  if (isLoading) {
    return <div className="p-4 text-center">Cargando cuotas...</div>;
  }
  if (error) {
    return <div className="p-4 text-center text-red-600">Error cargando cuotas: {error.message}</div>;
  }
  if (!cuotas || cuotas.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <CuotasHeader
          onExport={() => {}}
          onOpenGenerar={() => setOpenGenerar(true)}
          onProcesarPagos={() => {}}
          onPagoMultiple={() => setOpenPagoMultiple(true)}
          total={0}
        />
        <GenerarCuotasDialog open={openGenerar} onOpenChange={setOpenGenerar} onCuotasGeneradas={refetch} />
        <PagarMultiplesCuotasDialog open={openPagoMultiple} onOpenChange={setOpenPagoMultiple} />
        <div className="text-center py-10 text-gray-500">No hay cuotas cargadas.</div>
      </div>
    );
  }

  // Handler adaptador para descargar el comprobante en el formato correcto
  const handleDescargarComprobante = (cuota: SupabaseCuota) => {
    descargarComprobantePDF({
      asociado: cuota.asociado?.nombre ?? "-",
      comercio: cuota.asociado?.comercio ?? "-",
      periodo: cuota.periodo,
      monto: cuota.monto,
      fechaPago: cuota.fecha_pago ?? "",
      estado: cuota.estado ?? "",
      metodoPago: cuota.metodo_pago ?? "",
      comprobante: cuota.comprobante ?? ""
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <CuotasHeader
        onExport={() => exportCuotasCSV(filteredCuotas)}
        onOpenGenerar={() => setOpenGenerar(true)}
        onProcesarPagos={() => {}}
        onPagoMultiple={() => setOpenPagoMultiple(true)}
        total={cuotas.length}
      />
      <GenerarCuotasDialog open={openGenerar} onOpenChange={setOpenGenerar} onCuotasGeneradas={refetch} />
      <PagarMultiplesCuotasDialog open={openPagoMultiple} onOpenChange={setOpenPagoMultiple} />
      <CuotasResumen resumen={resumen} />
      <CuotasFiltros
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <Tabs defaultValue="todas" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todas">Todas ({cuotas.length})</TabsTrigger>
          <TabsTrigger value="pagadas">Pagadas ({cuotasPorEstado.pagadas.length})</TabsTrigger>
          <TabsTrigger value="pendientes">Pendientes ({cuotasPorEstado.pendientes.length})</TabsTrigger>
          <TabsTrigger value="vencidas">Vencidas ({cuotasPorEstado.vencidas.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-4">
          <CuotasTable
            cuotas={filteredCuotas}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            descargarComprobantePDF={handleDescargarComprobante}
            onCuotaActualizada={refetch}
          />
        </TabsContent>
        <TabsContent value="pagadas" className="space-y-4">
          <CuotasTable
            cuotas={cuotasPorEstado.pagadas}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            descargarComprobantePDF={handleDescargarComprobante}
            onCuotaActualizada={refetch}
          />
        </TabsContent>
        <TabsContent value="pendientes" className="space-y-4">
          <CuotasTable
            cuotas={cuotasPorEstado.pendientes}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            descargarComprobantePDF={handleDescargarComprobante}
            onCuotaActualizada={refetch}
          />
        </TabsContent>
        <TabsContent value="vencidas" className="space-y-4">
          <CuotasTable
            cuotas={cuotasPorEstado.vencidas}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            descargarComprobantePDF={handleDescargarComprobante}
            onCuotaActualizada={refetch}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Cuotas;
