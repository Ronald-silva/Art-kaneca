// src/components/checkout/PaymentMethod.tsx
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  CreditCard,
  Bitcoin,
  DollarSign,
  ArrowLeft,
  CreditCard as CreditCardIcon
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { maskCard, maskExpiryDate, maskCVV } from "../../utils/masks";

type PaymentType = "cash" | "debit" | "credit" | "bitcoin";

interface PaymentMethodProps {
  initialData: {
    method: PaymentType;
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
    bitcoinAddress?: string;
  };
  onSubmit: (data: PaymentMethodProps["initialData"]) => void;
  onBack: () => void;
}

const PaymentMethod = ({ initialData, onSubmit, onBack }: PaymentMethodProps) => {
  const [paymentData, setPaymentData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplicar máscaras
    switch (name) {
      case "cardNumber":
        formattedValue = maskCard(value);
        break;
      case "expiryDate":
        formattedValue = maskExpiryDate(value);
        break;
      case "cvv":
        formattedValue = maskCVV(value);
        break;
    }

    setPaymentData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(paymentData);
  };

  const handleMethodChange = (value: string) => {
    setPaymentData(prev => ({
      ...prev,
      method: value as PaymentType
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          className="p-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-semibold text-secondary">
          Método de Pagamento
        </h2>
      </div>

      <RadioGroup
        value={paymentData.method}
        onValueChange={handleMethodChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <RadioGroupItem
            value="credit"
            id="credit"
            className="peer sr-only"
          />
          <Label
            htmlFor="credit"
            className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <CreditCardIcon className="h-6 w-6 mb-2" />
            <span>Cartão de Crédito</span>
          </Label>
        </div>

        <div>
          <RadioGroupItem
            value="debit"
            id="debit"
            className="peer sr-only"
          />
          <Label
            htmlFor="debit"
            className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <CreditCard className="h-6 w-6 mb-2" />
            <span>Cartão de Débito</span>
          </Label>
        </div>

        <div>
          <RadioGroupItem
            value="cash"
            id="cash"
            className="peer sr-only"
          />
          <Label
            htmlFor="cash"
            className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <DollarSign className="h-6 w-6 mb-2" />
            <span>Dinheiro</span>
          </Label>
        </div>

        <div>
          <RadioGroupItem
            value="bitcoin"
            id="bitcoin"
            className="peer sr-only"
          />
          <Label
            htmlFor="bitcoin"
            className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Bitcoin className="h-6 w-6 mb-2" />
            <span>Bitcoin</span>
          </Label>
        </div>
      </RadioGroup>

      {/* Campos específicos para cartão */}
      {(paymentData.method === "credit" || paymentData.method === "debit") && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              placeholder="0000 0000 0000 0000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardHolder">Nome no Cartão</Label>
            <Input
              id="cardHolder"
              name="cardHolder"
              value={paymentData.cardHolder}
              onChange={handleChange}
              placeholder="Como aparece no cartão"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Validade</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                value={paymentData.expiryDate}
                onChange={handleChange}
                placeholder="MM/AA"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Campo específico para Bitcoin */}
      {paymentData.method === "bitcoin" && (
        <div className="space-y-2">
          <Label htmlFor="bitcoinAddress">Endereço Bitcoin para Pagamento</Label>
          <Input
            id="bitcoinAddress"
            value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
            readOnly
            className="font-mono"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Envie o valor exato do pedido para este endereço. O pedido será confirmado após 1 confirmação na rede.
          </p>
        </div>
      )}

      {/* Mensagem para pagamento em dinheiro */}
      {paymentData.method === "cash" && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            O pagamento em dinheiro deve ser realizado no momento da entrega. 
            Por favor, tenha o valor exato em mãos.
          </p>
        </div>
      )}

      <Button type="submit" className="w-full">
        Continuar para Confirmação
      </Button>
    </form>
  );
};

export default PaymentMethod;