
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  searchInput: string;
  setSearchInput: (t: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
}

export const CuotasFiltros: React.FC<Props> = ({
  searchInput,
  setSearchInput,
  statusFilter,
  setStatusFilter,
}) => (
  <div className="bg-white rounded shadow-sm p-6 mt-4">
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Input
          placeholder="Buscar por asociado, comercio o período..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filtrar por estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="pagada">Pagadas</SelectItem>
          <SelectItem value="pendiente">Pendientes</SelectItem>
          <SelectItem value="vencida">Vencidas</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);
