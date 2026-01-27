import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
// Ajoute Sun et Moon ici
import { ShoppingCart, Menu, Sun, Moon } from 'lucide-react'; 
import './Header.css';

const Header = ({ cartCount }) => {
  // --- CETTE LIGNE MANQUAIT ---
  const { theme, toggleTheme } = useTheme(); 

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">Shop.ma</Link>
        <nav className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/products">Produits</Link>
          <Link to="/contact">Contact</Link>
          
          {/* Bouton de Thème fonctionnera maintenant */}
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
          </button>
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