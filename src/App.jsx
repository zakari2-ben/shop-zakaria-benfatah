import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import './App.css';
import Products from './pages/Products';

function App() {
  const [products, setProducts] = useState([]); // État pour stocker les produits de l'API
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [cart, setCart] = useState(() => {
     const savedCart = localStorage.getItem('cart');
     return savedCart ? JSON.parse(savedCart) : [];
  });

  // Appel à l'API FakeStore
  useEffect(() => {
    fetch('https://fakestoreapi.com/products') 
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des produits:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart => 
      prevCart.map(item => item.id === id ? {...item, quantity: newQuantity} : item)
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="app-layout">
        <Header cartCount={cartCount} />
        <main className="main-content">
          {loading ? (
            <div className="container"><h2>Chargement des produits...</h2></div>
          ) : (
            <Routes>
              {/* On passe la liste "products" de l'API aux composants */}
              <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
              <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
              <Route path="/products/:id" element={<ProductDetails products={products} addToCart={addToCart} />} />
              <Route path="/cart" element={
                <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
              } />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;