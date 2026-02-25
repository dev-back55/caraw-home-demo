
import React from "react";

export const getStatusColor = (estado: string) => {
  switch (estado) {
    case 'Pagada':
      return 'bg-green-100 text-green-800';
    case 'Pendiente':
      return 'bg-yellow-100 text-yellow-800';
    case 'Vencida':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusIcon = (estado: string) => {
  switch (estado) {
    case 'Pagada':
      return <span className="inline-block w-2 h-2 rounded-full bg-green-600" />;
    case 'Pendiente':
      return <span className="inline-block w-2 h-2 rounded-full bg-yellow-500" />;
    case 'Vencida':
      return <span className="inline-block w-2 h-2 rounded-full bg-red-600" />;
    default:
      return <span className="inline-block w-2 h-2 rounded-full bg-gray-400" />;
  }
};
