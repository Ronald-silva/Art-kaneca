// src/components/FeaturedProducts.js

import React from 'react';
import { featuredProducts } from '../data/featuredProducts';
import './FeaturedProducts.css';



const FeaturedProducts = () => {
    return (
        <section className="featured-products">
            <h2>Produtos em Destaque</h2>
            <div className="product-gallery">
                {featuredProducts.map(product => (
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

export default FeaturedProducts;
