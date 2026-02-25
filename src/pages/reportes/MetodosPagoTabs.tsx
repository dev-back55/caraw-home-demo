
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

type Props = {
  paymentMethodData: any[];
};

export function MetodosPagoTabs({ paymentMethodData }: Props) {
  const total = paymentMethodData.reduce((sum, m) => sum + m.value, 0);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Métodos de Pago Utilizados</CardTitle>
          <CardDescription>Preferencias de pago de los asociados</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tendencia de Métodos</CardTitle>
          <CardDescription>Evolución en el uso de métodos de pago</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethodData.map((method) => (
              <div key={method.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{method.name}</span>
                  <span className="text-sm text-gray-600">
                    {method.value} pagos
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${(method.value / total) * 100}%`,
                      backgroundColor: method.color
                    }}
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
