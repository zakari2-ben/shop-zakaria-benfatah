import { useState, useEffect } from 'react';
import { ProductCard } from '../components';
import { products } from '../data/products';

const Products = ({ addToCart }) => {
  const [filtered, setFiltered] = useState(products);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    let result = [...products];

    // Filtre Recherche
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Filtre Catégorie
    if (category !== "all") {
      result = result.filter(p => p.category === category);
    }

    // Tri
    if (sortOrder === "asc") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") result.sort((a, b) => b.price - a.price);
    if (sortOrder === "az") result.sort((a, b) => a.name.localeCompare(b.name));

    setFiltered(result);
  }, [search, category, sortOrder]);

  return (
    <div className="container">
      <h1>Notre Catalogue</h1>
      
      {/* Barre de filtres */}
      <div className="filters">
        <input 
          type="text" 
          placeholder="Rechercher..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Toutes les catégories</option>
          <option value="Cuisine">Cuisine</option>
          <option value="Mode">Mode</option>
          <option value="Décoration">Décoration</option>
          <option value="Artisanat">Artisanat</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Trier par</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
          <option value="az">Nom A-Z</option>
        </select>
      </div>

      <div className="product-grid">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
        ))}
        {filtered.length === 0 && <p>Aucun produit trouvé.</p>}
      </div>
    </div>
  );
};

export default Products;