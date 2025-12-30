// components/ShareButtons.tsx
import React, { useState } from "react";
import {
  Share2,
  Facebook,
  Twitter,
  MessageCircle,
  Link2,
  Check,
} from "lucide-react";
import { Producto } from "../app/types";

interface ShareButtonsProps {
  producto: Producto;
  className?: string;
}

export default function ShareButtons({
  producto,
  className = "",
}: ShareButtonsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const title = `¡Mira este producto: ${producto.nombre}!`;
  const description = producto.descripcion;

  const handleShare = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `${title} - ${url}`
        )}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          setShowMenu(false);
        }, 2000);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
      setShowMenu(false);
    }
  };

  // Native share API (for mobile devices)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: producto.nombre,
          text: description,
          url: url,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log("Share cancelled");
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleNativeShare}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Compartir</span>
      </button>

      {showMenu && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />

          {/* Share menu */}
          <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 min-w-50 animate-fade-in-up">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Compartir producto
            </p>

            <div className="space-y-2">
              <button
                onClick={() => handleShare("facebook")}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600"
              >
                <Facebook className="w-5 h-5" />
                <span className="text-sm font-medium">Facebook</span>
              </button>

              <button
                onClick={() => handleShare("twitter")}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-sky-50 transition-colors text-gray-700 hover:text-sky-600"
              >
                <Twitter className="w-5 h-5" />
                <span className="text-sm font-medium">Twitter</span>
              </button>

              <button
                onClick={() => handleShare("whatsapp")}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors text-gray-700 hover:text-green-600"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">WhatsApp</span>
              </button>

              <button
                onClick={() => handleShare("copy")}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      ¡Copiado!
                    </span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Copiar enlace</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
