
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export const useSupabaseCatcuotas = () => {
  return useQuery({
    queryKey: ["catcuotas"],
    queryFn: async () => {
      console.log('Fetching catcuotas from database...');
      const { data, error } = await supabase
        .from("catcuotas")
        .select("*")
        .order("codigo", { ascending: true });
      
      if (error) {
        console.error('Error fetching catcuotas:', error);
        throw error;
      }
      
      console.log('Raw catcuotas fetched:', data);
      console.log('Number of catcuotas:', data?.length || 0);
      
      // Asegurar que los datos tienen la estructura correcta
      const processedData = data?.map(item => ({
        ...item,
        codigo: Number(item.codigo),
        valorcuota: Number(item.valorcuota)
      })) || [];
      
      console.log('Processed catcuotas:', processedData);
      return processedData as Database["public"]["Tables"]["catcuotas"]["Row"][];
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
};
