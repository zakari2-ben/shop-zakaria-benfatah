import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

const ProductDetails = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="container">Produit introuvable</div>;

  return (
    <div className="container product-detail-container">
      <button onClick={() => navigate(-1)} className="btn-back">← Retour</button>
      <div className="detail-grid">
        <img src={product.image} alt={product.name} className="detail-image" />
        <div className="detail-info">
          <h1>{product.name}</h1>
          <span className="category-tag">{product.category}</span>
          <p className="price-large">{formatPrice(product.price)}</p>
          <p className="description">{product.description}</p>
          {/* <p>Stock: {product.inStock ? "Disponible" : "Épuisé"}</p> */}
          <button 
            className="btn-add-large"
            // disabled={!product.inStock}
            onClick={() => addToCart(product)}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;