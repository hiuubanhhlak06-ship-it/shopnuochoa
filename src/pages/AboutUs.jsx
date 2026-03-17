import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="page-container">
        <section className="about-hero">
          <h1>About Elegance Parfumerie</h1>
          <p>Crafting Timeless Fragrances Since 2010</p>
        </section>

        <div className="about-content">
          <section className="about-section">
            <h2>Our Story</h2>
            <p>
              Elegance Parfumerie was founded in 2010 with a passion for creating exceptional fragrances that capture the essence of luxury and elegance. What started as a small boutique has grown into a renowned fragrance house trusted by perfume enthusiasts worldwide.
            </p>
            <p>
              Each fragrance we create is meticulously crafted by our master perfumers, blending the finest ingredients from around the world to create unforgettable scent experiences.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide our customers with premium quality fragrances that evoke emotion, celebrate individuality, and create lasting memories. We believe that every scent tells a story, and we're honored to be part of yours.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Values</h2>
            <ul className="values-list">
              <li><strong>Quality:</strong> We use only the finest ingredients and traditional perfume-making techniques.</li>
              <li><strong>Sustainability:</strong> We are committed to environmentally responsible practices.</li>
              <li><strong>Innovation:</strong> We constantly explore new fragrance combinations and techniques.</li>
              <li><strong>Customer Excellence:</strong> Your satisfaction is our highest priority.</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Why Choose Us?</h2>
            <div className="reasons-grid">
              <div className="reason-card">
                <h3>Authentic Fragrances</h3>
                <p>100% genuine perfumes directly from our production facilities.</p>
              </div>
              <div className="reason-card">
                <h3>Expert Guidance</h3>
                <p>Our fragrance specialists are here to help you find your perfect scent.</p>
              </div>
              <div className="reason-card">
                <h3>Fast Shipping</h3>
                <p>Quick and secure delivery to your doorstep.</p>
              </div>
              <div className="reason-card">
                <h3>Money-back Guarantee</h3>
                <p>Not satisfied? We offer 30 days money-back guarantee.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
