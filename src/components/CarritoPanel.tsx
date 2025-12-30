// components/CarritoPanelMejorado.tsx
import React from "react";
import { X, ShoppingCart, Plus, Minus, Trash2, Heart } from "lucide-react";
import { ItemCarrito } from "../app/types";

// Componente FreeShippingBar inline
interface FreeShippingBarProps {
  cartTotal: number;
  freeShippingThreshold: number;
}

function FreeShippingBar({
  cartTotal,
  freeShippingThreshold,
}: FreeShippingBarProps) {
  const progress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const remaining = Math.max(freeShippingThreshold - cartTotal, 0);

  return (
    <div className="space-y-2">
      {remaining > 0 ? (
        <p className="text-sm text-gray-700 font-medium">
          ¡Agrega ${remaining.toFixed(2)} más para obtener envío gratis!
        </p>
      ) : (
        <p className="text-sm text-green-600 font-bold">
          ¡Felicidades! Tienes envío gratis 🎉
        </p>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

interface CarritoPanelMejoradoProps {
  mostrar: boolean;
  carrito: ItemCarrito[];
  onCerrar: () => void;
  onAgregar: (id: number) => void;
  onQuitar: (id: number) => void;
  onEliminar: (id: number) => void;
  onVaciar: () => void;
  onGuardarParaDespues: (id: number) => void;
  onCheckout: () => void;
  calcularSubtotal: (item: ItemCarrito) => string;
  calcularTotal: () => string;
}

export default function CarritoPanelMejorado({
  mostrar,
  carrito,
  onCerrar,
  onAgregar,
  onQuitar,
  onEliminar,
  onVaciar,
  onGuardarParaDespues,
  onCheckout,
  calcularSubtotal,
  calcularTotal,
}: CarritoPanelMejoradoProps) {
  const mostrarCarrito = mostrar;
  const setMostrarCarrito = onCerrar;

  const total = parseFloat(calcularTotal());

  return (
    <>
      {mostrarCarrito && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMostrarCarrito(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform ${
          mostrarCarrito ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Mi Carrito</h2>
              {carrito.length > 0 && (
                <p className="text-sm text-gray-600">
                  {carrito.length}{" "}
                  {carrito.length === 1 ? "producto" : "productos"}
                </p>
              )}
            </div>
            <button
              onClick={() => setMostrarCarrito(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>
          </div>

          {/* Barra de progreso de envío gratis */}
          {carrito.length > 0 && (
            <div className="p-4 border-b">
              <FreeShippingBar cartTotal={total} freeShippingThreshold={100} />
            </div>
          )}

          {/* Lista de productos */}
          <div className="flex-1 overflow-y-auto p-4">
            {carrito.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="w-16 h-16 mx-auto mb-2 text-gray-300" />
                <p className="font-semibold">Tu carrito está vacío</p>
                <p className="text-sm mt-1">Agrega productos para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {carrito.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-4 border-b pb-4 last:border-b-0 hover:bg-gray-50 rounded-lg p-2 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      {item.isOnSale && item.discount && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                          -{item.discount}%
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate text-gray-900">
                        {item.nombre}
                      </h3>

                      {/* Precio */}
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-gray-900 text-sm font-bold">
                          ${item.precio}
                        </p>
                        {item.isOnSale && item.precioOriginal && (
                          <p className="text-gray-500 text-xs line-through">
                            ${item.precioOriginal}
                          </p>
                        )}
                      </div>

                      {/* Badge de envío gratis */}
                      {item.hasFreeShipping && (
                        <span className="inline-flex items-center text-xs text-green-600 font-semibold mt-1">
                          ✓ Envío gratis
                        </span>
                      )}

                      {/* Controles de cantidad */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => onQuitar(item.id)}
                          className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-900" />
                        </button>
                        <span className="text-sm font-medium text-gray-900 min-w-[20px] text-center">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() => onAgregar(item.id)}
                          disabled={item.cantidad >= item.stock}
                          className="p-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-900" />
                        </button>
                      </div>

                      <p className="text-sm font-semibold mt-1 text-gray-900">
                        Subtotal: ${calcularSubtotal(item)}
                      </p>

                      {/* Botones de acción */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => onGuardarParaDespues(item.id)}
                          className="flex items-center space-x-1 text-xs text-gray-600 hover:text-orange-600 transition-colors"
                        >
                          <Heart className="w-3 h-3" />
                          <span>Guardar</span>
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => onEliminar(item.id)}
                          className="flex items-center space-x-1 text-xs text-gray-600 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con total y botones */}
          {carrito.length > 0 && (
            <div className="border-t p-4 space-y-3 bg-gray-50">
              {/* Resumen de costos */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${calcularTotal()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Envío:</span>
                  <span className="font-semibold">
                    {total >= 100 ? (
                      <span className="text-green-600">GRATIS</span>
                    ) : (
                      "$10.00"
                    )}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                <span>Total:</span>
                <span>${(total + (total >= 100 ? 0 : 10)).toFixed(2)}</span>
              </div>

              {/* Botones de acción */}
              <button
                onClick={() => {
                  setMostrarCarrito(false);
                  onCheckout();
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Proceder al Checkout
              </button>

              <button
                onClick={onVaciar}
                className="w-full border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-gray-900"
              >
                Vaciar Carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
