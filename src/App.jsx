import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import useFetch from "./hooks/useFetch";
import Wishlist from "./pages/Wishlist";
import "./App.css";

function App() {
  const {
    data: products,
    loading,
    error,
  } = useFetch("https://fakestoreapi.com/products");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // enregistrement de cart dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const clearCart = () => {
    setCart([]); // كتمسح كلشي من السلة
  };

  // affichage des états de chargement et d'erreur
  if (error)
    return (
      <div className="container">
        <h2>خطأ: {error}</h2>
      </div>
    );

  return (
    <Router>
      <div className="app-layout">
        <Header cartCount={cartCount} />
        <main className="main-content">
          {loading ? (
            <div className="container">
              <h2>Chargement des produits...</h2>
            </div>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <Home products={products || []} addToCart={addToCart} />
                }
              />
              <Route
                path="/products"
                element={
                  <Products products={products || []} addToCart={addToCart} />
                }
              />
              <Route
                path="/products/:id"
                element={
                  <ProductDetails
                    products={products || []}
                    addToCart={addToCart}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                  />
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/wishlist"
                element={<Wishlist addToCart={addToCart} />}
              />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
