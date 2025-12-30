// components/Checkout.tsx
import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  CheckCircle,
  Tag,
  AlertCircle,
} from "lucide-react";
import { ItemCarrito } from "../app/types";

interface CheckoutProps {
  carrito: ItemCarrito[];
  total: string;
  onVolver: () => void;
  onFinalizar: (datosPedido: any) => void;
}

// Cupones disponibles (simulado)
const CUPONES_DISPONIBLES = [
  { codigo: "VERANO20", descuento: 20, tipo: "porcentaje" as const },
  { codigo: "ENVIO10", descuento: 10, tipo: "fijo" as const },
  { codigo: "PRIMERA15", descuento: 15, tipo: "porcentaje" as const },
];

// Opciones de envío
const OPCIONES_ENVIO = [
  { id: "estandar", nombre: "Envío Estándar", dias: "5-7 días", precio: 10 },
  { id: "express", nombre: "Envío Express", dias: "2-3 días", precio: 25 },
  { id: "rapido", nombre: "Envío Rápido", dias: "1 día", precio: 40 },
];

export default function Checkout({
  carrito,
  total,
  onVolver,
  onFinalizar,
}: CheckoutProps) {
  const [datosEnvio, setDatosEnvio] = useState({
    nombre: "",
    email: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    telefono: "",
  });

  const [datosPago, setDatosPago] = useState({
    numeroTarjeta: "",
    nombreTitular: "",
    fechaExpiracion: "",
    cvv: "",
  });

  const [codigoCupon, setCodigoCupon] = useState("");
  const [cuponAplicado, setCuponAplicado] = useState<
    (typeof CUPONES_DISPONIBLES)[0] | null
  >(null);
  const [errorCupon, setErrorCupon] = useState("");
  const [envioSeleccionado, setEnvioSeleccionado] = useState(OPCIONES_ENVIO[0]);

  const aplicarCupon = () => {
    const cupon = CUPONES_DISPONIBLES.find(
      (c) => c.codigo.toLowerCase() === codigoCupon.toLowerCase()
    );

    if (cupon) {
      setCuponAplicado(cupon);
      setErrorCupon("");
      setCodigoCupon("");
    } else {
      setErrorCupon("Cupón inválido");
      setCuponAplicado(null);
    }
  };

  const calcularDescuento = () => {
    if (!cuponAplicado) return 0;

    const subtotal = parseFloat(total);
    if (cuponAplicado.tipo === "porcentaje") {
      return (subtotal * cuponAplicado.descuento) / 100;
    }
    return cuponAplicado.descuento;
  };

  const subtotal = parseFloat(total);
  const descuento = calcularDescuento();
  const costoEnvio = envioSeleccionado.precio;
  const totalFinal = (subtotal - descuento + costoEnvio).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Pasar todos los datos necesarios al finalizar la compra
    onFinalizar({
      datosEnvio,
      datosPago,
      descuento,
      envioSeleccionado,
      totalFinal,
      cuponAplicado: cuponAplicado ? cuponAplicado.codigo : null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onVolver}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Volver al carrito</span>
      </button>

      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Finalizar Compra
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Resumen del pedido */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
            <CheckCircle className="w-6 h-6 mr-2" />
            Resumen del Pedido
          </h2>
          <div className="space-y-3">
            {carrito.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{item.nombre}</p>
                    <p className="text-sm text-gray-700 font-medium">
                      Cantidad: {item.cantidad}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">
                  ${(item.precio * item.cantidad).toFixed(2)}
                </p>
              </div>
            ))}

            {/* Cupón de descuento */}
            <div className="pt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Tag className="w-5 h-5 text-gray-700" />
                <span className="font-semibold text-gray-900">
                  Cupón de Descuento
                </span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ingresa tu cupón"
                  value={codigoCupon}
                  onChange={(e) => {
                    setCodigoCupon(e.target.value);
                    setErrorCupon("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 text-gray-900"
                />
                <button
                  type="button"
                  onClick={aplicarCupon}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Aplicar
                </button>
              </div>
              {errorCupon && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errorCupon}
                </p>
              )}
              {cuponAplicado && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    ✓ Cupón "{cuponAplicado.codigo}" aplicado: -$
                    {descuento.toFixed(2)}
                  </p>
                </div>
              )}
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Cupones disponibles:{" "}
                  <span className="font-semibold">VERANO20</span>,{" "}
                  <span className="font-semibold">ENVIO10</span>,{" "}
                  <span className="font-semibold">PRIMERA15</span>
                </p>
              </div>
            </div>

            {/* Totales */}
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              {descuento > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento:</span>
                  <span className="font-semibold">
                    -${descuento.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-gray-700">
                <span>Envío:</span>
                <span className="font-semibold">${costoEnvio.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold pt-2 border-t text-gray-900">
                <span>Total:</span>
                <span>${totalFinal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Opciones de envío */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
            <Truck className="w-6 h-6 mr-2" />
            Método de Envío
          </h2>
          <div className="space-y-3">
            {OPCIONES_ENVIO.map((opcion) => (
              <label
                key={opcion.id}
                className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  envioSeleccionado.id === opcion.id
                    ? "border-gray-800 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="envio"
                    checked={envioSeleccionado.id === opcion.id}
                    onChange={() => setEnvioSeleccionado(opcion)}
                    className="w-4 h-4 text-gray-800"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {opcion.nombre}
                    </p>
                    <p className="text-sm text-gray-600">{opcion.dias}</p>
                  </div>
                </div>
                <span className="font-bold text-gray-900">
                  ${opcion.precio}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Datos de envío */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
            <Truck className="w-6 h-6 mr-2" />
            Datos de Envío
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre completo"
              required
              value={datosEnvio.nombre}
              onChange={(e) =>
                setDatosEnvio({ ...datosEnvio, nombre: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 text-gray-900"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={datosEnvio.email}
              onChange={(e) =>
                setDatosEnvio({ ...datosEnvio, email: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 text-gray-900"
            />
            <input
              type="text"
              placeholder="Dirección"
              required
              value={datosEnvio.direccion}
              onChange={(e) =>
                setDatosEnvio({ ...datosEnvio, direccion: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 md:col-span-2 text-gray-900"
            />
            <input
              type="text"
              placeholder="Ciudad"
              required
              value={datosEnvio.ciudad}
              onChange={(e) =>
                setDatosEnvio({ ...datosEnvio, ciudad: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 text-gray-900"
            />
            <input
              type="text"
              placeholder="Código Postal"
              required
              value={datosEnvio.codigoPostal}
              onChange={(e) =>
                setDatosEnvio({ ...datosEnvio, codigoPostal: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 text-gray-900"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              required
              value={datosEnvio.telefono}
              onChange={(e) =>
                setDatosEnvio({ ...datosEnvio, telefono: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 md:col-span-2 text-gray-900"
            />
          </div>
        </div>

        {/* Datos de pago */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900">
            <CreditCard className="w-6 h-6 mr-2" />
            Información de Pago
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Número de tarjeta (simulado)"
              required
              value={datosPago.numeroTarjeta}
              onChange={(e) =>
                setDatosPago({ ...datosPago, numeroTarjeta: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 md:col-span-2 text-gray-900"
              maxLength={16}
            />
            <input
              type="text"
              placeholder="Nombre del titular"
              required
              value={datosPago.nombreTitular}
              onChange={(e) =>
                setDatosPago({ ...datosPago, nombreTitular: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 md:col-span-2 text-gray-900"
            />
            <input
              type="text"
              placeholder="MM/AA"
              required
              value={datosPago.fechaExpiracion}
              onChange={(e) =>
                setDatosPago({ ...datosPago, fechaExpiracion: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 text-gray-900"
              maxLength={5}
            />
            <input
              type="text"
              placeholder="CVV"
              required
              value={datosPago.cvv}
              onChange={(e) =>
                setDatosPago({ ...datosPago, cvv: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 text-gray-900"
              maxLength={3}
            />
          </div>
          <p className="text-sm text-gray-600 mt-4 font-medium">
            * Este es un checkout simulado. No se procesarán pagos reales.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-colors"
        >
          Confirmar Pedido - ${totalFinal}
        </button>
      </form>
    </div>
  );
}
