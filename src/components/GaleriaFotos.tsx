import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Resena } from "../app/types";

interface GaleriaFotosProps {
  resenas: Resena[];
  onCerrar?: () => void;
}

export default function GaleriaFotos({ resenas, onCerrar }: GaleriaFotosProps) {
  const [imagenSeleccionada, setImagenSeleccionada] = useState<number | null>(
    null
  );

  // Filtro de reseñas que tienen imágenes
  const resenasConImagenes = resenas.filter((r) => r.imagen);

  if (resenasConImagenes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          Aún no hay fotos de clientes para este producto
        </p>
      </div>
    );
  }

  const siguienteImagen = () => {
    if (imagenSeleccionada !== null) {
      setImagenSeleccionada(
        (imagenSeleccionada + 1) % resenasConImagenes.length
      );
    }
  };

  const imagenAnterior = () => {
    if (imagenSeleccionada !== null) {
      setImagenSeleccionada(
        (imagenSeleccionada - 1 + resenasConImagenes.length) %
          resenasConImagenes.length
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">
          Fotos de Clientes ({resenasConImagenes.length})
        </h3>
      </div>

      {/* Grid de fotos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {resenasConImagenes.map((resena, idx) => (
          <button
            key={resena.id}
            onClick={() => setImagenSeleccionada(idx)}
            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
          >
            <img
              src={resena.imagen}
              alt={`Foto de ${resena.usuario}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity" />

            {/* Info del usuario en hover */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-xs font-medium truncate">
                  {resena.usuario}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal de imagen ampliada */}
      {imagenSeleccionada !== null && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setImagenSeleccionada(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setImagenSeleccionada(null);
            }}
            className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>

          {/* Navegación */}
          {resenasConImagenes.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  imagenAnterior();
                }}
                className="absolute left-4 p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  siguienteImagen();
                }}
                className="absolute right-4 p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>
            </>
          )}

          {/* Imagen y detalles */}
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={resenasConImagenes[imagenSeleccionada].imagen}
              alt={`Foto de ${resenasConImagenes[imagenSeleccionada].usuario}`}
              className="w-full max-h-[70vh] object-contain rounded-lg mb-4"
            />

            {/* Info de la reseña */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {resenasConImagenes[imagenSeleccionada].usuario[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-gray-900">
                      {resenasConImagenes[imagenSeleccionada].usuario}
                    </p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i <
                            resenasConImagenes[imagenSeleccionada].valoracion
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {resenasConImagenes[imagenSeleccionada].fecha}
                  </p>
                  <p className="text-gray-900">
                    {resenasConImagenes[imagenSeleccionada].comentario}
                  </p>
                </div>
              </div>
            </div>

            {/* Contador */}
            <p className="text-center text-white mt-4">
              {imagenSeleccionada + 1} / {resenasConImagenes.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
