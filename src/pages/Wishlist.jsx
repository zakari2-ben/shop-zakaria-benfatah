import React from 'react';
import { useSelector } from 'react-redux';
import { ProductCard } from '../components';

const Wishlist = ({ addToCart }) => {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <div className="container">
      <h1>list de favorites : </h1>
      {wishlistItems.length === 0 ? (
        <p>list des favorites maintenant est vide </p>
      ) : (
        <div className="product-grid">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;