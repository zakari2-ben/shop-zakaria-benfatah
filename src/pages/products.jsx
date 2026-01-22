import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components';

const Products = ({ products, addToCart }) => {
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    let result = [...products];

    if (search) {
      result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (category !== "all") {
      result = result.filter(p => p.category === category);
    }

    setFiltered(result);
  }, [search, category, products]); // On ajoute "products" comme dépendance

  // Extraire les catégories uniques de l'API pour le menu déroulant
  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <div className="container">
      <h1>Notre Catalogue</h1>
      
      <div className="filters">
        <input 
          type="text" 
          placeholder="Rechercher un produit..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === "all" ? "Toutes les catégories" : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filtered.map(p => (
          /* Attention : l'API utilise "title" au lieu de "name" */
          <ProductCard key={p.id} product={{...p, name: p.title}} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Products;