import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        {/* Image cliquable */}
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.title} />
        </Link>
      </div>
      <div className="card-body">
        <span className="category">{product.category}</span>
        <h3>{product.title}</h3>
        <p className="price">{formatPrice(product.price)}</p>
        <p className='rating'>{product.rating.rate}</p>
        <div className="card-actions">
            <Link to={`/products/${product.id}`} className="btn-details">Voir</Link>
            <button 
               
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