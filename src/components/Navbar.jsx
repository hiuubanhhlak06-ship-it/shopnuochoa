import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { useStore } from '../context/StoreContext';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useStore();
  const cartCount = getCartCount();

  return (
    <header className="navbar">
      <div className="navbar-content container">
        <Link to="/" className="logo">Elegance Parfumerie</Link>

        <nav className={`main-nav ${isOpen ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/wishlist">
            <FiHeart /> Wishlist
          </Link>
        </nav>

        <div className="navbar-actions">
          <button className="icon-btn" onClick={() => setShowSearch((prev) => !prev)} aria-label="Search">
            <FiSearch />
          </button>
          {showSearch && (
            <div className="search-input-wrap">
              <input type="search" placeholder="Search perfumes..." />
            </div>
          )}

          <Link to="/cart" className="icon-btn" aria-label="Cart">
            <FiShoppingCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>

          <button className="hamburger" onClick={() => setIsOpen((prev) => !prev)} aria-label="Menu">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
