import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Art Kaneca" className="logo" />
      <nav>
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/products">Produtos</Link></li>
          <li><Link to="/customize">Personalizar</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
