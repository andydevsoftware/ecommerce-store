// components/ProductoCardMejorado.tsx
import React, { useState } from "react";
import {
  Heart,
  Star,
  ShoppingCart,
  Plus,
  Minus,
  Eye,
  Share2,
} from "lucide-react";
import { Producto } from "../app/types";

// OptimizedImage component inline
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

function OptimizedImage({ src, alt, className, onClick }: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      loading="lazy"
      style={{ cursor: onClick ? "pointer" : "default" }}
    />
  );
}

// ProductBadges component inline
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

function ProductBadges({
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
      {isNew && (
        <div className="flex items-center space-x-1 bg-linear-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          <span>NUEVO</span>
        </div>
      )}

      {isOnSale && discount && (
        <div className="flex items-center space-x-1 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          <span>{discount}% OFF</span>
        </div>
      )}

      {isBestSeller && (
        <div className="flex items-center space-x-1 bg-linear-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          <span>MÁS VENDIDO</span>
        </div>
      )}

      {hasFreeShipping && (
        <div className="flex items-center space-x-1 bg-linear-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          <span>ENVÍO GRATIS</span>
        </div>
      )}

      {stockBajo && !sinStock && stockCount && (
        <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
          ¡Solo {stockCount}!
        </div>
      )}

      {sinStock && (
        <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Agotado
        </div>
      )}
    </div>
  );
}

// ShareButtons component inline
interface ShareButtonsProps {
  producto: Producto;
  className?: string;
}

