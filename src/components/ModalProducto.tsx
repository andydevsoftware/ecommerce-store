// components/ModalProducto.tsx
import React, { useState } from "react";
import {
  X,
  Heart,
  Star,
  ShoppingCart,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Producto } from "../app/types";

interface ModalProductoProps {
  producto: Producto;
  onCerrar: () => void;
  onVerDetalle: () => void;
  onAgregarCarrito: (cantidad: number) => void;
  esFavorito: boolean;
  onToggleFavorito: () => void;
  cantidadEnCarrito: number;
}

export default function ModalProducto({
  producto,
  onCerrar,
  onVerDetalle,
  onAgregarCarrito,
  esFavorito,
  onToggleFavorito,
  cantidadEnCarrito,
}: ModalProductoProps) {
  const [cantidad, setCantidad] = useState(1);
  const [imagenActual, setImagenActual] = useState(0);

  const stockBajo = producto.stock <= 5;
  const sinStock = producto.stock === 0;
  const stockDisponible = producto.stock - cantidadEnCarrito;
  const puedeAgregar = stockDisponible > 0;

  // Galería de imágenes (imagen principal + galería si existe)
  const imagenes = producto.galeria
    ? [producto.imagen, ...producto.galeria]
    : [producto.imagen];

  const incrementar = () => {
    if (cantidad < stockDisponible) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleAgregar = () => {
    onAgregarCarrito(cantidad);
    setCantidad(1);
  };

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % imagenes.length);
  };

  const imagenAnterior = () => {
    setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in"
        onClick={onCerrar}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del modal */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
            <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
              Vista Rápida
            </h2>
            <button
              onClick={onCerrar}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>
          </div>

          {/* Contenido del modal */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Galería de imágenes */}
              <div>
                <div className="relative mb-4">
                  <img
                    src={imagenes[imagenActual]}
                    alt={producto.nombre}
                    className="w-full h-80 object-cover rounded-lg"
                  />

                  {/* Badges */}
                  {stockBajo && !sinStock && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded">
                      ¡Solo quedan {producto.stock}!
                    </div>
                  )}
                  {sinStock && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                      Agotado
                    </div>
                  )}

                  {/* Botón favorito */}
                  <button
                    onClick={onToggleFavorito}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        esFavorito
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>

                  {/* Controles de galería */}
                  {imagenes.length > 1 && (
                    <>
                      <button
                        onClick={imagenAnterior}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-all"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-900" />
                      </button>
                      <button
                        onClick={siguienteImagen}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-all"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-900" />
                      </button>
                    </>
                  )}
                </div>

                {/* Miniaturas */}
                {imagenes.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {imagenes.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setImagenActual(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          imagenActual === idx
                            ? "border-orange-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${producto.nombre} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Información del producto */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {producto.nombre}
                </h3>

                {/* Valoración */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(producto.valoracion)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-700 font-medium">
                    {producto.valoracion} ({producto.resenas} reseñas)
                  </span>
                </div>

                {/* Precio */}
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  ${producto.precio}
                </div>

                {/* Descripción */}
                <p className="text-gray-800 mb-4 leading-relaxed">
                  {producto.descripcion}
                </p>

                {/* Categoría */}
                <div className="mb-4">
                  <span className="inline-block bg-gray-200 text-gray-900 px-3 py-1 rounded-full text-sm capitalize font-semibold">
                    {producto.categoria}
                  </span>
                </div>

                {/* Stock disponible */}
                <div className="mb-4">
                  <span className="text-gray-800 font-medium">
                    Stock disponible:{" "}
                    <span className="font-bold text-gray-900">
                      {stockDisponible} unidades
                    </span>
                  </span>
                </div>

                {/* Info del carrito */}
                {cantidadEnCarrito > 0 && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      Ya tienes {cantidadEnCarrito}{" "}
                      {cantidadEnCarrito === 1 ? "unidad" : "unidades"} en tu
                      carrito
                    </p>
                  </div>
                )}

                {/* Selector de cantidad */}
                {puedeAgregar && (
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Cantidad:
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={decrementar}
                        className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        <Minus className="w-5 h-5 text-gray-900" />
                      </button>
                      <span className="text-xl font-bold text-gray-900 w-12 text-center">
                        {cantidad}
                      </span>
                      <button
                        onClick={incrementar}
                        disabled={cantidad >= stockDisponible}
                        className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-5 h-5 text-gray-900" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Botones de acción */}
                <div className="space-y-3">
                  <button
                    onClick={handleAgregar}
                    disabled={!puedeAgregar || sinStock}
                    className="w-full flex items-center justify-center space-x-2 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{sinStock ? "Sin Stock" : "Agregar al Carrito"}</span>
                  </button>

                  <button
                    onClick={onVerDetalle}
                    className="w-full border border-gray-300 text-gray-900 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Ver Detalles Completos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
