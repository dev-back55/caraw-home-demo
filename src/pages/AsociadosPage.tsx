
import AsociadosFiltros from "@/components/asociados/AsociadosFiltros";
import NuevoAsociadoDialog from "@/components/asociados/NuevoAsociadoDialog";
import AsociadoDialog from "@/components/asociados/AsociadoDialog";
import AsociadosTable from "@/components/asociados/AsociadosTable";
import EliminarAsociadoDialog from "@/components/asociados/EliminarAsociadoDialog";
import { Card, CardContent } from "@/components/ui/card";
import { useAsociados, Asociado } from "@/hooks/useAsociados";

// Página principal modularizada
const AsociadosPage = () => {
  const {
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    openDialog,
    setOpenDialog,
    nuevoAsociado,
    handleNuevoAsociadoChange,
    handleGuardarNuevoAsociado,
    asociadosFiltrados,
    categorias,
    selectedAsociado,
    dialogMode,
    handleVerAsociado,
    handleEditarAsociado,
    handleCerrarDialog,
    handleChangeEditarAsociado,
    handleGuardarEdicion,
    openEliminar,
    asociadoAEliminar,
    handleEliminarClick,
    handleConfirmarEliminar,
    handleCancelarEliminar,
    categoriasDisponibles
  } = useAsociados();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asociados</h1>
          <p className="text-gray-600 mt-1">Gestión de asociados de la cámara</p>
        </div>
        <NuevoAsociadoDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          categoriasDisponibles={categoriasDisponibles}
          nuevoAsociado={nuevoAsociado}
          onChange={handleNuevoAsociadoChange}
          onGuardar={handleGuardarNuevoAsociado}
        />
      </div>

      {/* Filtros */}
      <AsociadosFiltros
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categorias={categorias}
      />

      {/* Tabla de Asociados */}
      <Card>
        <CardContent>
          <AsociadosTable
            asociados={asociadosFiltrados as Asociado[]}
            onVer={handleVerAsociado as (asociado: Asociado) => void}
            onEditar={handleEditarAsociado as (asociado: Asociado) => void}
            onEliminar={handleEliminarClick as (asociado: Asociado) => void}
          />
        </CardContent>
      </Card>

      {/* Dialogo para Ver o Editar Asociado */}
      <AsociadoDialog
        open={!!dialogMode}
        mode={dialogMode}
        asociado={selectedAsociado}
        categorias={categorias}
        categoriasDisponibles={categoriasDisponibles}
        onClose={handleCerrarDialog}
        onChange={handleChangeEditarAsociado}
        onSave={handleGuardarEdicion}
      />

      {/* Dialogo de confirmación para eliminar */}
      <EliminarAsociadoDialog
        open={openEliminar}
        asociado={asociadoAEliminar}
        onConfirm={handleConfirmarEliminar}
        onCancel={handleCancelarEliminar}
      />
    </div>
  );
};
export default AsociadosPage;
