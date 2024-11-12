// src/data/featuredProducts.js

import canecaImg from '../assets/images/caneca.jpg';
import garrafa1Img from '../assets/images/garrafa1.jpg';
import relogioImg from '../assets/images/relogio.jpg';
import abridorImg from '../assets/images/abridor.jpg';

export const featuredProducts = [
    {
        id: 1,
        name: "Caneca Personalizada",
        price: "R$ 29,90",
        description: "Uma caneca personalizada com seu nome ou frase favorita.",
        image: canecaImg,
    },
    {
        id: 2,
        name: "Garrafa Térmica",
        price: "R$ 49,90",
        description: "Garrafa térmica para manter sua bebida quente ou fria.",
        image: garrafa1Img,
    },
    {
        id: 3,
        name: "Relógio de Parede",
        price: "R$ 79,90",
        description: "Relógio de parede estiloso para decorar sua casa.",
        image: relogioImg,
    },
    {
        id: 4,
        name: "Abridor de Vinho",
        price: "R$ 39,90",
        description: "Abridor de vinho elegante para suas ocasiões especiais.",
        image: abridorImg,
    },
];
