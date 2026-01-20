import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import './App.css';

function App() {
  // State Global du panier (Phase 1/2 : React State)
  // En Phase 3, on remplacera ceci par Redux Toolkit
  const [cart, setCart] = useState(() => {
     // Bonus: Persistance locale
     const savedCart = localStorage.getItem('cart');
     return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Ajouter au panier
  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`${product.name} ajouté au panier!`);
  };

  // Mettre à jour quantité
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => 
      prevCart.map(item => item.id === id ? {...item, quantity: newQuantity} : item)
    );
  };

  // Supprimer du panier
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Calcul nombre total d'articles
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="app-layout">
        <Header cartCount={cartCount} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/products/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/cart" element={
              <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
            } />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;