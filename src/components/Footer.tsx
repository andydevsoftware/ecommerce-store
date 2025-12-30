// components/Footer.tsx
import Image from "next/image";
import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/favicon_logo.ico"
                alt="K&A Studio Logo"
                width={32}
                height={32}
                className="w-9 h-9"
              />{" "}
              <h3 className="text-xl font-bold">K&A Studio</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Tu destino para productos premium con la mejor calidad y servicio
              excepcional.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Comprar */}
          <div>
            <h4 className="font-bold mb-4">COMPRAR</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Todos los Productos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Electrónica
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Deportes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hogar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Accesorios
                </a>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="font-bold mb-4">AYUDA</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Seguimiento de Pedido
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Mi Cuenta
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold mb-4">CONTACTO</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span>
                  Calle Principal 123
                  <br />
                  Lima, Perú
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+51 900 123 456</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>hola@kastudio.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 K&A Studio. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-white transition-colors">
              Términos
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacidad
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Powered by K&A
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
