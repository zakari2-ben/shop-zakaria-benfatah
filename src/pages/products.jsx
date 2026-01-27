import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { ProductCard } from '../components';

const Products = ({ addToCart }) => {
  const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products');
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <div className="container">Chargement...</div>;
  if (error) return <div className="container">Erreur: {error}</div>;

  // Tache 6 : Filtrage par titre
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Notre Boutique</h1>

      {/* Barre de recherche */}
      <div className="search-container" style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          placeholder="Rechercher un produit..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p style={{ marginTop: '10px' }}>
          {filteredProducts.length} résultat(s) trouvé(s)
        </p>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Products;