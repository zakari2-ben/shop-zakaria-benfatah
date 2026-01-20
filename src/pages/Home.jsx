import React from 'react';
import { ProductCard } from '../components';
import { products } from '../data/products';

const Home = ({ addToCart }) => {
  // Afficher seulement les 3 premiers produits en vedette
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="container">
      <section className="hero">
        <h1>Bienvenue sur Shop.ma</h1>
        <p>Découvrez l'excellence de l'artisanat marocain.</p>
      </section>

      <h2>Produits Vedettes</h2>
      <div className="product-grid">
        {featuredProducts.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Home;