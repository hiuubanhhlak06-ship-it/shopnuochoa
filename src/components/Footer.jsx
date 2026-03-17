import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p>2022 Elegance Parfumerie. All Rights Reserved.</p>
        </div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="newsletter">
          <label htmlFor="newsletter-email">Sign up for newsletter</label>
          <div className="newsletter-form">
            <input id="newsletter-email" type="email" placeholder="Your email" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
