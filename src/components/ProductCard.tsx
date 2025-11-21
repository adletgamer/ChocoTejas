import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onOrderClick: (product: { id: string; name: string; price: number; image: string }) => void;
}

export const ProductCard = ({ id, name, description, price, image, onOrderClick }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-soft transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-foreground">{name}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          S/ {price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full group-hover:shadow-card transition-all duration-300"
          onClick={() => onOrderClick({ id, name, price, image })}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Personalizar y Pedir
        </Button>
      </CardFooter>
    </Card>
  );
};
