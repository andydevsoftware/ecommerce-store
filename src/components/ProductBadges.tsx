// components/ProductBadges.tsx
import React from "react";
import { Flame, Sparkles, Truck, Tag } from "lucide-react";

interface ProductBadgesProps {
  isNew?: boolean;
  isOnSale?: boolean;
  isBestSeller?: boolean;
  hasFreeShipping?: boolean;
  discount?: number;
  stockBajo?: boolean;
  stockCount?: number;
  sinStock?: boolean;
  className?: string;
}

export default function ProductBadges({
  isNew,
  isOnSale,
  isBestSeller,
  hasFreeShipping,
  discount,
  stockBajo,
  stockCount,
  sinStock,
  className = "",
}: ProductBadgesProps) {
  return (
    <div
      className={`absolute top-3 left-3 flex flex-col gap-2 z-10 ${className}`}
    >
      {/* Badge: Nuevo */}
      {isNew && (
        <div className="flex items-center space-x-1 bg-linear-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce-in">
          <Sparkles className="w-3 h-3" />
          <span>NUEVO</span>
        </div>
      )}

      {/* Badge: En Oferta */}
      {isOnSale && discount && (
        <div className="flex items-center space-x-1 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce-in">
          <Tag className="w-3 h-3" />
          <span>{discount}% OFF</span>
        </div>
      )}

      {/* Badge: Más Vendido */}
      {isBestSeller && (
        <div className="flex items-center space-x-1 bg-linear-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce-in">
          <Flame className="w-3 h-3" />
          <span>MÁS VENDIDO</span>
        </div>
      )}

      {/* Badge: Envío Gratis */}
      {hasFreeShipping && (
        <div className="flex items-center space-x-1 bg-linear-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce-in">
          <Truck className="w-3 h-3" />
          <span>ENVÍO GRATIS</span>
        </div>
      )}

      {/* Badge: Stock Bajo */}
      {stockBajo && !sinStock && stockCount && (
        <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
          ¡Solo {stockCount}!
        </div>
      )}

      {/* Badge: Sin Stock */}
      {sinStock && (
        <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Agotado
        </div>
      )}
    </div>
  );
}
