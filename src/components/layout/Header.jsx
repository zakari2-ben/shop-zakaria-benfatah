import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import './Header.css';

const Header = ({ cartCount }) => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">Shop.ma</Link>
        <nav className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/products">Produits</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="header-actions">
          <Link to="/cart" className="cart-icon">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;