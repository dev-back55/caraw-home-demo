
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import React from "react";
import type { Asociado } from "@/hooks/useAsociados";

interface Props {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  categorias: string[];
}

const AsociadosFiltros = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categorias,
}: Props) => (
  <Card>
    <CardContent className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            placeholder="Buscar por nombre, comercio o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 w-full min-w-0"
            autoComplete="off"
          />
          {searchTerm.length > 0 && (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center h-6 w-6"
              style={{ background: "rgba(255,255,255,0.7)", borderRadius: "100%" }}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categorias.map((categoria) => (
              <SelectItem key={categoria} value={categoria}>
                {categoria}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);

export default AsociadosFiltros;
