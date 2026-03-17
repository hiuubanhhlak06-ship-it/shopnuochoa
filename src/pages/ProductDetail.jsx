import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { FiHeart } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, addToCart, addToWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="app-wrapper">
        <Navbar />
        <div className="page-container" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h2>Product not found</h2>
          <button className="btn-primary" onClick={() => navigate('/collections')}>
            Back to Collections
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Added to cart!');
  };

  const handleToggleWishlist = () => {
    addToWishlist(product);
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="page-container">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <div className="product-detail">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="category">{product.category}</p>
            <p className="price">${product.price}</p>

            <div className="description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-input">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <button className="btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>

              <button className={`btn-wishlist ${inWishlist ? 'active' : ''}`} onClick={handleToggleWishlist}>
                <FiHeart />
                {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            <div className="product-details-table">
              <h3>Details</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Type</td>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>${product.price}</td>
                  </tr>
                  <tr>
                    <td>Availability</td>
                    <td>In Stock</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
