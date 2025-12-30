"use client";

import React, { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import Hero from "./Hero";
import ProductoCard from "./ProductoCard";
import CarritoPanel from "./CarritoPanel";
import DetalleProducto from "./DetalleProducto";
import Checkout from "./Checkout";
import Paginacion from "./Paginacion";
import Footer from "./Footer";
import Favoritos from "./Favoritos";
import MisPedidos from "./MisPedidos";
import ProductosRelacionados from "./ProductosRelacionados";
import ModalProducto from "./ModalProducto";
import Toast, { useToast } from "./Toast";
import { PRODUCTOS, CATEGORIAS } from "../data/productos";
import { ItemCarrito, Producto, ResenaUsuario, Pedido } from "../app/types";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

const ITEMS_POR_PAGINA = 6;

type Vista =
  | "inicio"
  | "catalogo"
  | "detalle"
  | "checkout"
  | "favoritos"
  | "pedidos";

export default function AlgoBonitoStore() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");
  const [productoDetalle, setProductoDetalle] = useState<Producto | null>(null);
  const [productoModal, setProductoModal] = useState<Producto | null>(null);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarCheckout, setMostrarCheckout] = useState(false);
  const [vistaActual, setVistaActual] = useState<Vista>("inicio");
  const [resenasUsuario, setResenasUsuario] = useState<ResenaUsuario[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const [precioMin, setPrecioMin] = useState<number>(0);
  const [precioMax, setPrecioMax] = useState<number>(0);
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [ordenamiento, setOrdenamiento] = useState("relevancia");

  const { toasts, showToast, removeToast } = useToast();

  // Cargar datos del localStorage
  useEffect(() => {
    const cargarDatos = () => {
      const carritoGuardado = localStorage.getItem("carrito");
      const favoritosGuardados = localStorage.getItem("favoritos");
      const resenasGuardadas = localStorage.getItem("resenas");
      const pedidosGuardados = localStorage.getItem("pedidos");

      if (carritoGuardado) {
        try {
          setCarrito(JSON.parse(carritoGuardado));
        } catch (error) {
          console.error("Error al cargar carrito:", error);
        }
      }

      if (favoritosGuardados) {
        try {
          setFavoritos(JSON.parse(favoritosGuardados));
        } catch (error) {
          console.error("Error al cargar favoritos:", error);
        }
      }

      if (resenasGuardadas) {
        try {
          setResenasUsuario(JSON.parse(resenasGuardadas));
        } catch (error) {
          console.error("Error al cargar reseñas:", error);
        }
      }

      if (pedidosGuardados) {
        try {
          setPedidos(JSON.parse(pedidosGuardados));
        } catch (error) {
          console.error("Error al cargar pedidos:", error);
        }
      }
    };

    cargarDatos();
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    if (carrito.length > 0 || localStorage.getItem("carrito")) {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }, [carrito]);

  useEffect(() => {
    if (favoritos.length > 0 || localStorage.getItem("favoritos")) {
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
  }, [favoritos]);

  useEffect(() => {
    if (resenasUsuario.length > 0 || localStorage.getItem("resenas")) {
      localStorage.setItem("resenas", JSON.stringify(resenasUsuario));
    }
  }, [resenasUsuario]);

  useEffect(() => {
    if (pedidos.length > 0 || localStorage.getItem("pedidos")) {
      localStorage.setItem("pedidos", JSON.stringify(pedidos));
    }
  }, [pedidos]);

  // Filtrar y ordenar productos
  const productosFiltrados = useMemo(() => {
    const resultado = PRODUCTOS.filter((producto) => {
      const coincideBusqueda =
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());

      const coincideCategoria =
        categoriaSeleccionada === "todas" ||
        producto.categoria === categoriaSeleccionada;

      const coincidePrecio =
        (!precioMin || producto.precio >= precioMin) &&
        (!precioMax || producto.precio <= precioMax);

      const coincideDisponibilidad = !soloDisponibles || producto.stock > 0;

      return (
        coincideBusqueda &&
        coincideCategoria &&
        coincidePrecio &&
        coincideDisponibilidad
      );
    });

    switch (ordenamiento) {
      case "precio-menor":
        resultado.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-mayor":
        resultado.sort((a, b) => b.precio - a.precio);
        break;
      case "mejor-valorados":
        resultado.sort((a, b) => b.valoracion - a.valoracion);
        break;
      case "mas-vendidos":
        resultado.sort((a, b) => b.resenas - a.resenas);
        break;
      default:
        break;
    }

    return resultado;
  }, [
    busqueda,
    categoriaSeleccionada,
    precioMin,
    precioMax,
    soloDisponibles,
    ordenamiento,
  ]);

  const totalPaginas = Math.ceil(productosFiltrados.length / ITEMS_POR_PAGINA);
  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  const productosFavoritos = useMemo(() => {
    return PRODUCTOS.filter((p) => favoritos.includes(p.id));
  }, [favoritos]);

  const productosRelacionados = useMemo(() => {
    if (!productoDetalle) return [];
    return PRODUCTOS.filter(
      (p) =>
        p.categoria === productoDetalle.categoria && p.id !== productoDetalle.id
    ).slice(0, 4);
  }, [productoDetalle]);

  // Resetear paginación al cambiar filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [
    busqueda,
    categoriaSeleccionada,
    precioMin,
    precioMax,
    soloDisponibles,
    ordenamiento,
  ]);

  const limpiarFiltros = () => {
    setPrecioMin(0);
    setPrecioMax(0);
    setSoloDisponibles(false);
    setOrdenamiento("relevancia");
  };

  const agregarAlCarrito = (
    producto: Producto,
    cantidadAAgregar: number = 1
  ) => {
    const itemExistente = carrito.find((item) => item.id === producto.id);

    if (itemExistente) {
      const nuevaCantidad = itemExistente.cantidad + cantidadAAgregar;
      if (nuevaCantidad <= producto.stock) {
        setCarrito(
          carrito.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: nuevaCantidad }
              : item
          )
        );
        showToast(
          `${cantidadAAgregar} ${producto.nombre} agregado(s) al carrito`,
          "success",
          "cart"
        );
      } else {
        showToast("No hay más stock disponible", "warning");
      }
    } else {
      if (cantidadAAgregar <= producto.stock) {
        setCarrito([...carrito, { ...producto, cantidad: cantidadAAgregar }]);
        showToast(
          `${cantidadAAgregar} ${producto.nombre} agregado(s) al carrito`,
          "success",
          "cart"
        );
      } else {
        showToast("No hay suficiente stock disponible", "warning");
      }
    }
  };

  const agregarAlCarritoPorId = (id: number) => {
    const producto = PRODUCTOS.find((p) => p.id === id);
    if (producto) agregarAlCarrito(producto);
  };

  const quitarDelCarrito = (id: number) => {
    const item = carrito.find((item) => item.id === id);
    if (item && item.cantidad > 1) {
      setCarrito(
        carrito.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
      );
    } else {
      setCarrito(carrito.filter((item) => item.id !== id));
    }
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const toggleFavorito = (id: number) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
      showToast("Eliminado de favoritos", "info");
    } else {
      setFavoritos([...favoritos, id]);
      showToast("Agregado a favoritos", "success", "heart");
    }
  };

  const guardarParaDespues = (id: number) => {
    if (!favoritos.includes(id)) {
      setFavoritos([...favoritos, id]);
    }
    eliminarDelCarrito(id);
    showToast("Guardado para después en favoritos", "success", "heart");
  };

  const agregarResena = (
    productoId: number,
    resena: Omit<ResenaUsuario, "productoId" | "fecha">
  ) => {
    const nuevaResena: ResenaUsuario = {
      ...resena,
      productoId,
      fecha: new Date().toISOString().split("T")[0],
    };
    setResenasUsuario([...resenasUsuario, nuevaResena]);
    showToast("¡Reseña publicada con éxito!", "success");
  };

  const finalizarCompra = (datosPedido: any) => {
    const nuevoPedido: Pedido = {
      id: `ORD-${Date.now()}`,
      fecha: new Date().toISOString().split("T")[0],
      productos: [...carrito],
      subtotal: parseFloat(calcularTotal()),
      descuento: datosPedido.descuento,
      envio: datosPedido.envioSeleccionado.precio,
      total: parseFloat(datosPedido.totalFinal),
      estado: "completado",
      datosEnvio: datosPedido.datosEnvio,
      metodoEnvio: datosPedido.envioSeleccionado,
    };

    setPedidos([nuevoPedido, ...pedidos]);
    vaciarCarrito();
    setMostrarCheckout(false);
    setVistaActual("pedidos");
    showToast("¡Compra realizada con éxito!", "success");
  };

  const comprarDeNuevo = (productos: ItemCarrito[]) => {
    productos.forEach((producto) => {
      agregarAlCarrito(producto, producto.cantidad);
    });
    setVistaActual("catalogo");
    showToast("Productos agregados al carrito", "success", "cart");
  };

  const calcularTotal = () => {
    return carrito
      .reduce((total, item) => total + item.precio * item.cantidad, 0)
      .toFixed(2);
  };

  const calcularSubtotal = (item: ItemCarrito) => {
    return (item.precio * item.cantidad).toFixed(2);
  };

  const volverInicio = () => {
    setProductoDetalle(null);
    setMostrarCheckout(false);
    setVistaActual("inicio");
  };

  const irACatalogo = () => {
    setVistaActual("catalogo");
    setProductoDetalle(null);
    setMostrarCheckout(false);
  };

  const irAFavoritos = () => {
    setVistaActual("favoritos");
    setProductoDetalle(null);
    setMostrarCheckout(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const irAPedidos = () => {
    setVistaActual("pedidos");
    setProductoDetalle(null);
    setMostrarCheckout(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const verDetalleProducto = (producto: Producto) => {
    setProductoDetalle(producto);
    setProductoModal(null);
    setVistaActual("detalle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const abrirModalProducto = (producto: Producto) => {
    setProductoModal(producto);
  };

  const cambiarVista = (
    vista: "inicio" | "catalogo" | "favoritos" | "pedidos"
  ) => {
    setVistaActual(vista);
    setProductoDetalle(null);
    setMostrarCheckout(false);
    if (vista === "inicio") {
      setBusqueda("");
      setCategoriaSeleccionada("todas");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cantidadTotalCarrito = carrito.reduce(
    (sum, item) => sum + item.cantidad,
    0
  );

  const cantidadesEnCarrito = useMemo(() => {
    const cantidades: { [key: number]: number } = {};
    carrito.forEach((item) => {
      cantidades[item.id] = item.cantidad;
    });
    return cantidades;
  }, [carrito]);

  const vistaParaHeader: Vista = mostrarCheckout
    ? "checkout"
    : productoDetalle
    ? "detalle"
    : vistaActual;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          icon={toast.icon}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      <Header
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        onCategoriaChange={setCategoriaSeleccionada}
        categorias={CATEGORIAS}
        cantidadCarrito={cantidadTotalCarrito}
        cantidadFavoritos={favoritos.length}
        onToggleCarrito={() => setMostrarCarrito(!mostrarCarrito)}
        onIrFavoritos={irAFavoritos}
        onIrPedidos={irAPedidos}
        onVolverInicio={volverInicio}
        mostrarFiltros={
          !mostrarCheckout &&
          !productoDetalle &&
          vistaActual !== "favoritos" &&
          vistaActual !== "pedidos"
        }
        vistaActual={vistaParaHeader}
        onCambiarVista={cambiarVista}
      />

      <main className="flex-1">
        {mostrarCheckout ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Checkout
              carrito={carrito}
              total={calcularTotal()}
              onVolver={() => setMostrarCheckout(false)}
              onFinalizar={finalizarCompra}
            />
          </div>
        ) : productoDetalle ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <DetalleProducto
              producto={productoDetalle}
              onVolver={() => {
                setProductoDetalle(null);
                setVistaActual("catalogo");
              }}
              onAgregarCarrito={(cantidad) =>
                agregarAlCarrito(productoDetalle, cantidad)
              }
              esFavorito={favoritos.includes(productoDetalle.id)}
              onToggleFavorito={() => toggleFavorito(productoDetalle.id)}
              cantidadEnCarrito={
                carrito.find((item) => item.id === productoDetalle.id)
                  ?.cantidad || 0
              }
              resenasUsuario={resenasUsuario}
              onAgregarResena={(resena) =>
                agregarResena(productoDetalle.id, resena)
              }
            />
            <ProductosRelacionados
              productos={productosRelacionados}
              onVerDetalle={verDetalleProducto}
              onAgregarCarrito={(producto) => agregarAlCarrito(producto, 1)}
            />
          </div>
        ) : vistaActual === "favoritos" ? (
          <Favoritos
            productos={productosFavoritos}
            onVerDetalle={verDetalleProducto}
            onAgregarCarrito={(producto) => agregarAlCarrito(producto, 1)}
            onEliminarFavorito={toggleFavorito}
            cantidadesEnCarrito={cantidadesEnCarrito}
          />
        ) : vistaActual === "pedidos" ? (
          <MisPedidos
            pedidos={pedidos}
            onComprarDeNuevo={comprarDeNuevo}
            onVerProducto={verDetalleProducto}
          />
        ) : vistaActual === "inicio" ? (
          <>
            <Hero
              onVerProducto={verDetalleProducto}
              onIrCatalogo={irACatalogo}
              onComprarAhora={verDetalleProducto}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Productos Destacados
                </h2>
                <p className="text-xl text-gray-600">
                  Descubre nuestras mejores ofertas y novedades
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTOS.slice(0, 6).map((producto) => (
                  <ProductoCard
                    key={producto.id}
                    producto={producto}
                    onVerDetalle={() => verDetalleProducto(producto)}
                    onVistaRapida={() => abrirModalProducto(producto)}
                    onAgregarCarrito={(cantidad) =>
                      agregarAlCarrito(producto, cantidad)
                    }
                    esFavorito={favoritos.includes(producto.id)}
                    onToggleFavorito={() => toggleFavorito(producto.id)}
                    cantidadEnCarrito={
                      carrito.find((item) => item.id === producto.id)
                        ?.cantidad || 0
                    }
                  />
                ))}
              </div>

              <div className="text-center mt-12">
                <button
                  onClick={irACatalogo}
                  className="bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition-all transform hover:scale-105"
                >
                  Ver Todos los Productos
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900 mb-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Rango de Precio</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={precioMin || ""}
                      onChange={(e) => setPrecioMin(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={precioMax || ""}
                      onChange={(e) => setPrecioMax(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-900 mb-2">
                    <ArrowUpDown className="w-4 h-4" />
                    <span>Ordenar por</span>
                  </label>
                  <select
                    value={ordenamiento}
                    onChange={(e) => setOrdenamiento(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-sm"
                  >
                    <option value="relevancia">Relevancia</option>
                    <option value="precio-menor">Precio: Menor a Mayor</option>
                    <option value="precio-mayor">Precio: Mayor a Menor</option>
                    <option value="mejor-valorados">Mejor Valorados</option>
                    <option value="mas-vendidos">Más Vendidos</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Disponibilidad
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={soloDisponibles}
                      onChange={(e) => setSoloDisponibles(e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">
                      Solo disponibles
                    </span>
                  </label>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={limpiarFiltros}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Limpiar Filtros
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productosPaginados.map((producto) => (
                <ProductoCard
                  key={producto.id}
                  producto={producto}
                  onVerDetalle={() => verDetalleProducto(producto)}
                  onVistaRapida={() => abrirModalProducto(producto)}
                  onAgregarCarrito={(cantidad) =>
                    agregarAlCarrito(producto, cantidad)
                  }
                  esFavorito={favoritos.includes(producto.id)}
                  onToggleFavorito={() => toggleFavorito(producto.id)}
                  cantidadEnCarrito={
                    carrito.find((item) => item.id === producto.id)?.cantidad ||
                    0
                  }
                />
              ))}
            </div>

            {productosFiltrados.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No se encontraron productos con los filtros seleccionados
                </p>
                <button
                  onClick={limpiarFiltros}
                  className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
                >
                  Limpiar filtros
                </button>
              </div>
            )}

            <Paginacion
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambioPagina={setPaginaActual}
            />
          </div>
        )}
      </main>

      <CarritoPanel
        mostrar={mostrarCarrito}
        carrito={carrito}
        onCerrar={() => setMostrarCarrito(false)}
        onAgregar={agregarAlCarritoPorId}
        onQuitar={quitarDelCarrito}
        onEliminar={eliminarDelCarrito}
        onVaciar={vaciarCarrito}
        onGuardarParaDespues={guardarParaDespues}
        onCheckout={() => {
          setMostrarCheckout(true);
          setVistaActual("checkout");
        }}
        calcularSubtotal={calcularSubtotal}
        calcularTotal={calcularTotal}
      />

      {productoModal && (
        <ModalProducto
          producto={productoModal}
          onCerrar={() => setProductoModal(null)}
          onVerDetalle={() => {
            verDetalleProducto(productoModal);
            setProductoModal(null);
          }}
          onAgregarCarrito={(cantidad) => {
            agregarAlCarrito(productoModal, cantidad);
          }}
          esFavorito={favoritos.includes(productoModal.id)}
          onToggleFavorito={() => toggleFavorito(productoModal.id)}
          cantidadEnCarrito={
            carrito.find((item) => item.id === productoModal.id)?.cantidad || 0
          }
        />
      )}

      <Footer />
    </div>
  );
}
