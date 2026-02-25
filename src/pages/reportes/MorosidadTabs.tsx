
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";

type Props = {
  monthlyData: any[];
  morosityData: any[];
};

export function MorosidadTabs({ monthlyData, morosityData }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Evolución de Morosidad</CardTitle>
          <CardDescription>Porcentaje de morosidad mensual</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`${value}%`, 'Morosidad']} />
              <Line type="monotone" dataKey="morosidad" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Morosidad por Categoría</CardTitle>
          <CardDescription>Análisis de morosidad por tipo de negocio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {morosityData.map((item) => (
              <div key={item.categoria} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.categoria}</span>
                  <span className="text-sm text-gray-600">
                    {item.morosos}/{item.total} ({item.porcentaje}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${item.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
