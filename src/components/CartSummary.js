import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './CartSummary.css';

function CartSummary() {
    const { cartItems, totalPrice } = useContext(CartContext);

    return (
        <div className="cart-summary">
            <h2>Resumo do Pedido</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - R$ {item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
            <h3>Total: R$ {totalPrice}</h3>
        </div>
    );
}

export default CartSummary;
