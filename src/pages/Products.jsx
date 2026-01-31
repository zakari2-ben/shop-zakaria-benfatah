import React, { useState } from 'react';
import { ProductCard } from '../components';

const Products = ({ products, addToCart }) => {
  
  // pour filtrage States 
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000); 

  

  
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // la logic de filtrage pour tout les niveaux 
  const filteredProducts = products.filter(p => {
    const matchesName = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;

    return matchesName && matchesCategory && matchesPrice;
  });

  return (
    <div className="container">
      <h1>Notre Boutique</h1>

      
      <div className="filters-container" >
        
        {/* search par nom */}
        <div className="filter-group">
          <label>Recherche : </label>
          <input 
            type="text"
            placeholder="Nom du produit..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* filtrage par gategory */}
        <div className="filter-group">
          <label>Catégorie : </label>
          <select onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* search par prix */}
        <div className="filter-group">
          <label>Prix Min : </label>
          <input 
            type="number" 
            value={minPrice} 
            onChange={(e) => setMinPrice(Number(e.target.value))} 
            style={{ width: '80px' }}
          />
        </div>

        <div className="filter-group">
          <label>Prix Max : </label>
          <input 
            type="number" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))} 
            style={{ width: '80px' }}
          />
        </div>
      </div>

      <p>{filteredProducts.length} résultat(s) trouvé(s)</p>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))
        ) : (
          <h3>Aucun produit ne correspond à vos critères.</h3>
        )}
      </div>
    </div>
  );
};

export default Products;