// src/pages/Checkout.tsx
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../components/ui/use-toast";
import { Card } from "../components/ui/card";
import DeliveryForm from "../components/checkout/DeliveryForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type CheckoutStep = "delivery" | "payment" | "confirmation";

interface CheckoutData {
  delivery: {
    name: string;
    email: string;
    phone: string;
    address: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  payment: {
    method: "cash" | "debit" | "credit" | "bitcoin";
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
    bitcoinAddress?: string;
  };
}

const Checkout = () => {
  const { items, itemsCount } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("delivery");
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    delivery: {
      name: "",
      email: "",
      phone: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
    payment: {
      method: "credit",
    },
  });

  const handleDeliverySubmit = (deliveryData: CheckoutData["delivery"]) => {
    setCheckoutData(prev => ({ ...prev, delivery: deliveryData }));
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = (paymentData: CheckoutData["payment"]) => {
    setCheckoutData(prev => ({ ...prev, payment: paymentData }));
    setCurrentStep("confirmation");
  };

  const handleConfirmOrder = () => {
    // Aqui você pode implementar a lógica de finalização do pedido
    toast({
      title: "Pedido realizado com sucesso!",
      description: "Você receberá um e-mail com os detalhes do pedido.",
    });
    navigate("/order-success"); // Você precisará criar esta página
  };

  if (itemsCount === 0) {
    return (
      <div className="min-h-screen pt-20 pb-10 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-secondary mb-4">
            Seu carrinho está vazio
          </h1>
          <Link
            to="/products"
            className="inline-flex items-center text-primary hover:text-primary/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-playfair font-bold text-secondary mb-4">
              Finalizar Pedido
            </h1>
            <div className="flex justify-center items-center gap-4 text-sm">
              <span
                className={`${
                  currentStep === "delivery"
                    ? "text-primary font-semibold"
                    : "text-gray-400"
                }`}
              >
                1. Entrega
              </span>
              <span className="text-gray-400">→</span>
              <span
                className={`${
                  currentStep === "payment"
                    ? "text-primary font-semibold"
                    : "text-gray-400"
                }`}
              >
                2. Pagamento
              </span>
              <span className="text-gray-400">→</span>
              <span
                className={`${
                  currentStep === "confirmation"
                    ? "text-primary font-semibold"
                    : "text-gray-400"
                }`}
              >
                3. Confirmação
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                {currentStep === "delivery" && (
                  <DeliveryForm
                    initialData={checkoutData.delivery}
                    onSubmit={handleDeliverySubmit}
                  />
                )}
                {currentStep === "payment" && (
                  <PaymentMethod
                    initialData={checkoutData.payment}
                    onSubmit={handlePaymentSubmit}
                    onBack={() => setCurrentStep("delivery")}
                  />
                )}
                {currentStep === "confirmation" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-secondary">
                      Confirmar Pedido
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Endereço de Entrega</h3>
                        <p className="text-gray-600">
                          {checkoutData.delivery.name}
                          <br />
                          {checkoutData.delivery.address}, {checkoutData.delivery.number}
                          {checkoutData.delivery.complement && ` - ${checkoutData.delivery.complement}`}
                          <br />
                          {checkoutData.delivery.neighborhood}
                          <br />
                          {checkoutData.delivery.city} - {checkoutData.delivery.state}
                          <br />
                          CEP: {checkoutData.delivery.zipCode}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Forma de Pagamento</h3>
                        <p className="text-gray-600">
                          {checkoutData.payment.method === "credit" && "Cartão de Crédito"}
                          {checkoutData.payment.method === "debit" && "Cartão de Débito"}
                          {checkoutData.payment.method === "cash" && "Dinheiro"}
                          {checkoutData.payment.method === "bitcoin" && "Bitcoin"}
                        </p>
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep("payment")}
                        >
                          Voltar
                        </Button>
                        <Button onClick={handleConfirmOrder}>
                          Confirmar Pedido
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary items={items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;