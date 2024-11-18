import { ArrowRight, Gift, Palette, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Presentes Únicos",
      description: "Cada produto é cuidadosamente personalizado para tornar seu presente especial.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design Personalizado",
      description: "Crie seu próprio design ou escolha entre nossas opções exclusivas.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Feito com Amor",
      description: "Produtos artesanais feitos com dedicação e carinho.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-white py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary leading-tight">
              Presentes que Tocam o Coração
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Transforme momentos especiais em memórias eternas com nossas canecas personalizadas.
            </p>
            <div className="pt-4">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-4 bg-secondary text-white rounded-full font-medium hover:bg-secondary/90 transition-colors gap-2 shadow-lg hover:shadow-xl"
              >
                Ver Produtos
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-background/50 hover:bg-background transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-secondary mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-secondary">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8">
            Pronto para Criar Algo Especial?
          </h2>
          <Link
            to="/customize"
            className="inline-flex items-center px-8 py-4 bg-primary text-secondary rounded-full font-medium hover:bg-primary/90 transition-colors gap-2 shadow-lg hover:shadow-xl"
          >
            Começar a Personalizar
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;