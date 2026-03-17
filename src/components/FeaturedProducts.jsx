import React from 'react';

const products = [
  { id: 1, name: 'Eternal Romance', oldPrice: 120, price: 85, sale: true, description: 'A dreamy floral bouquet with warm musk.' },
  { id: 2, name: 'Mystic Oud', price: 150, description: 'A deep, resinous oud with oriental accords.' },
  { id: 3, name: 'Belle Epoque', price: 135, description: 'A timeless blend of rose and amber.' }
];

const FeaturedProducts = () => {
  return (
    <section className="featured" id="featured-products">
      <div className="container">
        <h2>Featured Perfumes</h2>
        <div className="product-grid">
          {products.map((item) => (
            <article key={item.id} className="product-card">
              <div className="product-image" aria-label={item.name}>
                <span className="quick-view">Quick View</span>
              </div>
              {item.sale && <span className="sale-tag">SALE</span>}
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="price-group">
                {item.oldPrice && <span className="old-price">${item.oldPrice}</span>}
                <span className="price">${item.price}</span>
              </div>
              <a href="#" className="btn btn-secondary">
                Shop Now
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
