// components/Header.tsx
import React from "react";
import Image from "next/image";

import {
  ShoppingCart,
  Search,
  Filter,
  User,
  Heart,
  ClipboardList,
} from "lucide-react";
import { Categoria } from "../app/types";

interface HeaderProps {
  busqueda: string;
  onBusquedaChange: (value: string) => void;
  categoriaSeleccionada: string;
  onCategoriaChange: (id: string) => void;
  categorias: Categoria[];
  cantidadCarrito: number;
  cantidadFavoritos: number;
  onToggleCarrito: () => void;
  onIrFavoritos: () => void;
  onIrPedidos: () => void;
  onVolverInicio: () => void;
  mostrarFiltros?: boolean;
  vistaActual:
    | "inicio"
    | "catalogo"
    | "detalle"
    | "checkout"
    | "favoritos"
    | "pedidos";
  onCambiarVista: (
    vista: "inicio" | "catalogo" | "favoritos" | "pedidos"
  ) => void;
}

export default function Header({
  busqueda,
  onBusquedaChange,
  categoriaSeleccionada,
  onCategoriaChange,
  categorias,
  cantidadCarrito,
  cantidadFavoritos,
  onToggleCarrito,
  onIrFavoritos,
  onVolverInicio,
  mostrarFiltros = true,
  vistaActual,
  onCambiarVista,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra superior */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={onVolverInicio}
          >
            <Image
              src="/favicon_logo.ico"
              alt="K&A Studio Logo"
              width={32}
              height={32}
              className="w-9 h-9"
            />
            <h1 className="text-2xl font-bold text-gray-800">K&A Studio</h1>
          </div>

          {/* Navegación central */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onCambiarVista("inicio")}
              className={`text-base font-medium transition-colors ${
                vistaActual === "inicio"
                  ? "text-orange-600 font-semibold"
                  : "text-gray-700 hover:text-orange-600"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => onCambiarVista("catalogo")}
              className={`text-base font-medium transition-colors ${
                vistaActual === "catalogo"
                  ? "text-orange-600 font-semibold"
                  : "text-gray-700 hover:text-orange-600"
              }`}
            >
              Catálogo
            </button>
            <button
              onClick={() => onCambiarVista("pedidos")}
              className={`text-base font-medium transition-colors flex items-center space-x-1 ${
                vistaActual === "pedidos"
                  ? "text-orange-600 font-semibold"
                  : "text-gray-700 hover:text-orange-600"
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>Mis Pedidos</span>
            </button>
            <button
              className="text-base font-medium text-gray-700 hover:text-orange-600 transition-colors flex items-center space-x-1"
              onClick={() => alert("Mi Cuenta - Próximamente")}
            >
              <User className="w-4 h-4" />
              <span>Mi Cuenta</span>
            </button>
          </nav>

          {/* Iconos de acción */}
          <div className="flex items-center space-x-4">
            {/* Favoritos */}
            <button
              onClick={onIrFavoritos}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  vistaActual === "favoritos"
                    ? "fill-red-500 text-red-500"
                    : "text-gray-700"
                }`}
              />
              {cantidadFavoritos > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cantidadFavoritos}
                </span>
              )}
            </button>

            {/* Carrito */}
            <button
              onClick={onToggleCarrito}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cantidadCarrito > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cantidadCarrito}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navegación móvil */}
        <div className="md:hidden flex items-center justify-around border-t py-3">
          <button
            onClick={() => onCambiarVista("inicio")}
            className={`flex flex-col items-center space-y-1 ${
              vistaActual === "inicio" ? "text-orange-600" : "text-gray-600"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs font-medium">Inicio</span>
          </button>
          <button
            onClick={() => onCambiarVista("catalogo")}
            className={`flex flex-col items-center space-y-1 ${
              vistaActual === "catalogo" ? "text-orange-600" : "text-gray-600"
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="text-xs font-medium">Catálogo</span>
          </button>
          <button
            onClick={() => onCambiarVista("pedidos")}
            className={`flex flex-col items-center space-y-1 ${
              vistaActual === "pedidos" ? "text-orange-600" : "text-gray-600"
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-xs font-medium">Pedidos</span>
          </button>
          <button
            onClick={onIrFavoritos}
            className={`flex flex-col items-center space-y-1 relative ${
              vistaActual === "favoritos" ? "text-orange-600" : "text-gray-600"
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs font-medium">Favoritos</span>
            {cantidadFavoritos > 0 && (
              <span className="absolute -top-1 right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                {cantidadFavoritos}
              </span>
            )}
          </button>
        </div>

        {/* Barra de búsqueda y filtros - Solo en catálogo */}
        {mostrarFiltros && vistaActual === "catalogo" && (
          <>
            <div className="pb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => onBusquedaChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            {/* Filtros de categoría */}
            <div className="pb-4 flex items-center space-x-2 overflow-x-auto">
              <Filter className="w-5 h-5 text-gray-600 shrink-0" />
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onCategoriaChange(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    categoriaSeleccionada === cat.id
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {cat.nombre}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
