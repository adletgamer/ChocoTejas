import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ColorSelectorProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const MAIN_COLORS = [
  { 
    value: "rojo", 
    label: "Rojo Elegante", 
    bgClass: "bg-red-600",
    hoverClass: "hover:ring-red-600"
  },
  { 
    value: "azul", 
    label: "Azul Cielo", 
    bgClass: "bg-blue-600",
    hoverClass: "hover:ring-blue-600"
  },
  { 
    value: "dorado", 
    label: "Dorado Especial", 
    bgClass: "bg-yellow-600",
    hoverClass: "hover:ring-yellow-600"
  },
];

export const ColorSelector = ({ selectedColor, onColorChange }: ColorSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">Elige el Color de tu Caja</Label>
      <div className="grid grid-cols-3 gap-4">
        {MAIN_COLORS.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onColorChange(color.value)}
            className={cn(
              "relative group flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300",
              selectedColor === color.value
                ? "border-primary shadow-soft scale-105"
                : "border-border hover:border-primary/50",
              color.hoverClass
            )}
          >
            {/* Color circle */}
            <div className="relative">
              <div 
                className={cn(
                  "w-16 h-16 rounded-full transition-transform duration-300 group-hover:scale-110",
                  color.bgClass,
                  "shadow-lg"
                )}
              >
                {selectedColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Label */}
            <span className={cn(
              "text-sm font-medium text-center transition-colors",
              selectedColor === color.value ? "text-primary" : "text-muted-foreground"
            )}>
              {color.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
