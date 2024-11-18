// src/components/checkout/OrderSummary.tsx
import { Card } from "../ui/card";

interface OrderSummaryProps {
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
}

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 15.90; // Você pode tornar isso dinâmico baseado no CEP
  const total = subtotal + shipping;

  return (
    <Card className="p-6 sticky top-24">
      <h2 className="text-2xl font-semibold text-secondary mb-6">
        Resumo do Pedido
      </h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div className="flex gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="font-medium text-secondary">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Quantidade: {item.quantity}
                </p>
              </div>
            </div>
            <span className="font-medium">
              R$ {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Frete</span>
            <span>R$ {shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderSummary;