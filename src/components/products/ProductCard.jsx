import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice'; 
import { Heart } from 'lucide-react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { toggleWishlist, selectIsInWishlist } from '../../features/wishlist/wishlistSlice';
import './ProductCard.css'; 

const ProductCard = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();
  
  // pour verifier si le produit est dans la liste de souhaits
  const isInWishlist = useSelector((state) => selectIsInWishlist(state, product.id));

  return (
    <div className="product-card">
      <div className="image-container">
        {/* button de fav */}
        <button 
          className="wishlist-btn" 
          onClick={() => dispatch(toggleWishlist(product))}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            padding: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            zIndex: 2
          }}
        >
          <Heart 
            size={20} 
            fill={isInWishlist ? "red" : "none"} 
            color={isInWishlist ? "red" : "gray"} 
          />
        </button>

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