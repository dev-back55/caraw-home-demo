
import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Eye, Edit, Trash2, ArrowDown, ArrowUp } from "lucide-react";
import type { Asociado } from "@/hooks/useAsociados";

interface AsociadosTableProps {
  asociados: Asociado[];
  onVer: (asociado: Asociado) => void;
  onEditar: (asociado: Asociado) => void;
  onEliminar: (asociado: Asociado) => void;
}

type SortField = "nombre" | "comercio" | null;
type SortDirection = "asc" | "desc";
const getNextDirection = (current: SortDirection | null): SortDirection => {
  if (current === "asc") return "desc";
  return "asc";
};

const AsociadosTable = ({ asociados, onVer, onEditar, onEliminar }: AsociadosTableProps) => {
  const [sortField, setSortField] = useState<SortField>("nombre");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Memorizar el resultado ordenado
  const sortedAsociados = useMemo(() => {
    const sorted = [...asociados];
    if (sortField) {
      sorted.sort((a, b) => {
        const aValue = a[sortField] ?? "";
        const bValue = b[sortField] ?? "";
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [asociados, sortField, sortDirection]);

  // Handler de click en encabezado de columna
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(getNextDirection(sortDirection));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUp className="inline ml-1 w-3 h-3" />
    ) : (
      <ArrowDown className="inline ml-1 w-3 h-3" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("nombre")}
              className="cursor-pointer select-none"
              title="Ordenar por Nombre"
            >
              Nombre {sortIcon("nombre")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("comercio")}
              className="cursor-pointer select-none"
              title="Ordenar por Comercio"
            >
              Comercio {sortIcon("comercio")}
            </TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Deuda</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAsociados.map((asociado) => (
            <TableRow key={asociado.id}>
              <TableCell>{asociado.nombre}</TableCell>
              <TableCell>{asociado.comercio}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{asociado.telefono}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={asociado.estado === "Activo" ? "default" : "destructive"}>
                  {asociado.estado}
                </Badge>
              </TableCell>
              <TableCell>
                {asociado.deuda > 0 ? (
                  <span className="text-red-700 font-semibold">
                    ${asociado.deuda.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-green-700">Sin deuda</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => onVer(asociado)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onEditar(asociado)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onEliminar(asociado)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {asociados.length === 0 && (
        <div className="flex flex-col items-center py-14">
          <span className="text-gray-800 font-medium">
            No se encontraron asociados con los filtros aplicados.
          </span>
        </div>
      )}
    </div>
  );
};

export default AsociadosTable;
