import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useStore } from '../context/StoreContext';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    alert('Added to cart!');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay">
          <button className="icon-btn" onClick={handleAddToCart} title="Add to Cart">
            <FiShoppingCart />
          </button>
          <button className={`icon-btn wishlist-btn ${inWishlist ? 'active' : ''}`} onClick={handleToggleWishlist} title="Add to Wishlist">
            <FiHeart />
          </button>
        </div>
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
