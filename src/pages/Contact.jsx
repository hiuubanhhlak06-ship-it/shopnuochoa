import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="page-container">
        <section className="contact-hero">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with our team.</p>
        </section>

        <div className="contact-container">
          <div className="contact-info">
            <div className="info-card">
              <FiMapPin className="icon" />
              <h3>Address</h3>
              <p>123 Fragrance Avenue</p>
              <p>Paris, France 75001</p>
            </div>

            <div className="info-card">
              <FiPhone className="icon" />
              <h3>Phone</h3>
              <p>+33 1 42 60 37 14</p>
              <p>Available Mon-Fri: 9AM-6PM CET</p>
            </div>

            <div className="info-card">
              <FiMail className="icon" />
              <h3>Email</h3>
              <p>info@eleganceparfumerie.com</p>
              <p>support@eleganceparfumerie.com</p>
            </div>

            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#facebook" aria-label="Facebook"><FiFacebook /></a>
                <a href="#instagram" aria-label="Instagram"><FiInstagram /></a>
                <a href="#twitter" aria-label="Twitter"><FiTwitter /></a>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send us a Message</h2>

            {submitted && (
              <div className="success-message">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>

            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
