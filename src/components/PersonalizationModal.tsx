import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { BoxPreview } from "./BoxPreview";
import { ColorSelector } from "./ColorSelector";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Phone, MapPin, PenLine, ShoppingBag } from "lucide-react";

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

export const PersonalizationModal = ({
  isOpen,
  onClose,
  product,
}: PersonalizationModalProps) => {
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
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-primary">
            Personaliza tu Pedido
          </DialogTitle>
          <DialogDescription className="text-lg">
            {product.name} -{" "}
            <span className="font-semibold text-primary">
              S/ {product.price.toFixed(2)}
            </span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 py-4">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Vista Previa */}
            <div className="order-2 lg:order-1 bg-secondary/20 rounded-xl p-6 flex items-center justify-center">
              <BoxPreview
                color={boxColor}
                message={includeNote ? message : ""}
              />
            </div>

            {/* Opciones de Personalización */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <Label
                  htmlFor="quantity"
                  className="text-base font-semibold flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Cantidad
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="mt-2"
                />
              </div>

              <div className="bg-card p-4 rounded-lg border shadow-sm">
                <ColorSelector
                  selectedColor={boxColor}
                  onColorChange={setBoxColor}
                />
              </div>

              <div className="bg-card p-4 rounded-lg border shadow-sm space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="includeNote"
                    checked={includeNote}
                    onCheckedChange={(checked) =>
                      setIncludeNote(checked as boolean)
                    }
                    className="w-5 h-5"
                  />
                  <Label
                    htmlFor="includeNote"
                    className="text-base font-semibold cursor-pointer flex items-center gap-2 select-none"
                  >
                    <PenLine className="w-4 h-4" /> ¿Deseas agregar una notita
                    especial?
                  </Label>
                </div>

                {/* Animación suave de altura usando grid */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    includeNote
                      ? "grid-rows-[1fr] opacity-100 pt-2"
                      : "grid-rows-[0fr] opacity-0 pt-0"
                  }`}
                >
                  <div className="overflow-hidden px-1">
                    <Textarea
                      id="message"
                      placeholder="Escribe tu mensaje especial aquí... (máx. 150 caracteres)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={150}
                      rows={4}
                      className="resize-none rounded-xl border-muted-foreground/20 focus-visible:ring-primary/20 shadow-sm bg-background"
                    />
                    <div className="flex justify-end mt-1">
                      <span
                        className={`text-xs ${
                          message.length > 140
                            ? "text-red-500 font-bold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.length}/150 caracteres
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t space-y-5">
                <h3 className="font-semibold text-xl flex items-center gap-2 text-primary">
                  Datos de Contacto
                </h3>

                <div className="space-y-4">
                  <div className="relative">
                    <Label htmlFor="customerName" className="mb-1.5 block">
                      Nombre Completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="customerName"
                        type="text"
                        placeholder="Juan Pérez"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="customerPhone" className="mb-1.5 block">
                      Teléfono
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="customerPhone"
                        type="tel"
                        placeholder="999 888 777"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="customerAddress" className="mb-1.5 block">
                      Dirección de Entrega
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="customerAddress"
                        placeholder="Av. Principal 123, Miraflores, Lima"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        required
                        rows={2}
                        className="pl-9 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t bg-secondary/10 -mx-6 -mb-6 p-6 mt-4">
            <div className="flex justify-between items-center mb-4 max-w-md ml-auto">
              <span className="text-lg font-medium text-muted-foreground">
                Total a pagar:
              </span>
              <span className="text-3xl font-bold text-primary">
                S/ {((product.price || 0) * quantity).toFixed(2)}
              </span>
            </div>
            <Button
              type="submit"
              className="w-full text-lg h-12 shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              Confirmar Pedido
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
