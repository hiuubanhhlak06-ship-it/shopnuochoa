import React from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useStore();

  if (wishlistItems.length === 0) {
    return (
      <div className="app-wrapper">
        <Navbar />
        <div className="page-container empty-cart">
          <h2>Your Wishlist is Empty</h2>
          <p>Add items to your wishlist to save them for later</p>
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
        <h1>My Wishlist ({wishlistItems.length})</h1>

        <div className="wishlist-container">
          <div className="products-grid">
            {wishlistItems.map((product) => (
              <div key={product.id} className="wishlist-item">
                <ProductCard product={product} />
                <button className="btn-remove-wishlist" onClick={() => removeFromWishlist(product.id)}>
                  <FiTrash2 /> Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
