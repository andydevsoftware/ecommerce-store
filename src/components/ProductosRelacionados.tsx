// components/ProductosRelacionados.tsx
import React from "react";
import { Producto } from "../app/types";
import { Star, ShoppingCart } from "lucide-react";

interface ProductosRelacionadosProps {
  productos: Producto[];
  onVerDetalle: (producto: Producto) => void;
  onAgregarCarrito: (producto: Producto) => void;
}

export default function ProductosRelacionados({
  productos,
  onVerDetalle,
  onAgregarCarrito,
}: ProductosRelacionadosProps) {
  if (productos.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        También te puede gustar
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
            onClick={() => onVerDetalle(producto)}
          >
            <div className="relative">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-48 object-cover"
              />
              {producto.stock <= 5 && producto.stock > 0 && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  ¡Solo {producto.stock}!
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-1 line-clamp-1 text-gray-900">
                {producto.nombre}
              </h3>
              <div className="flex items-center mb-2">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-xs text-gray-700">
                  {producto.valoracion}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ${producto.precio}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAgregarCarrito(producto);
                  }}
                  disabled={producto.stock === 0}
                  className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
