// types.ts
export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  valoracion: number;
  resenas: number;
  galeria?: string[];
  // Nuevas propiedades
  isNew?: boolean;
  isOnSale?: boolean;
  discount?: number;
  isBestSeller?: boolean;
  hasFreeShipping?: boolean;
  precioOriginal?: number;
}

export interface ItemCarrito extends Producto {
  cantidad: number;
}

export interface Categoria {
  id: string;
  nombre: string;
}

export interface Resena {
  id: number;
  usuario: string;
  valoracion: number;
  comentario: string;
  fecha: string;
  imagen?: string;
}

export interface ResenaUsuario {
  productoId: number;
  usuario: string;
  valoracion: number;
  comentario: string;
  fecha: string;
  imagen?: string;
}

// Interfaces para pedidos
export interface Pedido {
  id: string;
  fecha: string;
  productos: ItemCarrito[];
  subtotal: number;
  descuento: number;
  envio: number;
  total: number;
  estado: "completado" | "procesando" | "enviado" | "entregado";
  datosEnvio: {
    nombre: string;
    email: string;
    direccion: string;
    ciudad: string;
    codigoPostal: string;
    telefono: string;
  };
  metodoEnvio: {
    id: string;
    nombre: string;
    dias: string;
    precio: number;
  };
}

// Interface para ofertas
export interface Oferta {
  id: number;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
  productoId: number;
  descuento?: number;
  fechaFin?: string;
  colorFondo: string;
  colorTexto: string;
}
