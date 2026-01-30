import React from 'react';
import { formatPrice } from '../utils/formatPrice';
import { Link } from 'react-router-dom';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
        <button className="btn-checkout">Commander</button>
      </div>
    </div>
  );
};

export default Cart;