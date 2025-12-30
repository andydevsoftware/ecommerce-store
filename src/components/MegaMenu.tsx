// components/MegaMenu.tsx
import React, { useState } from "react";
import { ChevronDown, TrendingUp, Star, Zap } from "lucide-react";
import { Categoria, Producto } from "../app/types";

interface MegaMenuProps {
  categorias: Categoria[];
  productos: Producto[];
  onCategoriaClick: (categoriaId: string) => void;
  onProductoClick: (producto: Producto) => void;
}

interface MenuSeccion {
  titulo: string;
  items: { nombre: string; icono?: React.ReactNode }[];
}

const SECCIONES_POR_CATEGORIA: { [key: string]: MenuSeccion[] } = {
  electronica: [
    {
      titulo: "Computadoras",
      items: [
        { nombre: "Laptops" },
        { nombre: "Desktops" },
        { nombre: "Tablets" },
        { nombre: "Accesorios" },
      ],
    },
    {
      titulo: "Audio & Video",
      items: [
        { nombre: "Audífonos" },
        { nombre: "Parlantes" },
        { nombre: "Cámaras" },
        { nombre: "Proyectores" },
      ],
    },
  ],
  deportes: [
    {
      titulo: "Fitness",
      items: [
        { nombre: "Pesas" },
        { nombre: "Cardio" },
        { nombre: "Yoga" },
        { nombre: "Accesorios" },
      ],
    },
    {
      titulo: "Deportes",
      items: [
        { nombre: "Fútbol" },
        { nombre: "Basketball" },
        { nombre: "Tenis" },
        { nombre: "Natación" },
      ],
    },
  ],
  hogar: [
    {
      titulo: "Decoración",
      items: [
        { nombre: "Iluminación" },
        { nombre: "Muebles" },
        { nombre: "Textiles" },
        { nombre: "Arte" },
      ],
    },
    {
      titulo: "Cocina",
      items: [
        { nombre: "Utensilios" },
        { nombre: "Vajilla" },
        { nombre: "Electrodomésticos" },
        { nombre: "Almacenamiento" },
      ],
    },
  ],
  accesorios: [
    {
      titulo: "Tecnología",
      items: [
        { nombre: "Cables" },
        { nombre: "Cargadores" },
        { nombre: "Fundas" },
        { nombre: "Soportes" },
      ],
    },
    {
      titulo: "Personal",
      items: [
        { nombre: "Mochilas" },
        { nombre: "Carteras" },
        { nombre: "Relojes" },
        { nombre: "Joyería" },
      ],
    },
  ],
};

export default function MegaMenu({
  categorias,
  productos,
  onCategoriaClick,
  onProductoClick,
}: MegaMenuProps) {
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);

  const getProductosDestacados = (categoriaId: string) => {
    return productos
      .filter((p) => p.categoria === categoriaId)
      .sort((a, b) => b.valoracion - a.valoracion)
      .slice(0, 3);
  };

  return (
    <div className="hidden lg:block relative">
      <div className="flex items-center space-x-6">
        {categorias.slice(0, 5).map((categoria) => (
          <div
            key={categoria.id}
            className="relative"
            onMouseEnter={() => setMenuAbierto(categoria.id)}
            onMouseLeave={() => setMenuAbierto(null)}
          >
            <button
              className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                menuAbierto === categoria.id
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
              }`}
            >
              <span>{categoria.nombre}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  menuAbierto === categoria.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Mega Menu Dropdown */}
            {menuAbierto === categoria.id && (
              <>
                {/* Overlay invisible para mantener el menú abierto */}
                <div className="fixed inset-0 z-30" />

                <div className="absolute top-full left-0 mt-2 w-200 bg-white rounded-xl shadow-2xl border border-gray-100 z-40 animate-fade-in-up">
                  <div className="p-6">
                    <div className="grid grid-cols-12 gap-6">
                      {/* Secciones de categoría */}
                      <div className="col-span-8 grid grid-cols-2 gap-6">
                        {SECCIONES_POR_CATEGORIA[categoria.id]?.map(
                          (seccion, idx) => (
                            <div key={idx}>
                              <h3 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                                <span>{seccion.titulo}</span>
                              </h3>
                              <ul className="space-y-2">
                                {seccion.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    <button
                                      onClick={() => {
                                        onCategoriaClick(categoria.id);
                                        setMenuAbierto(null);
                                      }}
                                      className="text-sm text-gray-600 hover:text-orange-600 hover:translate-x-1 transition-all"
                                    >
                                      {item.nombre}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>

                      {/* Productos destacados */}
                      <div className="col-span-4 border-l border-gray-200 pl-6">
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>Destacados</span>
                        </h3>
                        <div className="space-y-3">
                          {getProductosDestacados(categoria.id).map(
                            (producto) => (
                              <button
                                key={producto.id}
                                onClick={() => {
                                  onProductoClick(producto);
                                  setMenuAbierto(null);
                                }}
                                className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                              >
                                <img
                                  src={producto.imagen}
                                  alt={producto.nombre}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                                    {producto.nombre}
                                  </p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs text-gray-600">
                                      ⭐ {producto.valoracion}
                                    </span>
                                    <span className="text-sm font-bold text-gray-900">
                                      ${producto.precio}
                                    </span>
                                  </div>
                                </div>
                              </button>
                            )
                          )}
                        </div>

                        {/* CTA */}
                        <button
                          onClick={() => {
                            onCategoriaClick(categoria.id);
                            setMenuAbierto(null);
                          }}
                          className="w-full mt-4 bg-linear-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow text-sm"
                        >
                          Ver todo en {categoria.nombre}
                        </button>
                      </div>
                    </div>

                    {/* Footer del mega menú */}
                    <div className="border-t border-gray-200 mt-6 pt-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span>Nuevos productos cada semana</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span>Envío gratis en compras +$100</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Star className="w-4 h-4 text-orange-500" />
                          <span>Productos con mejor valoración</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
