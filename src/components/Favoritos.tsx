// components/Favoritos.tsx
import React from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Producto } from "../app/types";

interface FavoritosProps {
  productos: Producto[];
  onVerDetalle: (producto: Producto) => void;
  onAgregarCarrito: (producto: Producto) => void;
  onEliminarFavorito: (id: number) => void;
  cantidadesEnCarrito: { [key: number]: number };
}

export default function Favoritos({
  productos,
  onVerDetalle,
  onAgregarCarrito,
  onEliminarFavorito,
  cantidadesEnCarrito,
}: FavoritosProps) {
  if (productos.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Heart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            No tienes favoritos aún
          </h2>
          <p className="text-gray-600 mb-8">
            Explora nuestro catálogo y guarda tus productos favoritos aquí
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Favoritos</h1>
        <p className="text-gray-600">
          Tienes {productos.length}{" "}
          {productos.length === 1 ? "producto" : "productos"} guardados
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productos.map((producto) => {
          const stockBajo = producto.stock <= 5;
          const sinStock = producto.stock === 0;
          const cantidadEnCarrito = cantidadesEnCarrito[producto.id] || 0;
          const puedeAgregar = producto.stock - cantidadEnCarrito > 0;

          return (
            <div
              key={producto.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden relative"
            >
              {/* Botón eliminar favorito */}
              <button
                onClick={() => onEliminarFavorito(producto.id)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors z-10"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>

              <div className="relative">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={() => onVerDetalle(producto)}
                />
                {stockBajo && !sinStock && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                    ¡Solo {producto.stock}!
                  </div>
                )}
                {sinStock && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Sin Stock
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3
                  className="font-semibold text-lg mb-2 cursor-pointer hover:text-gray-600 line-clamp-1 text-gray-900"
                  onClick={() => onVerDetalle(producto)}
                >
                  {producto.nombre}
                </h3>

                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {producto.descripcion}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ${producto.precio}
                  </span>
                  <span className="text-sm text-gray-700">
                    ⭐ {producto.valoracion}
                  </span>
                </div>

                <button
                  onClick={() => onAgregarCarrito(producto)}
                  disabled={!puedeAgregar || sinStock}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-sm">
                    {sinStock ? "Sin Stock" : "Agregar al Carrito"}
                  </span>
                </button>

                {cantidadEnCarrito > 0 && (
                  <div className="mt-2 text-sm text-green-600 font-medium text-center">
                    {cantidadEnCarrito} en carrito
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
