// components/Hero.tsx
import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Producto, Oferta } from "../app/types";
import { PRODUCTOS } from "../data/productos";

interface HeroProps {
  onVerProducto: (producto: Producto) => void;
  onIrCatalogo: () => void;
  onComprarAhora: (producto: Producto) => void;
}

// Ofertas del carrusel
const OFERTAS: Oferta[] = [
  {
    id: 1,
    titulo: "Descubre Tu",
    subtitulo: "Estilo Perfecto",
    descripcion:
      "Explora nuestra colección exclusiva de productos premium seleccionados especialmente para ti.",
    imagen: "",
    productoId: 0,
    descuento: 20,
    fechaFin: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
    colorFondo: "from-purple-500 to-pink-500",
    colorTexto: "text-white",
  },
  {
    id: 2,
    titulo: "Ofertas de",
    subtitulo: "Verano 🌞",
    descripcion:
      "Hasta 30% de descuento en toda la colección de verano. ¡Aprovecha antes de que termine!",
    imagen: "",
    productoId: 0,
    descuento: 30,
    fechaFin: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48 horas
    colorFondo: "from-orange-400 to-red-500",
    colorTexto: "text-white",
  },
  {
    id: 3,
    titulo: "Nueva",
    subtitulo: "Colección",
    descripcion:
      "Los mejores productos del mercado al alcance de tu mano. Innovación y estilo en cada compra.",
    imagen: "",
    productoId: 0,
    colorFondo: "from-blue-500 to-cyan-500",
    colorTexto: "text-white",
  },
];

export default function Hero({
  onVerProducto,
  onIrCatalogo,
  onComprarAhora,
}: HeroProps) {
  const [ofertaActual, setOfertaActual] = useState(0);
  const [productoDestacado, setProductoDestacado] = useState<Producto | null>(
    null
  );
  const [tiempoRestante, setTiempoRestante] = useState<{
    horas: number;
    minutos: number;
    segundos: number;
  }>({ horas: 0, minutos: 0, segundos: 0 });

  // Inicializar producto destacado
  useEffect(() => {
    const productoAleatorio =
      PRODUCTOS[Math.floor(Math.random() * PRODUCTOS.length)];
    setProductoDestacado(productoAleatorio);
  }, []);

  // Auto-rotar carrusel cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setOfertaActual((prev) => (prev + 1) % OFERTAS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const oferta = OFERTAS[ofertaActual];
    if (!oferta.fechaFin) return;

    const calcularTiempoRestante = () => {
      const ahora = new Date().getTime();
      const fin = new Date(oferta.fechaFin!).getTime();
      const diferencia = fin - ahora;

      if (diferencia > 0) {
        const horas = Math.floor(diferencia / (1000 * 60 * 60));
        const minutos = Math.floor(
          (diferencia % (1000 * 60 * 60)) / (1000 * 60)
        );
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        setTiempoRestante({ horas, minutos, segundos });
      } else {
        setTiempoRestante({ horas: 0, minutos: 0, segundos: 0 });
      }
    };

    calcularTiempoRestante();
    const interval = setInterval(calcularTiempoRestante, 1000);

    return () => clearInterval(interval);
  }, [ofertaActual]);

  const siguienteOferta = () => {
    setOfertaActual((prev) => (prev + 1) % OFERTAS.length);
  };

  const ofertaAnterior = () => {
    setOfertaActual((prev) => (prev - 1 + OFERTAS.length) % OFERTAS.length);
  };

  const oferta = OFERTAS[ofertaActual];

  if (!productoDestacado) return null;

  return (
    <div className="hero-section relative overflow-hidden">
      {/* Formas decorativas de fondo */}
      <div className="hero-blob hero-blob-1"></div>
      <div className="hero-blob hero-blob-2"></div>
      <div className="hero-blob hero-blob-3"></div>

      {/* Fondo de gradiente animado */}
      <div
        className={`absolute inset-0 bg-linear-to-r ${oferta.colorFondo} opacity-10 transition-all duration-1000`}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Controles del carrusel */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <button
            onClick={ofertaAnterior}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <button
            onClick={siguienteOferta}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenido de texto */}
          <div className="space-y-8 text-center lg:text-left animate-fade-in-up">
            {/* Countdown timer */}
            {oferta.fechaFin && (
              <div className="inline-flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce-in">
                <Clock className="w-5 h-5" />
                <span>Oferta termina en:</span>
                <div className="flex space-x-1">
                  <span className="bg-white/20 px-2 py-1 rounded">
                    {String(tiempoRestante.horas).padStart(2, "0")}
                  </span>
                  <span>:</span>
                  <span className="bg-white/20 px-2 py-1 rounded">
                    {String(tiempoRestante.minutos).padStart(2, "0")}
                  </span>
                  <span>:</span>
                  <span className="bg-white/20 px-2 py-1 rounded">
                    {String(tiempoRestante.segundos).padStart(2, "0")}
                  </span>
                </div>
              </div>
            )}

            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                {oferta.titulo}
              </h1>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                {oferta.subtitulo}
              </h2>
            </div>

            {oferta.descuento && (
              <div className="inline-block bg-linear-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full text-2xl font-bold shadow-lg animate-scale-in">
                {oferta.descuento}% OFF
              </div>
            )}

            <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto lg:mx-0 font-medium">
              {oferta.descripcion}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onIrCatalogo}
                className="group flex items-center justify-center space-x-3 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
              >
                <ShoppingBag className="w-6 h-6" />
                <span>COMPRAR AHORA</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onIrCatalogo}
                className="flex items-center justify-center px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all"
              >
                Ver Ofertas
              </button>
            </div>

            {/* Características */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-700 font-medium">
                  Productos
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.8★</div>
                <div className="text-sm text-gray-700 font-medium">
                  Valoración
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-700 font-medium">Soporte</div>
              </div>
            </div>
          </div>

          {/* Producto destacado */}
          <div
            className="relative animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              {/* Badge de "Destacado" */}
              <div className="absolute -top-4 -right-4 bg-linear-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg z-10 animate-bounce-in">
                DESTACADO
              </div>

              <div
                className="cursor-pointer"
                onClick={() => onVerProducto(productoDestacado)}
              >
                <div className="relative mb-6">
                  <img
                    src={productoDestacado.imagen}
                    alt={productoDestacado.nombre}
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  {productoDestacado.stock <= 5 && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md animate-pulse">
                      ¡Solo quedan {productoDestacado.stock}!
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors">
                    {productoDestacado.nombre}
                  </h3>
                  <p className="text-gray-800 line-clamp-2 font-medium">
                    {productoDestacado.descripcion}
                  </p>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        ${productoDestacado.precio}
                      </div>
                      <div className="text-sm text-gray-700 font-medium">
                        ⭐ {productoDestacado.valoracion} (
                        {productoDestacado.resenas} reseñas)
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onComprarAhora(productoDestacado);
                      }}
                      className="bg-linear-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      Comprar Ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Círculo decorativo */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-linear-to-br from-orange-400 to-pink-400 rounded-full opacity-20 blur-2xl -z-10"></div>
          </div>
        </div>

        {/* Indicadores del carrusel */}
        <div className="flex justify-center space-x-2 mt-12">
          {OFERTAS.map((_, index) => (
            <button
              key={index}
              onClick={() => setOfertaActual(index)}
              className={`h-2 rounded-full transition-all ${
                index === ofertaActual
                  ? "w-8 bg-orange-600"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
