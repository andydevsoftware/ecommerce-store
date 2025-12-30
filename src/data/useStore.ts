// store/useStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ItemCarrito, Producto, ResenaUsuario, Pedido } from "../app/types";

interface StoreState {
  // Cart state
  carrito: ItemCarrito[];
  agregarAlCarrito: (producto: Producto, cantidad?: number) => void;
  quitarDelCarrito: (id: number) => void;
  eliminarDelCarrito: (id: number) => void;
  vaciarCarrito: () => void;

  // Favorites state
  favoritos: number[];
  toggleFavorito: (id: number) => void;

  // Reviews state
  resenasUsuario: ResenaUsuario[];
  agregarResena: (
    productoId: number,
    resena: Omit<ResenaUsuario, "productoId" | "fecha">
  ) => void;

  // Orders state
  pedidos: Pedido[];
  agregarPedido: (pedido: Pedido) => void;

  // UI state
  mostrarCarrito: boolean;
  setMostrarCarrito: (mostrar: boolean) => void;

  // Toast state
  toast: {
    show: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
    icon?: "cart" | "heart" | "default";
  };
  showToast: (
    message: string,
    type?: "success" | "error" | "info" | "warning",
    icon?: "cart" | "heart" | "default"
  ) => void;
  hideToast: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      carrito: [],
      favoritos: [],
      resenasUsuario: [],
      pedidos: [],
      mostrarCarrito: false,
      toast: {
        show: false,
        message: "",
        type: "success",
      },

      // Cart actions
      agregarAlCarrito: (producto, cantidad = 1) => {
        const { carrito, showToast } = get();
        const itemExistente = carrito.find((item) => item.id === producto.id);

        if (itemExistente) {
          const nuevaCantidad = itemExistente.cantidad + cantidad;
          if (nuevaCantidad <= producto.stock) {
            set({
              carrito: carrito.map((item) =>
                item.id === producto.id
                  ? { ...item, cantidad: nuevaCantidad }
                  : item
              ),
            });
            showToast(
              `${cantidad} ${producto.nombre} agregado(s) al carrito`,
              "success",
              "cart"
            );
          } else {
            showToast("No hay más stock disponible", "warning");
          }
        } else {
          if (cantidad <= producto.stock) {
            set({
              carrito: [...carrito, { ...producto, cantidad }],
            });
            showToast(
              `${cantidad} ${producto.nombre} agregado(s) al carrito`,
              "success",
              "cart"
            );
          } else {
            showToast("No hay suficiente stock disponible", "warning");
          }
        }
      },

      quitarDelCarrito: (id) => {
        const { carrito } = get();
        const item = carrito.find((item) => item.id === id);

        if (item && item.cantidad > 1) {
          set({
            carrito: carrito.map((item) =>
              item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
            ),
          });
        } else {
          set({
            carrito: carrito.filter((item) => item.id !== id),
          });
        }
      },

      eliminarDelCarrito: (id) => {
        set({
          carrito: get().carrito.filter((item) => item.id !== id),
        });
      },

      vaciarCarrito: () => {
        set({ carrito: [] });
      },

      // Favorites actions
      toggleFavorito: (id) => {
        const { favoritos, showToast } = get();

        if (favoritos.includes(id)) {
          set({ favoritos: favoritos.filter((favId) => favId !== id) });
          showToast("Eliminado de favoritos", "info");
        } else {
          set({ favoritos: [...favoritos, id] });
          showToast("Agregado a favoritos", "success", "heart");
        }
      },

      // Reviews actions
      agregarResena: (productoId, resena) => {
        const { resenasUsuario, showToast } = get();
        const nuevaResena: ResenaUsuario = {
          ...resena,
          productoId,
          fecha: new Date().toISOString().split("T")[0],
        };

        set({
          resenasUsuario: [...resenasUsuario, nuevaResena],
        });
        showToast("¡Reseña publicada con éxito!", "success");
      },

      // Orders actions
      agregarPedido: (pedido) => {
        const { pedidos } = get();
        set({
          pedidos: [pedido, ...pedidos],
        });
      },

      // UI actions
      setMostrarCarrito: (mostrar) => {
        set({ mostrarCarrito: mostrar });
      },

      // Toast actions
      showToast: (message, type = "success", icon = "default") => {
        set({
          toast: {
            show: true,
            message,
            type,
            icon,
          },
        });

        // Auto-hide after 3 seconds
        setTimeout(() => {
          get().hideToast();
        }, 3000);
      },

      hideToast: () => {
        set({
          toast: {
            ...get().toast,
            show: false,
          },
        });
      },
    }),
    {
      name: "ka-studio-store",
      partialize: (state) => ({
        carrito: state.carrito,
        favoritos: state.favoritos,
        resenasUsuario: state.resenasUsuario,
        pedidos: state.pedidos,
      }),
    }
  )
);
