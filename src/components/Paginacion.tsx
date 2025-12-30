// components/Paginacion.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginacionProps {
  paginaActual: number;
  totalPaginas: number;
  onCambioPagina: (pagina: number) => void;
}

export default function Paginacion({
  paginaActual,
  totalPaginas,
  onCambioPagina,
}: PaginacionProps) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="mt-8 flex justify-center items-center space-x-2">
      <button
        onClick={() => onCambioPagina(Math.max(1, paginaActual - 1))}
        disabled={paginaActual === 1}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-gray-900" />
      </button>

      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => onCambioPagina(num)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            paginaActual === num
              ? "bg-gray-800 text-white"
              : "border border-gray-300 hover:bg-gray-100 text-gray-900"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onCambioPagina(Math.min(totalPaginas, paginaActual + 1))}
        disabled={paginaActual === totalPaginas}
        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-gray-900" />
      </button>
    </div>
  );
}
