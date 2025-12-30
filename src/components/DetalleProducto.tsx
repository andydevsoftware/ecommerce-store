// components/DetalleProducto.tsx
import React, { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Star,
  ShoppingCart,
  Package,
  Plus,
  Minus,
  MessageSquare,
  Camera,
} from "lucide-react";
import { Producto, Resena, ResenaUsuario } from "../app/types";
import FormularioResena from "./FormularioResena";
import GaleriaFotos from "./GaleriaFotos";

interface DetalleProductoProps {
  producto: Producto;
  onVolver: () => void;
  onAgregarCarrito: (cantidad: number) => void;
  esFavorito: boolean;
  onToggleFavorito: () => void;
  cantidadEnCarrito: number;
  resenasUsuario: ResenaUsuario[];
  onAgregarResena: (
    resena: Omit<ResenaUsuario, "productoId" | "fecha">
  ) => void;
}

export default function DetalleProducto({
  producto,
  onVolver,
  onAgregarCarrito,
  esFavorito,
  onToggleFavorito,
  cantidadEnCarrito,
  resenasUsuario,
  onAgregarResena,
}: DetalleProductoProps) {
  const [cantidad, setCantidad] = useState(1);
  const [mostrarFormResena, setMostrarFormResena] = useState(false);
  const [tabActiva, setTabActiva] = useState<"resenas" | "fotos">("resenas");

  const stockBajo = producto.stock <= 5;
  const sinStock = producto.stock === 0;
  const stockDisponible = producto.stock - cantidadEnCarrito;
  const puedeAgregar = stockDisponible > 0;

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

  // Reseñas simuladas base
  const resenasMock: Resena[] = [
    {
      id: 1,
      usuario: "María García",
      valoracion: 5,
      comentario:
        "Excelente calidad, superó mis expectativas. Lo recomiendo totalmente.",
      fecha: "2024-12-15",
    },
    {
      id: 2,
      usuario: "Carlos Rodríguez",
      valoracion: 4,
      comentario:
        "Muy buen producto, aunque la entrega tardó un poco más de lo esperado.",
      fecha: "2024-12-10",
    },
    {
      id: 3,
      usuario: "Ana Martínez",
      valoracion: 5,
      comentario: "Perfecto! Justo lo que buscaba. La calidad es increíble.",
      fecha: "2024-12-05",
    },
  ];

  // Combinar reseñas base con reseñas de usuarios
  const todasLasResenas: Resena[] = [
    ...resenasMock,
    ...resenasUsuario
      .filter((r) => r.productoId === producto.id)
      .map((r, idx) => ({
        id: 1000 + idx,
        usuario: r.usuario,
        valoracion: r.valoracion,
        comentario: r.comentario,
        fecha: r.fecha,
        imagen: r.imagen,
      })),
  ];

  const handleEnviarResena = (resena: {
    usuario: string;
    valoracion: number;
    comentario: string;
    imagen?: string;
  }) => {
    onAgregarResena(resena);
    setMostrarFormResena(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onVolver}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Volver</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Imagen */}
          <div className="relative">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-96 object-cover rounded-lg"
            />
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
          </div>

          {/* Información */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {producto.nombre}
              </h1>
              <button
                onClick={onToggleFavorito}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${
                    esFavorito ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(producto.valoracion)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-700 font-medium">
                {producto.valoracion} ({todasLasResenas.length} reseñas)
              </span>
            </div>

            <div className="text-4xl font-bold text-gray-900 mb-6">
              ${producto.precio}
            </div>

            <p className="text-gray-800 mb-6 leading-relaxed text-base">
              {producto.descripcion}
            </p>

            <div className="flex items-center space-x-4 mb-6">
              <Package className="w-5 h-5 text-gray-700" />
              <span className="text-gray-800 font-medium">
                Stock disponible:{" "}
                <span className="font-bold text-gray-900">
                  {stockDisponible} unidades
                </span>
              </span>
            </div>

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
                    className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <Minus className="w-5 h-5 text-gray-900" />
                  </button>
                  <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                    {cantidad}
                  </span>
                  <button
                    onClick={incrementar}
                    disabled={cantidad >= stockDisponible}
                    className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-5 h-5 text-gray-900" />
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleAgregar}
              disabled={!puedeAgregar || sinStock}
              className="w-full flex items-center justify-center space-x-3 bg-gray-800 text-white py-4 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>{sinStock ? "Sin Stock" : "Agregar al Carrito"}</span>
            </button>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold mb-2 text-gray-900">Categoría</h3>
              <span className="inline-block bg-gray-200 text-gray-900 px-3 py-1 rounded-full text-sm capitalize font-semibold">
                {producto.categoria}
              </span>
            </div>
          </div>
        </div>

        {/* Sección de Reseñas y Fotos */}
        <div className="mt-12">
          {/* Tabs */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setTabActiva("resenas")}
                className={`pb-4 px-2 font-semibold transition-colors relative ${
                  tabActiva === "resenas"
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Reseñas ({todasLasResenas.length})</span>
                </div>
                {tabActiva === "resenas" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600" />
                )}
              </button>

              <button
                onClick={() => setTabActiva("fotos")}
                className={`pb-4 px-2 font-semibold transition-colors relative ${
                  tabActiva === "fotos"
                    ? "text-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>
                    Fotos ({todasLasResenas.filter((r) => r.imagen).length})
                  </span>
                </div>
                {tabActiva === "fotos" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600" />
                )}
              </button>
            </div>

            {tabActiva === "resenas" && (
              <button
                onClick={() => setMostrarFormResena(true)}
                className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Escribir Reseña</span>
              </button>
            )}
          </div>

          {/* Contenido de tabs */}
          {tabActiva === "resenas" ? (
            <div className="space-y-6">
              {todasLasResenas.map((resena) => (
                <div key={resena.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start space-x-4">
                    {resena.imagen ? (
                      <img
                        src={resena.imagen}
                        alt={resena.usuario}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {resena.usuario[0]}
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-bold text-gray-900 text-base">
                            {resena.usuario}
                          </p>
                          <p className="text-sm text-gray-600 font-medium">
                            {resena.fecha}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < resena.valoracion
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-900 font-medium text-base leading-relaxed">
                        {resena.comentario}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <GaleriaFotos resenas={todasLasResenas} />
          )}
        </div>
      </div>

      {/* Formulario de reseña */}
      {mostrarFormResena && (
        <FormularioResena
          onEnviar={handleEnviarResena}
          onCancelar={() => setMostrarFormResena(false)}
        />
      )}
    </div>
  );
}
