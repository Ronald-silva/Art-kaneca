// src/pages/Cart.tsx
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { items, removeItem, updateQuantity } = useCart();

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-secondary mb-4">
            Meu Carrinho
          </h1>
          <p className="text-lg text-textColor/80 max-w-2xl mx-auto">
            Revise os itens no seu carrinho e finalize sua compra.
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items Section */}
            <div className="lg:col-span-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-secondary">{item.name}</h2>
                      <p className="text-sm text-textColor/70">R$ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10))
                      }
                      className="w-16 text-center rounded-lg border border-gray-300"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-secondary mb-6">Resumo do Pedido</h3>
              <div className="flex justify-between text-lg mb-4">
                <span>Total:</span>
                <span>R$ {calculateTotal()}</span>
              </div>
              <Link
                to="/checkout"
                className="block text-center bg-primary text-secondary px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition"
              >
                Finalizar Compra
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingCart size={64} className="text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-secondary">Seu carrinho está vazio</h2>
            <p className="text-textColor/70 mb-6">
              Adicione produtos ao carrinho para continuar.
            </p>
            <Link
              to="/products"
              className="bg-primary text-secondary px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition"
            >
              Ver Produtos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;