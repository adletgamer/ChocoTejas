import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { PersonalizationModal } from "@/components/PersonalizationModal";
import chocotejaOreo from "@/assets/chocoteja-oreo.jpg";
import chocotejaAlmendras from "@/assets/chocoteja-almendras.jpg";
import chocotejaFrutosSecos from "@/assets/chocoteja-frutos-secos.jpg";
import chocotejaClasica from "@/assets/chocoteja-clasica.jpg";
import { Header } from "@/components/Header";

const PRODUCTS = [
  {
    id: "oreo",
    name: "Chocoteja Oreo",
    description: "Delicioso chocolate con trozos de galleta Oreo crujiente",
    price: 25.0,
    image: chocotejaOreo,
  },
  {
    id: "almendras",
    name: "Chocoteja de Frutos Rojos",
    description:
      "Chocolate premium con pecanas tostadas seleccionadasy frutos rojos organicos",
    price: 28.0,
    image: chocotejaAlmendras,
  },
  {
    id: "frutos-secos",
    name: "Chocoteja de Frutos Secos",
    description: "Mezcla especial de frutos secos y chocolate artesanal",
    price: 30.0,
    image: chocotejaFrutosSecos,
  },
  {
    id: "clasica",
    name: "Chocoteja de Aguaymantos",
    description: "Una mezcla amazonica con sabores exoticos que todos aman",
    price: 22.0,
    image: chocotejaClasica,
  },
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof PRODUCTS)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = (product: (typeof PRODUCTS)[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      <section id="productos" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestros{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Sabores
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada chocoteja es elaborada artesanalmente con ingredientes de
              primera calidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onOrderClick={handleOrderClick}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="Nosotros" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="space-y-3">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold">Personalización Total</h3>
              <p className="text-muted-foreground">
                Elige el color de la caja y añade tu mensaje especial
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold">Calidad Premium</h3>
              <p className="text-muted-foreground">
                Ingredientes seleccionados y elaboración artesanal
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold">Entrega Rápida</h3>
              <p className="text-muted-foreground">
                Llevamos tus chocotejas frescas a tu puerta
              </p>
            </div>
          </div>
        </div>
      </section>

      <PersonalizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Index;
