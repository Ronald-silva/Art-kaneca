import React, { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import CartSummary from '../components/CartSummary';
import PaymentGateway from '../components/PaymentGateway';
import OrderConfirmation from '../components/OrderConfirmation';
import './CheckoutPage.css';

function CheckoutPage() {
    const [formData, setFormData] = useState(null);
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const handleNextStep = (data) => {
        setFormData(data);
    };

    const handlePaymentSuccess = () => {
        setOrderConfirmed(true);
    };

    return (
        <main className="checkout-page">
            {!formData && !orderConfirmed && (
                <>
                    <CartSummary />
                    <CheckoutForm onNext={handleNextStep} />
                </>
            )}
            {formData && !orderConfirmed && (
                <PaymentGateway formData={formData} onPaymentSuccess={handlePaymentSuccess} />
            )}
            {orderConfirmed && <OrderConfirmation />}
        </main>
    );
}

export default CheckoutPage;
