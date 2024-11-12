import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([
        // Exemplo de itens no carrinho
        { id: 1, name: 'Caneca Personalizada', price: 29.90, quantity: 1 },
        { id: 2, name: 'Garrafa Térmica', price: 49.90, quantity: 2 },
    ]);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, totalPrice, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};
