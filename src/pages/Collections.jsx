import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Collections = () => {
  const { products } = useStore();

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="page-container">
        <section className="collections-hero">
          <h1>Our Collections</h1>
          <p>Discover our exclusive range of exquisite perfumes</p>
        </section>

        <div className="filters-section">
          <h3>Filter by Category</h3>
          <div className="filter-buttons">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Eau de Parfum</button>
            <button className="filter-btn">Eau de Toilette</button>
            <button className="filter-btn">Cologne</button>
          </div>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collections;
