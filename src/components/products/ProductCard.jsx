import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} />
        {!product.inStock && <span className="out-of-stock">Rupture</span>}
      </div>
      <div className="card-body">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="price">{formatPrice(product.price)}</p>
        <div className="card-actions">
            <Link to={`/products/${product.id}`} className="btn-details">Voir</Link>
            <button 
              disabled={!product.inStock} 
              onClick={() => onAddToCart(product)}
              className="btn-add"
            >
              Ajouter
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;