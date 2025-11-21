import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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

const BOX_COLORS = [
  { value: "rojo", label: "Rojo Elegante", color: "bg-red-600" },
  { value: "azul", label: "Azul Cielo", color: "bg-blue-600" },
  { value: "verde", label: "Verde Menta", color: "bg-green-600" },
  { value: "dorado", label: "Dorado Especial", color: "bg-yellow-600" },
  { value: "rosa", label: "Rosa Romántico", color: "bg-pink-600" },
  { value: "negro", label: "Negro Premium", color: "bg-gray-900" },
];

export const PersonalizationModal = ({ isOpen, onClose, product }: PersonalizationModalProps) => {
  const [boxColor, setBoxColor] = useState("");
  const [message, setMessage] = useState("");
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
      message: message || "Sin mensaje",
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
    setQuantity(1);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Personaliza tu Pedido</DialogTitle>
          <DialogDescription>
            {product.name} - S/ {product.price.toFixed(2)}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="quantity">Cantidad</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="boxColor">Color de Caja</Label>
                <Select value={boxColor} onValueChange={setBoxColor}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecciona un color" />
                  </SelectTrigger>
                  <SelectContent>
                    {BOX_COLORS.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded ${color.color}`}></div>
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Mensaje Personalizado (Opcional)</Label>
                <Textarea
                  id="message"
                  placeholder="Escribe un mensaje especial (máx. 150 caracteres)"
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
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Datos de Contacto</h3>
              
              <div>
                <Label htmlFor="customerName">Nombre Completo</Label>
                <Input
                  id="customerName"
                  type="text"
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
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  required
                  rows={3}
                  className="mt-2"
                />
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
