import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
// Ajoute Sun et Moon ici
import { ShoppingCart, Menu, Sun, Moon, Heart} from "lucide-react";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = ({ cartCount }) => {
  // --- CETTE LIGNE MANQUAIT ---
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          Shop.ma
        </Link>
        <nav className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/products">Produits</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/wishlist" className="wishlist-link">
            <Heart size={20} />
            {/* afichage de nombre de fav */}
            <span className="badge">
              {useSelector((state) => state.wishlist.items.length)}
            </span>
          </Link>

          {/* Bouton de Thème fonctionnera maintenant */}
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
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
