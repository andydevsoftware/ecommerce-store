// components/Toast.tsx
import React, { useEffect } from "react";
import { CheckCircle, Heart, X, AlertCircle, ShoppingCart } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
  icon?: "cart" | "heart" | "default";
}

export default function Toast({
  message,
  type,
  onClose,
  duration = 3000,
  icon = "default",
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    if (icon === "cart") return <ShoppingCart className="w-5 h-5" />;
    if (icon === "heart") return <Heart className="w-5 h-5 fill-current" />;

    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-orange-50 border-orange-200 text-orange-800";
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  return (
    <div
      className={`fixed top-20 right-4 z-100 max-w-sm w-full animate-slide-in-right ${getStyles()} border-2 rounded-lg shadow-lg p-4`}
    >
      <div className="flex items-start space-x-3">
        <div className="shrink-0">{getIcon()}</div>
        <p className="flex-1 font-medium text-sm">{message}</p>
        <button
          onClick={onClose}
          className="shrink-0 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Hook para manejar toasts
export function useToast() {
  const [toasts, setToasts] = React.useState<
    Array<{
      id: number;
      message: string;
      type: ToastType;
      icon?: "cart" | "heart" | "default";
    }>
  >([]);

  const showToast = (
    message: string,
    type: ToastType = "success",
    icon?: "cart" | "heart" | "default"
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, icon }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, showToast, removeToast };
}
