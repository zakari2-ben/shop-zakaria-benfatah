import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopProvider, useShop } from "./context/ShopContext"; // Import Provider

// Composants Shop
import { Header, Footer } from "./components";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import "./App.css";

// Composants Admin
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/components/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import ProductList from "./admin/pages/ProductList";
import ProductForm from "./admin/pages/ProductForm";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminMessages from "./admin/pages/AdminMessages";

// Wrapper pour utiliser le Context dans le Shop
const ShopRoutes = () => {
  const { products, loading } = useShop(); // Utiliser les données du contexte

  // États locaux du panier (inchangés pour ne pas casser la logique existante)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

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

  const removeFromCart = (id) =>
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const clearCart = () => setCart([]);

  if (loading)
    return (
      <div className="container">
        <h2>Chargement...</h2>
      </div>
    );

  return (
    <div className="app-layout">
      <Header cartCount={cartCount} />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Home products={products} addToCart={addToCart} />}
          />
          <Route
            path="/products"
            element={<Products products={products} addToCart={addToCart} />}
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetails products={products} addToCart={addToCart} />
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
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ShopProvider>
      <Router>
        <Routes>
          {/* Routes Admin (Layout Séparé) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />{" "}
            {/* Redirection implicite vers Dashboard */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="add-product" element={<ProductForm />} />
            <Route path="edit-product/:id" element={<ProductForm />} />
            {/* NOUVELLE ROUTE de messages recevoires */}
            <Route path="messages" element={<AdminMessages />} />
          </Route>

          {/* Routes Shop (Layout Classique) */}
          <Route path="/*" element={<ShopRoutes />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;
