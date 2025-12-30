// components/FreeShippingBar.tsx
import React from "react";
import { Truck, CheckCircle } from "lucide-react";

interface FreeShippingBarProps {
  cartTotal: number;
  freeShippingThreshold?: number;
  className?: string;
}

export default function FreeShippingBar({
  cartTotal,
  freeShippingThreshold = 100,
  className = "",
}: FreeShippingBarProps) {
  const remaining = Math.max(0, freeShippingThreshold - cartTotal);
  const progress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const hasReachedThreshold = cartTotal >= freeShippingThreshold;

  return (
    <div
      className={`bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Truck
            className={`w-5 h-5 ${
              hasReachedThreshold ? "text-green-600" : "text-gray-600"
            }`}
          />
          <span className="font-bold text-gray-900">
            {hasReachedThreshold ? (
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-600">¡Tienes envío gratis!</span>
              </span>
            ) : (
              "Envío Gratis"
            )}
          </span>
        </div>
        {!hasReachedThreshold && (
          <span className="text-sm font-semibold text-gray-700">
            ${remaining.toFixed(2)} restantes
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out ${
            hasReachedThreshold
              ? "bg-linear-to-r from-green-500 to-emerald-500"
              : "bg-linear-to-r from-green-400 to-green-500"
          }`}
          style={{ width: `${progress}%` }}
        >
          {hasReachedThreshold && (
            <div className="absolute inset-0 bg-white/30 animate-shimmer" />
          )}
        </div>
      </div>

      {!hasReachedThreshold && (
        <p className="text-xs text-gray-600 mt-2">
          Agrega{" "}
          <span className="font-bold text-green-600">
            ${remaining.toFixed(2)}
          </span>{" "}
          más a tu carrito para obtener envío gratis
        </p>
      )}
    </div>
  );
}
