// src/pages/Products.js

import React from 'react';
import AvailableProducts from '../components/AvailableProducts';
import './Products.css';

function Products() {
  return (
    <main className="products">
      
      <div className="product-gallery">
        <AvailableProducts />
      </div>
    </main>
  );
}

export default Products;

