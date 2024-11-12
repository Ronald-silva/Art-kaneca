// src/components/AvailableProducts.js

import React from 'react';
import { availableProducts } from '../data/availableProducts';
import './AvailableProducts.css';

const AvailableProducts = () => {
    return (
        <section className="available-products">
            <h2>Produtos Disponíveis</h2>
            <div className="product-gallery">
                {availableProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="price">{product.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AvailableProducts;
