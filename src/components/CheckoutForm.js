import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import './CheckoutForm.css';

function CheckoutForm({ onNext }) {
    const { cartItems } = useContext(CartContext);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        paymentMethod: 'credit-card',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulação de validação
        if (formData.name && formData.address && formData.email) {
            onNext(formData);
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Informações de Envio</h2>
            <div>
                <label htmlFor="name">Nome Completo:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="address">Endereço:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="email">E-mail:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="paymentMethod">Método de Pagamento:</label>
                <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                    <option value="credit-card">Cartão de Crédito</option>
                    <option value="credit-card">Cartão de Débito</option>
                    <option value="pix">PIX</option>
                    <option value="boleto">Boleto Bancário</option>
                </select>
            </div>
            <button type="submit">Prosseguir para Pagamento</button>
        </form>
    );
}

export default CheckoutForm;
