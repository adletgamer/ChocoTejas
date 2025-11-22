import heroImage from "@/assets/hero-chocotejas.jpg";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("productos");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Chocotejas artesanales en caja elegante"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          Chocotejas{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Artesanales
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
          Personaliza tu regalo perfecto con nuestros sabores únicos y un
          mensaje especial
        </p>
        <Button
          size="lg"
          onClick={scrollToProducts}
          className="text-lg px-8 py-6 shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105"
        >
          Ver Sabores
        </Button>
      </div>
    </section>
  );
};
