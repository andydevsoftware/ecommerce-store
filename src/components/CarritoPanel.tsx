import React from "react";
import { X, ShoppingCart, Plus, Minus, Trash2, Heart } from "lucide-react";
import { ItemCarrito } from "../app/types";

/* ---------- Free Shipping Bar ---------- */

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

/* ---------- Props ---------- */

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

/* ---------- Component ---------- */

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
  const total = parseFloat(calcularTotal());

  return (
    <>
      {/* Overlay */}
      {mostrar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onCerrar}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform ${
          mostrar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
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
              onClick={onCerrar}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free shipping */}
          {carrito.length > 0 && (
            <div className="p-4 border-b">
              <FreeShippingBar cartTotal={total} freeShippingThreshold={100} />
            </div>
          )}

          {/* Products */}
          <div className="flex-1 overflow-y-auto p-4">
            {carrito.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <ShoppingCart className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                <p className="font-semibold">Tu carrito está vacío</p>
                <p className="text-sm">Agrega productos para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {carrito.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b pb-4 last:border-b-0"
                  >
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-gray-900">
                        {item.nombre}
                      </h3>

                      <p className="text-sm font-bold">${item.precio}</p>

                      {/* Quantity */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onQuitar(item.id)}
                          className="p-1 bg-gray-200 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span className="text-sm font-medium">
                          {item.cantidad}
                        </span>

                        <button
                          onClick={() => onAgregar(item.id)}
                          className="p-1 bg-gray-200 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-sm font-semibold mt-1">
                        Subtotal: ${calcularSubtotal(item)}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <button
                          onClick={() => onGuardarParaDespues(item.id)}
                          className="flex items-center gap-1 text-gray-600 hover:text-orange-600"
                        >
                          <Heart className="w-3 h-3" />
                          Guardar
                        </button>

                        <button
                          onClick={() => onEliminar(item.id)}
                          className="flex items-center gap-1 text-gray-600 hover:text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {carrito.length > 0 && (
            <div className="border-t p-4 space-y-3 bg-gray-50">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  onCerrar();
                  onCheckout();
                }}
                className="w-full bg-linear-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-medium"
              >
                Proceder al Checkout
              </button>

              <button
                onClick={onVaciar}
                className="w-full border py-2 rounded-lg font-medium"
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
