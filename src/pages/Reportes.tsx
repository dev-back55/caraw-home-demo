
// Refactorizado: se utilizan subcomponentes y hook de datos conectados a Supabase
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "@/hooks/use-toast";
import { exportIngresosCSV, exportMorososCSV, generateSimpleReportePDF } from "@/utils/reportesExport";
import { ReportesHeader } from "./reportes/ReportesHeader";
import { ReportesKPIs } from "./reportes/ReportesKPIs";
import { IngresosTabs } from "./reportes/IngresosTabs";
import { AsociadosTabs } from "./reportes/AsociadosTabs";
import { MorosidadTabs } from "./reportes/MorosidadTabs";
import { MetodosPagoTabs } from "./reportes/MetodosPagoTabs";
import { ReportesAccionesRapidas } from "./reportes/ReportesAccionesRapidas";
import { useReportesData } from "./reportes/useReportesData";

const Reportes = () => {
  const {
    selectedPeriod,
    setSelectedPeriod,
    monthlyData,
    categoryData,
    paymentMethodData,
    morosityData,
    totalIngresos,
    totalAsociados,
    promedioMorosidad,
    isLoading
  } = useReportesData();

  const handleExportar = () => {
    exportIngresosCSV(monthlyData);
    toast({
      title: "Exportación CSV",
      description: "Archivo de ingresos exportado!",
      variant: "default"
    });
  };

  const handleGenerarPDF = async () => {
    await generateSimpleReportePDF("anual", { monthlyData, morosityData, year: selectedPeriod });
    toast({
      title: "PDF generado",
      description: "El reporte anual fue generado en PDF.",
      variant: "default"
    });
  };

  const handleReporteMensual = async () => {
    await generateSimpleReportePDF("mensual", { monthlyData, morosityData, year: selectedPeriod });
    toast({
      title: "PDF generado",
      description: "Reporte mensual descargado.",
      variant: "default"
    });
  };

  const handleListaMorosos = async () => {
    exportMorososCSV(morosityData);
    toast({
      title: "Exportación CSV",
      description: "Lista de morosos descargada.",
      variant: "default"
    });
  };

  const handleAnalisisAnual = async () => {
    await generateSimpleReportePDF("anual", { monthlyData, morosityData, year: selectedPeriod });
    toast({
      title: "PDF generado",
      description: "Análisis anual generado.",
      variant: "default"
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Cargando datos de reportes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <ReportesHeader
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        onExportar={handleExportar}
        onGenerarPDF={handleGenerarPDF}
      />
      <ReportesKPIs
        totalIngresos={totalIngresos}
        totalAsociados={totalAsociados}
        promedioMorosidad={promedioMorosidad}
      />
      <Tabs defaultValue="ingresos" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
          <TabsTrigger value="asociados">Asociados</TabsTrigger>
          <TabsTrigger value="morosidad">Morosidad</TabsTrigger>
          <TabsTrigger value="metodos">Métodos Pago</TabsTrigger>
        </TabsList>
        <TabsContent value="ingresos" className="space-y-6">
          <IngresosTabs monthlyData={monthlyData} />
        </TabsContent>
        <TabsContent value="asociados" className="space-y-6">
          <AsociadosTabs categoryData={categoryData} monthlyData={monthlyData} />
        </TabsContent>
        <TabsContent value="morosidad" className="space-y-6">
          <MorosidadTabs monthlyData={monthlyData} morosityData={morosityData} />
        </TabsContent>
        <TabsContent value="metodos" className="space-y-6">
          <MetodosPagoTabs paymentMethodData={paymentMethodData} />
        </TabsContent>
      </Tabs>
      <ReportesAccionesRapidas
        onReporteMensual={handleReporteMensual}
        onListaMorosos={handleListaMorosos}
        onAnalisisAnual={handleAnalisisAnual}
      />
    </div>
  );
};

export default Reportes;
