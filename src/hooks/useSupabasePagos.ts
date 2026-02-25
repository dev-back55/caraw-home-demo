
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSupabasePagos = () => {
  return useQuery({
    queryKey: ["pagos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pagos")
        .select("*, asociado:asociado_id(nombre, comercio)")
        .order("fecha_pago", { ascending: false });
      if (error) throw error;
      return data as any[];
    }
  });
};
