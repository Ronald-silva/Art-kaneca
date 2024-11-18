// src/pages/Products.tsx
import { ShoppingBag, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../components/ui/use-toast";

const Products = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const products = [
    {
      id: 1,
      name: "Caneca Personalizada",
      description: "Caneca de cerâmica para sua arte ou mensagem",
      price: 39.90,
      image: "/images/products/standard-mug.png"
    },
    {
      id: 2,
      name: "Caneca Mágica",
      description: "Revela a arte de sua caneca com bebida quente",
      price: 49.90,
      image: "/images/products/magic-mug.png"
    },
    {
      id: 3,
      name: "Caneca com Frase",
      description: "Ideal para presentear com mensagem especial",
      price: 34.90,
      image: "/images/products/custom-mug.png"
    },
    {
      id: 4,
      name: "Kit Presente",
      description: "Caneca personalizada com embalagem decorativa",
      price: 59.90,
      image: "/images/products/gift-box.png"
    }
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    addItem(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-secondary mb-4">
            Nossos Produtos
          </h1>
          <p className="text-lg text-textColor/80 max-w-2xl mx-auto">
            Cada peça é cuidadosamente personalizada para tornar seu presente único e especial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-square relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair font-semibold text-xl text-secondary mb-2">
                  {product.name}
                </h3>
                <p className="text-textColor/70 text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-secondary font-semibold">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-2 bg-primary text-secondary px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingBag size={18} />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/customize"
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-full hover:bg-secondary/90 transition-colors"
          >
            <Package size={20} />
            <span>Personalizar Agora</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;