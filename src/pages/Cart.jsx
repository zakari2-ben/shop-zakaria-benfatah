import React from 'react';
import { formatPrice } from '../utils/formatPrice';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Cart = ({ cart, updateQuantity, removeFromCart, clearCart}) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrder = () => {
    if (cart.length > 0) {
      setIsOrdered(true);
      clearCart()
      // هنا ممكن تزيد دالة كتمسح السلة (مثلاً clearCart)
      console.log("Commande passée avec succès !");
    }
  };

  // 3. عرض رسالة النجاح
  if (isOrdered) {
    return (
      <div className="container">
        <div className="success-message">🎉 Merci ! Votre commande a été enregistrée.</div>
        <Link to="/products">Continuer vos achats</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container">
        <h2>Votre panier est vide</h2>
        <Link to="/products">Retourner à la boutique</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Votre Panier</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{formatPrice(item.price)}</td>
              <td>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span style={{margin: '0 10px'}}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </td>
              <td>{formatPrice(item.price * item.quantity)}</td>
              <td>
                <button onClick={() => removeFromCart(item.id)} className="btn-remove">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <h3>Total TTC : {formatPrice(total)}</h3>
        <button className="btn-checkout" onClick={handleOrder}>Commander</button>
      </div>
    </div>
  );
};

export default Cart;