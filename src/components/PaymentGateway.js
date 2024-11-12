import React from 'react';
import './PaymentGateway.css';

function PaymentGateway({ formData, onPaymentSuccess }) {
    const handlePayment = () => {
        // Simular o processo de pagamento
        setTimeout(() => {
            alert('Pagamento realizado com sucesso!');
            onPaymentSuccess();
        }, 2000);
    };

    return (
        <div className="payment-gateway">
            <h2>Pagamento</h2>
            <p>Método de Pagamento: {formData.paymentMethod}</p>
            <button onClick={handlePayment}>Confirmar Pagamento</button>
        </div>
    );
}

export default PaymentGateway;
