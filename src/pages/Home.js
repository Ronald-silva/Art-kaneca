// src/pages/Home.js

import React from 'react';
import FeaturedProducts from '../components/FeaturedProducts';
import './Home.css';

function Home() {
    return (
        <main className="home">
            <section className="hero">
                <h1>Bem-vindo à Art Kaneca</h1>
                <p>Produtos personalizados de alta qualidade, feitos com carinho.</p>
            </section>
            <FeaturedProducts />
        </main>
    );
}

export default Home;

