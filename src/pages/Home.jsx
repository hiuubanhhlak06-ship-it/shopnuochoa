import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import BrandStory from '../components/BrandStory';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <BrandStory />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
