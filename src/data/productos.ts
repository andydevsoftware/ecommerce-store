// data/productos.ts
import { Producto, Categoria } from "../app/types";

export const CATEGORIAS: Categoria[] = [
  { id: "todas", nombre: "Todo" },
  { id: "hombres", nombre: "Hombre" },
  { id: "mujeres", nombre: "Mujer" },
  { id: "bebes", nombre: "Bebé" },
  { id: "accesorios", nombre: "Accesorios" },
];

export const PRODUCTOS: Producto[] = [
  // MODA HOMBRES
  {
    id: 1,
    nombre: "Polo Blanco Básico",
    categoria: "hombres",
    precio: 34.99,
    descripcion:
      "Polo de algodón con corte regular. Elegante casual para cualquier ocasión, tacto suave y duradero.",
    imagen:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop&q=80",
    stock: 28,
    valoracion: 4.5,
    resenas: 91,
  },
  {
    id: 2,
    nombre: "Conjunto Casual Verano",
    categoria: "hombres",
    precio: 59.99,
    descripcion:
      "Polo de corte oversized con estampado, perfecto para un estilo relajado y moderno en días de verano.",
    imagen:
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&h=800&fit=crop&q=80",
    stock: 22,
    valoracion: 4.7,
    resenas: 134,
  },
  {
    id: 3,
    nombre: "Camisa Oxford de Rayas Azul",
    categoria: "hombres",
    precio: 45.99,
    descripcion:
      "Camisa clásica Oxford de 100% algodón con diseño de rayas, perfecta para ocasiones formales o informales.",
    imagen:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop&q=80",
    stock: 15,
    valoracion: 4.7,
    resenas: 89,
  },
  {
    id: 4,
    nombre: "Sudadera blanca con Cuello Redondo",
    categoria: "hombres",
    precio: 79.99,
    descripcion:
      "Sudadera de manga larga con cuello redondo, perfecta para un look casual y cómodo en climas frescos.",
    imagen:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop&q=80",
    stock: 22,
    valoracion: 4.8,
    resenas: 134,
  },
  {
    id: 5,
    nombre: "Pantalón Chino Beige",
    categoria: "hombres",
    precio: 69.99,
    descripcion:
      "Pantalón chino en color beige, de corte slim, ideal para un estilo casual y sofisticado.",
    imagen:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=800&fit=crop&q=80",
    stock: 18,
    valoracion: 4.6,
    resenas: 76,
  },
  {
    id: 6,
    nombre: "Chaqueta Bomber Naranja",
    categoria: "hombres",
    precio: 89.99,
    descripcion:
      "Chaqueta bomber de color naranja, ligera y moderna, perfecta para complementar cualquier atuendo urbano",
    imagen:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&q=80",
    stock: 12,
    valoracion: 4.9,
    resenas: 142,
  },
  {
    id: 7,
    nombre: "Jeans Slim Fit Azul Oscuro",
    categoria: "hombres",
    precio: 54.99,
    descripcion:
      "Jeans de corte slim fit en color azul oscuro, clásicos y versátiles, perfectos para cualquier ocasión.",
    imagen:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop&q=80",
    stock: 30,
    valoracion: 4.6,
    resenas: 156,
  },
  {
    id: 8,
    nombre: "Sudadera con Capucha Gris",
    categoria: "hombres",
    precio: 39.99,
    descripcion:
      "Sudadera de algodón con capucha y bolsillo canguro. Cómoda y casual, perfecta para el día a día.Sudadera de tejido suave en gris, con capucha ajustable y bolsillo tipo canguro. Perfecta para días relajados o deportivos.",
    imagen:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&q=80",
    stock: 35,
    valoracion: 4.8,
    resenas: 201,
  },

  // MODA MUJERES
  {
    id: 9,
    nombre: "Vestido Playero de Muselina",
    categoria: "mujeres",
    precio: 48.99,
    descripcion:
      "Vestido ligero de muselina con estampado floral, perfecto para un día de verano en la playa o una salida informal.",
    imagen:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=800&fit=crop&q=80",
    stock: 20,
    valoracion: 4.7,
    resenas: 145,
  },
  {
    id: 10,
    nombre: "Pareo Estampado Azul",
    categoria: "mujeres",
    precio: 59.95,
    descripcion:
      "Pareo de playa con estampado azul mediterráneo. Versátil y elegante, ideal para complementar tu look playero.",
    imagen:
      "https://www.dulzamara.com/cdn/shop/files/PAREO_BARU_3.png?v=1755538209&width=1445",
    stock: 25,
    valoracion: 4.6,
    resenas: 98,
  },
  {
    id: 11,
    nombre: "Bikini Negro Triángulo",
    categoria: "mujeres",
    precio: 55.88,
    descripcion:
      "Bikini clásico de triángulo en color negro. Diseño atemporal y favorecedor, calidad premium.",
    imagen: "https://laflorazul.es/wp-content/uploads/2023/05/negro-5-1.jpg",
    stock: 18,
    valoracion: 4.8,
    resenas: 167,
  },
  {
    id: 12,
    nombre: "Chaqueta de Cuero Negra",
    categoria: "mujeres",
    precio: 88.99,
    descripcion:
      "Chaqueta de cuero negra con corte moderno y detalles elegantes. Ideal para un look sofisticado y atrevido.",
    imagen:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop&q=80",
    stock: 15,
    valoracion: 4.9,
    resenas: 203,
  },
  {
    id: 13,
    nombre: "Bikini Estampado Leopardo",
    categoria: "mujeres",
    precio: 69.95,
    descripcion:
      "Bikini triangular con estampado animal print. Trendy y atrevido, perfecto para destacar en la playa.",
    imagen:
      "data:image/jpeg;base64,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",
    stock: 22,
    valoracion: 4.7,
    resenas: 134,
  },
  {
    id: 14,
    nombre: "Bolso de Mano Turquesa",
    categoria: "mujeres",
    precio: 79.99,
    descripcion:
      "Elegante bolso de mano en color turquesa, ideal para ocasiones especiales y perfectos para complementar cualquier look.",
    imagen:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=800&fit=crop&q=80",
    stock: 12,
    valoracion: 4.8,
    resenas: 189,
  },
  {
    id: 15,
    nombre: "Saco de Estilo Elegante",
    categoria: "mujeres",
    precio: 52.99,
    descripcion:
      "Saco con diseño elegante y manga larga, perfecto para un look profesional y sofisticado en la oficina.",
    imagen:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&h=800&fit=crop&q=80",
    stock: 20,
    valoracion: 4.8,
    resenas: 156,
  },
  {
    id: 16,
    nombre: "Conjunto Deportivo Amarillo",
    categoria: "mujeres",
    precio: 89.99,
    descripcion:
      " Conjunto de top y pantalones de corte relajado en color amarillo. Perfecto para un look casual y cómodo en verano.",
    imagen:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=800&fit=crop&q=80",
    stock: 15,
    valoracion: 4.9,
    resenas: 203,
  },
  {
    id: 17,
    nombre: "Pantalón Palazzo Rosa Pastel",
    categoria: "mujeres",
    precio: 64.99,
    descripcion:
      "Pantalón palazzo de corte fluido, ideal para ocasiones elegantes y combinable con diversas prendas.",
    imagen:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop&q=80",
    stock: 25,
    valoracion: 4.7,
    resenas: 118,
  },
  {
    id: 18,
    nombre: "Suéter de Punto Beige Corto",
    categoria: "mujeres",
    precio: 29.99,
    descripcion:
      "Suéter crop de punto suave en color beige, ideal para un look casual y acogedor en días frescos.",
    imagen:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=800&fit=crop&q=80",
    stock: 32,
    valoracion: 4.6,
    resenas: 87,
  },
  {
    id: 19,
    nombre: "Vestido Denim Mujer",
    categoria: "mujeres",
    precio: 99.99,
    descripcion:
      "Vestido denim estilo oversize con botones frontales. Fresco, cómodo y perfecto para un look casual o urbano.",
    imagen:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&h=800&fit=crop&q=80",
    stock: 14,
    valoracion: 4.9,
    resenas: 167,
  },

  // MODA BEBÉ
  {
    id: 20,
    nombre: "Mameluco Peluche Oso Bebé",
    categoria: "bebes",
    precio: 24.99,
    descripcion:
      "Mameluco acolchado con textura suave tipo peluche y capucha con orejitas. Abrigado y cómodo para tu bebé, ideal para días fríos.",
    imagen:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&h=800&fit=crop&q=80",
    stock: 30,
    valoracion: 4.9,
    resenas: 234,
  },
  {
    id: 21,
    nombre: "Short Denim Claro para Bebé Niña",
    categoria: "bebes",
    precio: 19.99,
    descripcion:
      "Short de mezclilla suave con cintura elástica. Cómodo y práctico para el verano, perfecto para jugar.Short denim claro con cintura elástica para mayor comodidad. Perfecto para jugar, correr y disfrutar del verano.",
    imagen:
      "https://www.epkpanama.com/cdn/shop/files/dfb38799b0419296e704d03bf8f79390.png?v=1764108639&width=1080",
    stock: 35,
    valoracion: 4.7,
    resenas: 156,
  },
  {
    id: 22,
    nombre: "Cárdigan Azul Marino",
    categoria: "bebes",
    precio: 22.99,
    descripcion:
      "Cárdigan tejido azul marino con detalles celestes. Ligero y cómodo para días frescos, perfecto para combinaciones casuales.",
    imagen:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&h=800&fit=crop&q=80",
    stock: 28,
    valoracion: 4.8,
    resenas: 189,
  },
  {
    id: 23,
    nombre: "Camiseta Básica Blanca Henley",
    categoria: "bebes",
    precio: 14.99,
    descripcion:
      "Camiseta blanca con cuello henley y botones frontales. Suave y versátil, ideal para usar sola o combinar con prendas exteriores.",
    imagen: "https://m.media-amazon.com/images/I/61R-2F5EyaL._AC_SX679_.jpg",
    stock: 45,
    valoracion: 4.6,
    resenas: 201,
  },
  {
    id: 24,
    nombre: "Vestido Lila Fruncido Bebé",
    categoria: "bebes",
    precio: 29.99,
    descripcion:
      "Vestido con mangas abullonadas y fruncido en el pecho. Diseño dulce y femenino en tono lila suave.",
    imagen:
      "https://www.taisprincess.com.pe/wp-content/uploads/2023/06/1677821899fe43eea51abccc1be603f0.jpg",
    stock: 22,
    valoracion: 4.9,
    resenas: 178,
  },
  {
    id: 25,
    nombre: "Sudadera Stitch Bebé",
    categoria: "bebes",
    precio: 34.99,
    descripcion:
      "Sudadera de algodón con estampado de Stitch. Suave y cálida, perfecta para los días frescos.",
    imagen:
      "https://www.vertbaudet.es/fstrz/r/s/media.vertbaudet.es/Pictures/vertbaudet/469001/sudadera-con-capucha-disney-stitch.jpg?width=800",
    stock: 40,
    valoracion: 4.8,
    resenas: 267,
  },
  {
    id: 26,
    nombre: "Camiseta Stitch Blanca Bebé",
    categoria: "bebes",
    precio: 19.99,
    descripcion:
      "Camiseta de algodón con estampado grande de Stitch. Divertida y cómoda para el día a día.",
    imagen:
      "https://i5.walmartimages.com/asr/4d0b1c9e-69d2-41ed-8b58-4153d8d06d58.24f4abfaf700b33a77d77d155c8b0557.webp?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    stock: 38,
    valoracion: 4.7,
    resenas: 198,
  },
  {
    id: 27,
    nombre: "Conjunto Deportivo Bebé",
    categoria: "bebes",
    precio: 32.99,
    descripcion:
      "Set de sudadera y pantalón deportivo. Cómodo y resistente, perfecto para jugar y actividades.",
    imagen:
      "https://www.vertbaudet.es/fstrz/r/s/media.vertbaudet.es/Pictures/vertbaudet/526357/conjunto-deportivo-sudadera-con-capucha-y-cremallera-pantalon-de-chandal-bebe.jpg?width=800",
    stock: 30,
    valoracion: 4.8,
    resenas: 124,
  },
  {
    id: 28,
    nombre: "Conjunto Beige Casual Bebé",
    categoria: "bebes",
    precio: 36.99,
    descripcion:
      "Set de camiseta y shorts en tono beige neutro. Minimalista y moderno, perfecto para cualquier ocasión.",
    imagen: "https://m.media-amazon.com/images/I/71+AVKSQAvL._AC_SX679_.jpg",
    stock: 26,
    valoracion: 4.6,
    resenas: 145,
  },
  {
    id: 29,
    nombre: "Blusa Rosa Bordada Bebé",
    categoria: "bebes",
    precio: 27.99,
    descripcion:
      "Blusa con detalles de bordado inglés. Delicada y romántica en tono rosa empolvado suave.",
    imagen:
      "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/29d614547959126a43f4094866ee4d32.jpg?imageView2/2/w/800/q/70/format/avif",
    stock: 24,
    valoracion: 4.9,
    resenas: 156,
  },

  // ACCESORIOS
  {
    id: 30,
    nombre: "Gorra Dad Hat Classic",
    categoria: "accesorios",
    precio: 24.99,
    descripcion:
      "Gorra estilo dad hat con diseño minimalista. Ajustable y cómoda para uso diario.",
    imagen:
      "https://4biddenskateshop.com/cdn/shop/files/Gorra_Betta_x_4bidden_Classic_Collab_Marron.png?v=1756511267&width=690",
    stock: 45,
    valoracion: 4.7,
    resenas: 234,
  },
  {
    id: 31,
    nombre: "Mochila Urbana Impermeable",
    categoria: "accesorios",
    precio: 64.99,
    descripcion:
      "Mochila con compartimentos organizadores y puerto USB. Resistente al agua, diseño moderno.",
    imagen:
      "https://oechsle.vteximg.com.br/arquivos/ids/21490666-1000-1000/1670973375891_1.jpg?v=638869095874900000",
    stock: 22,
    valoracion: 4.8,
    resenas: 298,
  },
  {
    id: 32,
    nombre: "Lentes de Sol Aviador",
    categoria: "accesorios",
    precio: 49.99,
    descripcion:
      "Lentes aviador con protección UV400 y marco metálico. Estilo clásico y atemporal.",
    imagen:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop&q=80",
    stock: 35,
    valoracion: 4.6,
    resenas: 187,
  },
  {
    id: 33,
    nombre: "Bolso Crossbody Minimalista",
    categoria: "accesorios",
    precio: 39.99,
    descripcion:
      "Bolso cruzado de cuero sintético premium. Compacto y elegante, perfecto para lo esencial.",
    imagen:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop&q=80",
    stock: 28,
    valoracion: 4.9,
    resenas: 421,
  },
  {
    id: 34,
    nombre: "Cinturón Lona Casual",
    categoria: "accesorios",
    precio: 19.99,
    descripcion:
      "Cinturón de lona con hebilla metálica. Ajustable y resistente, varios colores disponibles.",
    imagen: "https://images.nexusapp.co/assets/57/5a/d0/291001457.jpg",
    stock: 50,
    valoracion: 4.5,
    resenas: 156,
  },
  {
    id: 35,
    nombre: "Reloj Minimalista Negro",
    categoria: "accesorios",
    precio: 89.99,
    descripcion:
      "Reloj de pulsera con diseño minimalista. Correa de cuero y esfera negra, elegante y versátil.",
    imagen:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=800&fit=crop&q=80",
    stock: 20,
    valoracion: 4.8,
    resenas: 312,
  },
  {
    id: 36,
    nombre: "Bufanda de Lana Gris",
    categoria: "accesorios",
    precio: 34.99,
    descripcion:
      "Bufanda tejida de lana suave. Cálida y elegante, perfecta para el invierno.",
    imagen:
      "https://lesjardinsdelacomtesse.es/cdn/shop/files/ECN-06D-portevueduhaut1400x1400-compresssite.jpg?v=1704211860&width=990",
    stock: 32,
    valoracion: 4.7,
    resenas: 189,
  },
  {
    id: 37,
    nombre: "Billetera de Cuero Marrón",
    categoria: "accesorios",
    precio: 44.99,
    descripcion:
      "Billetera de cuero genuino con múltiples compartimentos. Clásica y duradera, perfecta para uso diario.",
    imagen:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop&q=80",
    stock: 25,
    valoracion: 4.9,
    resenas: 267,
  },
  {
    id: 38,
    nombre: "Pulsera Trenzada Cuero",
    categoria: "accesorios",
    precio: 16.99,
    descripcion:
      "Pulsera de cuero trenzado con cierre magnético. Casual y elegante, perfecto para cualquier look.",
    imagen: "https://m.media-amazon.com/images/I/61e7-L5RVuL._AC_SL500_.jpg",
    stock: 60,
    valoracion: 4.6,
    resenas: 234,
  },
  {
    id: 39,
    nombre: "Calcetines Deportivos Pack x3",
    categoria: "accesorios",
    precio: 12.99,
    descripcion:
      "Pack de 3 pares de calcetines deportivos. Transpirables y cómodos, con soporte en el arco.",
    imagen:
      "https://rimage.ripley.com.pe/home.ripley/Attachment/WOP/1/2006292593921/full_image-2006292593921",
    stock: 70,
    valoracion: 4.5,
    resenas: 345,
  },
  {
    id: 40,
    nombre: "Gorra Trucker Mesh",
    categoria: "accesorios",
    precio: 27.99,
    descripcion:
      "Gorra trucker con parte trasera de malla. Fresca y deportiva, ajuste snapback.",
    imagen:
      "https://s.alicdn.com/@sc04/kf/He21777b40c804cdaa8c924c0547a6ec13/Embroidery-Sublimation-Print-5-Panel-Hat-Custom-Logo-Advertising-Trucker-Snapback-Hat-Custom-Printed-Logo-Men-Trucker-Hat-Custom.jpg_300x300.jpg",
    stock: 40,
    valoracion: 4.7,
    resenas: 178,
  },
];
