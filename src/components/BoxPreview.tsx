import { Card } from "@/components/ui/card";
import { Package, StickyNote } from "lucide-react";

interface BoxPreviewProps {
  color: string;
  message: string;
}

const COLOR_MAP: Record<string, { bg: string; shadow: string; label: string }> =
  {
    rojo: {
      bg: "bg-red-600",
      shadow: "shadow-red-500/50",
      label: "Rojo Elegante",
    },
    azul: {
      bg: "bg-blue-600",
      shadow: "shadow-blue-500/50",
      label: "Azul Cielo",
    },
    dorado: {
      bg: "bg-yellow-600",
      shadow: "shadow-yellow-500/50",
      label: "Dorado Especial",
    },
  };

export const BoxPreview = ({ color, message }: BoxPreviewProps) => {
  const selectedColor = COLOR_MAP[color] || {
    bg: "bg-muted",
    shadow: "",
    label: "Selecciona un color",
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-muted/30 to-background w-full h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2">Vista Previa de tu Caja</h3>
        <p className="text-base text-muted-foreground">{selectedColor.label}</p>
      </div>

      <div className="relative aspect-square w-full max-w-md mx-auto">
        {/* Caja 3D */}
        <div className="relative w-full h-full perspective-1000">
          {/* Tapa de la caja */}
          <div
            className={`absolute inset-0 ${selectedColor.bg} rounded-lg transform transition-all duration-500 hover:scale-105 ${selectedColor.shadow} shadow-2xl`}
            style={{
              transform: "rotateX(15deg) rotateY(-10deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>

            {/* Ribbon/Lazo decorativo */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Package className="w-24 h-24 text-white/40" strokeWidth={1.5} />
            </div>

            {/* Bordes para efecto 3D */}
            <div className="absolute inset-0 border-4 border-white/10 rounded-lg"></div>
          </div>

          {/* Sombra de la caja */}
        </div>

        {/* Notita adhesiva */}
        {message && (
          <div
            className="absolute -right-4 -top-4 w-32 h-32 bg-yellow-100 shadow-lg transform rotate-12 transition-all duration-300 hover:rotate-6 hover:scale-105"
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <div className="absolute top-2 left-2 right-2">
              <StickyNote className="w-5 h-5 text-yellow-600/30 mb-1" />
              <p className="text-xs text-gray-700 font-handwriting leading-tight break-words">
                {message}
              </p>
            </div>
            {/* Efecto de papel adhesivo */}
            <div className="absolute top-0 left-1/2 w-8 h-3 bg-yellow-200/50 transform -translate-x-1/2"></div>
          </div>
        )}
      </div>

      {!color && (
        <div className="text-center mt-6 text-sm text-muted-foreground">
          👆 Selecciona un color arriba para ver tu caja personalizada
        </div>
      )}
    </Card>
  );
};
