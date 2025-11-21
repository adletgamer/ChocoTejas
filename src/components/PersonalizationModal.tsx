import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { BoxPreview } from "./BoxPreview";
import { ColorSelector } from "./ColorSelector";
import { Checkbox } from "@/components/ui/checkbox";

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  } | null;
}

export const PersonalizationModal = ({ isOpen, onClose, product }: PersonalizationModalProps) => {
  const [boxColor, setBoxColor] = useState("");
  const [message, setMessage] = useState("");
  const [includeNote, setIncludeNote] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!boxColor) {
      toast.error("Por favor selecciona un color de caja");
      return;
    }

    if (!customerName || !customerPhone || !customerAddress) {
      toast.error("Por favor completa todos los datos de contacto");
      return;
    }

    if (message.length > 150) {
      toast.error("El mensaje no puede superar los 150 caracteres");
      return;
    }

    const orderData = {
      product: product?.name,
      boxColor,
      message: includeNote ? message : "Sin mensaje",
      quantity,
      total: (product?.price || 0) * quantity,
      customerName,
      customerPhone,
      customerAddress,
      date: new Date().toISOString(),
    };

    console.log("Pedido realizado:", orderData);
    
    toast.success("¡Pedido realizado con éxito!", {
      description: `Te contactaremos al ${customerPhone} para confirmar tu pedido.`,
    });

    // Reset form
    setBoxColor("");
    setMessage("");
    setIncludeNote(false);
    setQuantity(1);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Personaliza tu Pedido</DialogTitle>
          <DialogDescription>
            {product.name} - S/ {product.price.toFixed(2)}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vista Previa */}
            <div className="order-2 lg:order-1">
              <BoxPreview color={boxColor} message={includeNote ? message : ""} />
            </div>

            {/* Opciones de Personalización */}
            <div className="space-y-6 order-1 lg:order-2">
              <div>
                <Label htmlFor="quantity" className="text-base font-semibold">Cantidad</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="mt-2"
                />
              </div>

              <ColorSelector selectedColor={boxColor} onColorChange={setBoxColor} />

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="includeNote" 
                    checked={includeNote}
                    onCheckedChange={(checked) => setIncludeNote(checked as boolean)}
                  />
                  <Label 
                    htmlFor="includeNote" 
                    className="text-base font-semibold cursor-pointer"
                  >
                    ¿Deseas agregar una notita especial? 📝
                  </Label>
                </div>
                
                {includeNote && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <Textarea
                      id="message"
                      placeholder="Escribe tu mensaje especial aquí... (máx. 150 caracteres)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={150}
                      rows={4}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.length}/150 caracteres
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t space-y-4">
                <h3 className="font-semibold text-lg">Datos de Contacto</h3>
                
                <div>
                  <Label htmlFor="customerName">Nombre Completo</Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder="Juan Pérez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="customerPhone">Teléfono</Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    placeholder="999 888 777"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="customerAddress">Dirección de Entrega</Label>
                  <Textarea
                    id="customerAddress"
                    placeholder="Av. Principal 123, Miraflores, Lima"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    required
                    rows={2}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                S/ {((product.price || 0) * quantity).toFixed(2)}
              </span>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Confirmar Pedido
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
