import React from 'react';
import { useStore } from '../context/StoreContext';
import { FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateCartQuantity, getCartTotal, clearCart } = useStore();

  if (cartItems.length === 0) {
    return (
      <div className="app-wrapper">
        <Navbar />
        <div className="page-container empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Start shopping and add items to your cart</p>
          <button className="btn-primary" onClick={() => navigate('/collections')}>
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="page-container">
        <h1>Shopping Cart</h1>

        <div className="cart-container">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="cart-item-product">
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <div className="quantity-input">
                        <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                        <input type="number" value={item.quantity} onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value) || 1)} />
                        <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button className="btn-delete" onClick={() => removeFromCart(item.id)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>$10.00</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(getCartTotal() + 10 + getCartTotal() * 0.1).toFixed(2)}</span>
            </div>

            <button className="btn-primary" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
            <button className="btn-secondary" onClick={() => navigate('/collections')}>
              Continue Shopping
            </button>
            <button className="btn-danger" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
