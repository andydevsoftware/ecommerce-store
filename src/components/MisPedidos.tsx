// components/MisPedidos.tsx
import React, { useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";
import { Pedido, Producto } from "../app/types";

interface MisPedidosProps {
  pedidos: Pedido[];
  onComprarDeNuevo: (productos: Pedido["productos"]) => void;
  onVerProducto: (producto: Producto) => void;
}

export default function MisPedidos({
  pedidos,
  onComprarDeNuevo,
  onVerProducto,
}: MisPedidosProps) {
  const [pedidoExpandido, setPedidoExpandido] = useState<string | null>(null);

  if (pedidos.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Package className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            No tienes pedidos aún
          </h2>
          <p className="text-gray-600 mb-8">
            Cuando realices una compra, tus pedidos aparecerán aquí
          </p>
        </div>
      </div>
    );
  }

  const getEstadoColor = (estado: Pedido["estado"]) => {
    switch (estado) {
      case "completado":
        return "bg-green-100 text-green-800";
      case "procesando":
        return "bg-blue-100 text-blue-800";
      case "enviado":
        return "bg-purple-100 text-purple-800";
      case "entregado":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEstadoIcono = (estado: Pedido["estado"]) => {
    switch (estado) {
      case "completado":
        return <CheckCircle className="w-5 h-5" />;
      case "procesando":
        return <Clock className="w-5 h-5" />;
      case "enviado":
        return <Truck className="w-5 h-5" />;
      case "entregado":
        return <Package className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getEstadoTexto = (estado: Pedido["estado"]) => {
    switch (estado) {
      case "completado":
        return "Completado";
      case "procesando":
        return "Procesando";
      case "enviado":
        return "Enviado";
      case "entregado":
        return "Entregado";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
        <p className="text-gray-600">
          Historial completo de tus compras ({pedidos.length}{" "}
          {pedidos.length === 1 ? "pedido" : "pedidos"})
        </p>
      </div>

      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* Encabezado del pedido */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      Pedido #{pedido.id}
                    </h3>
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${getEstadoColor(
                        pedido.estado
                      )}`}
                    >
                      {getEstadoIcono(pedido.estado)}
                      <span>{getEstadoTexto(pedido.estado)}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    Fecha: {pedido.fecha}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    Método de envío: {pedido.metodoEnvio.nombre}
                  </p>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total pagado</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${pedido.total.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => onComprarDeNuevo(pedido.productos)}
                    className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Comprar de Nuevo</span>
                  </button>
                </div>
              </div>

              {/* Botón expandir/contraer */}
              <button
                onClick={() =>
                  setPedidoExpandido(
                    pedidoExpandido === pedido.id ? null : pedido.id
                  )
                }
                className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium mt-4"
              >
                {pedidoExpandido === pedido.id ? (
                  <>
                    <ChevronUp className="w-5 h-5" />
                    <span>Ocultar detalles</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-5 h-5" />
                    <span>Ver detalles</span>
                  </>
                )}
              </button>
            </div>

            {/* Detalles del pedido (expandible) */}
            {pedidoExpandido === pedido.id && (
              <div className="p-6 bg-gray-50 animate-fade-in-up">
                {/* Productos */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Productos</h4>
                  <div className="space-y-3">
                    {pedido.productos.map((producto) => (
                      <div
                        key={producto.id}
                        className="flex items-center space-x-4 bg-white rounded-lg p-3"
                      >
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => onVerProducto(producto)}
                        />
                        <div className="flex-1">
                          <h5
                            className="font-semibold text-gray-900 cursor-pointer hover:text-orange-600 transition-colors"
                            onClick={() => onVerProducto(producto)}
                          >
                            {producto.nombre}
                          </h5>
                          <p className="text-sm text-gray-600">
                            Cantidad: {producto.cantidad}
                          </p>
                          <p className="text-sm text-gray-700 font-semibold">
                            ${producto.precio} c/u
                          </p>
                        </div>
                        <p className="font-bold text-gray-900">
                          ${(producto.precio * producto.cantidad).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dirección de envío */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">
                    Dirección de Envío
                  </h4>
                  <div className="bg-white rounded-lg p-4 text-gray-700 space-y-1">
                    <p className="font-semibold">{pedido.datosEnvio.nombre}</p>
                    <p>{pedido.datosEnvio.direccion}</p>
                    <p>
                      {pedido.datosEnvio.ciudad},{" "}
                      {pedido.datosEnvio.codigoPostal}
                    </p>
                    <p>{pedido.datosEnvio.telefono}</p>
                    <p>{pedido.datosEnvio.email}</p>
                  </div>
                </div>

                {/* Resumen de costos */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">
                    Resumen de Costos
                  </h4>
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal:</span>
                      <span className="font-semibold">
                        ${pedido.subtotal.toFixed(2)}
                      </span>
                    </div>
                    {pedido.descuento > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Descuento:</span>
                        <span className="font-semibold">
                          -${pedido.descuento.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-700">
                      <span>Envío:</span>
                      <span className="font-semibold">
                        ${pedido.envio.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-2 border-t text-gray-900">
                      <span>Total:</span>
                      <span>${pedido.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