function ShareButtons({ producto, className = "" }: ShareButtonsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const title = `¡Mira este producto: ${producto.nombre}!`;

  const handleShare = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `${title} - ${url}`
        )}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          setShowMenu(false);
        }, 2000);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
      setShowMenu(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-xl p-2 ${className}`}>
      <div className="space-y-1">
        <button
          onClick={() => handleShare("facebook")}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded hover:bg-blue-50 transition-colors text-gray-700 text-sm"
        >
          <span>Facebook</span>
        </button>
        <button
          onClick={() => handleShare("twitter")}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded hover:bg-sky-50 transition-colors text-gray-700 text-sm"
        >
          <span>Twitter</span>
        </button>
        <button
          onClick={() => handleShare("whatsapp")}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded hover:bg-green-50 transition-colors text-gray-700 text-sm"
        >
          <span>WhatsApp</span>
        </button>
        <button
          onClick={() => handleShare("copy")}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-50 transition-colors text-gray-700 text-sm"
        >
          <span>{copied ? "¡Copiado!" : "Copiar"}</span>
        </button>
      </div>
    </div>
  );
}

interface ProductoCardMejoradoProps {
  producto: Producto;
  onVerDetalle: () => void;
  onVistaRapida: () => void;
  onAgregarCarrito: (cantidad: number) => void;
  esFavorito: boolean;
  onToggleFavorito: () => void;
  cantidadEnCarrito: number;
}

export default function ProductoCardMejorado({
  producto,
  onVerDetalle,
  onVistaRapida,
  onAgregarCarrito,
  esFavorito,
  onToggleFavorito,
  cantidadEnCarrito,
}: ProductoCardMejoradoProps) {
  const [mostrarSelector, setMostrarSelector] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [showShare, setShowShare] = useState(false);

  const stockBajo = producto.stock <= 5;
  const sinStock = producto.stock === 0;
  const stockDisponible = producto.stock - cantidadEnCarrito;
  const puedeAgregar = stockDisponible > 0;

  const handleAgregarClick = () => {
    if (mostrarSelector) {
      onAgregarCarrito(cantidad);
      setMostrarSelector(false);
      setCantidad(1);
    } else {
      setMostrarSelector(true);
    }
  };

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

  const precioMostrar =
    producto.isOnSale && producto.precioOriginal
      ? producto.precio
      : producto.precio;

  return (
    <div className="product-card bg-white rounded-lg shadow-sm overflow-hidden group relative">
      {/* Imagen y badges */}
      <div className="relative overflow-hidden">
        <OptimizedImage
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-64 object-cover"
          onClick={onVerDetalle}
        />

        {/* Overlay oscuro en hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

        {/* Badges del producto */}
        <ProductBadges
          isNew={producto.isNew}
          isOnSale={producto.isOnSale}
          discount={producto.discount}
          isBestSeller={producto.isBestSeller}
          hasFreeShipping={producto.hasFreeShipping}
          stockBajo={stockBajo}
          stockCount={producto.stock}
          sinStock={sinStock}
        />

        {/* Botones de acción rápida */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Botón favorito */}
          <button
            onClick={onToggleFavorito}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all transform hover:scale-110"
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                esFavorito
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-gray-600"
              }`}
            />
          </button>

          {/* Botón compartir */}
          <button
            onClick={() => setShowShare(!showShare)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all transform hover:scale-110"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Menú de compartir */}
        {showShare && (
          <div className="absolute top-20 right-3 z-20">
            <ShareButtons producto={producto} className="shadow-xl" />
          </div>
        )}

        {/* Botón de vista rápida */}
        <button
          onClick={onVistaRapida}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100 flex items-center space-x-2 z-10"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">Vista Rápida</span>
        </button>
      </div>

      {/* Contenido del card */}
      <div className="p-4">
        {/* Categoría */}
        <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
          {producto.categoria}
        </span>

        {/* Nombre */}
        <h3
          className="font-semibold text-lg mb-2 cursor-pointer hover:text-orange-600 line-clamp-1 text-gray-900 transition-colors duration-200"
          onClick={onVerDetalle}
        >
          {producto.nombre}
        </h3>

        {/* Valoración y reseñas */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-700 font-medium">
              {producto.valoracion}
            </span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-600">
            {producto.resenas} reseñas
          </span>
        </div>

        {/* Descripción corta */}
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {producto.descripcion}
        </p>

        {/* Precio */}
        <div className="flex items-center space-x-2 mb-3">
          {producto.isOnSale && producto.precioOriginal ? (
            <>
              <span className="text-2xl font-bold text-gray-900">
                ${precioMostrar}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${producto.precioOriginal}
              </span>
              <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                -{producto.discount}%
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-900">
              ${precioMostrar}
            </span>
          )}
        </div>

        {/* Badge de envío gratis */}
        {producto.hasFreeShipping && (
          <div className="mb-3 inline-flex items-center space-x-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
            <span>✓</span>
            <span>Envío Gratis</span>
          </div>
        )}

        {/* Selector de cantidad o botón agregar */}
        {mostrarSelector && puedeAgregar ? (
          <div className="space-y-2 animate-fade-in-up">
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
              <button
                onClick={decrementar}
                className="p-2 bg-white rounded-lg hover:bg-gray-200 transition-all active:scale-95"
              >
                <Minus className="w-4 h-4 text-gray-900" />
              </button>
              <span className="text-lg font-semibold text-gray-900">
                {cantidad}
              </span>
              <button
                onClick={incrementar}
                disabled={cantidad >= stockDisponible}
                className="p-2 bg-white rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 active:scale-95"
              >
                <Plus className="w-4 h-4 text-gray-900" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMostrarSelector(false);
                  setCantidad(1);
                }}
                className="flex-1 border border-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all text-sm font-medium active:scale-95"
              >
                Cancelar
              </button>
              <button
                onClick={handleAgregarClick}
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all text-sm font-medium active:scale-95"
              >
                Confirmar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleAgregarClick}
            disabled={!puedeAgregar || sinStock}
            className="w-full flex items-center justify-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transform font-medium"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">
              {sinStock ? "Sin Stock" : "Agregar al Carrito"}
            </span>
          </button>
        )}

        {/* Cantidad en carrito */}
        {cantidadEnCarrito > 0 && (
          <div className="mt-2 text-sm text-green-600 font-medium animate-fade-in text-center">
            {cantidadEnCarrito} en carrito
          </div>
        )}
      </div>
    </div>
  );
}
