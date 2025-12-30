// components/FormularioResena.tsx
import React, { useState } from "react";
import { Star, X, Upload, Image as ImageIcon } from "lucide-react";

interface FormularioResenaProps {
  onEnviar: (resena: {
    usuario: string;
    valoracion: number;
    comentario: string;
    imagen?: string;
  }) => void;
  onCancelar: () => void;
}

export default function FormularioResena({
  onEnviar,
  onCancelar,
}: FormularioResenaProps) {
  const [usuario, setUsuario] = useState("");
  const [valoracion, setValoracion] = useState(0);
  const [valoracionHover, setValoracionHover] = useState(0);
  const [comentario, setComentario] = useState("");
  const [imagen, setImagen] = useState<string>("");
  const [previsualizacion, setPrevisualizacion] = useState<string>("");

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagen(result);
        setPrevisualizacion(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario && valoracion > 0 && comentario) {
      onEnviar({
        usuario,
        valoracion,
        comentario,
        imagen: imagen || undefined,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Escribe una Reseña
          </h2>
          <button
            onClick={onCancelar}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Tu Nombre
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-900"
            />
          </div>

          {/* Valoración */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Tu Valoración
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValoracion(star)}
                  onMouseEnter={() => setValoracionHover(star)}
                  onMouseLeave={() => setValoracionHover(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (valoracionHover || valoracion)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              {valoracion > 0 && (
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  {valoracion} {valoracion === 1 ? "estrella" : "estrellas"}
                </span>
              )}
            </div>
          </div>

          {/* Comentario */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Tu Reseña
            </label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Comparte tu experiencia con este producto..."
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-900 resize-none"
            />
            <p className="text-sm text-gray-600 mt-1">
              Mínimo 20 caracteres ({comentario.length}/20)
            </p>
          </div>

          {/* Subir imagen */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Agregar Foto (Opcional)
            </label>
            <div className="space-y-3">
              {previsualizacion ? (
                <div className="relative">
                  <img
                    src={previsualizacion}
                    alt="Vista previa"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagen("");
                      setPrevisualizacion("");
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-600 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Click para subir</span> o
                      arrastra aquí
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG hasta 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImagenChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancelar}
              className="flex-1 border border-gray-300 text-gray-900 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!usuario || valoracion === 0 || comentario.length < 20}
              className="flex-1 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Publicar Reseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
