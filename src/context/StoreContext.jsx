import React, { createContext, useState, useContext } from 'react';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};

const mockProducts = [
  {
    id: 1,
    name: 'Midnight Elegance',
    price: 120,
    image: 'https://via.placeholder.com/300x300?text=Midnight+Elegance',
    category: 'Eau de Parfum',
    description: 'A sophisticated blend of dark florals and woody notes.'
  },
  {
    id: 2,
    name: 'Rose Garden',
    price: 95,
    image: 'https://via.placeholder.com/300x300?text=Rose+Garden',
    category: 'Eau de Toilette',
    description: 'Fresh and romantic with hints of Bulgarian rose.'
  },
  {
    id: 3,
    name: 'Ocean Breeze',
    price: 85,
    image: 'https://via.placeholder.com/300x300?text=Ocean+Breeze',
    category: 'Cologne',
    description: 'Crisp citrus and sea salt notes for a fresh morning.'
  },
  {
    id: 4,
    name: 'Vanilla Sunset',
    price: 110,
    image: 'https://via.placeholder.com/300x300?text=Vanilla+Sunset',
    category: 'Eau de Parfum',
    description: 'Warm vanilla with touches of amber and sandalwood.'
  },
  {
    id: 5,
    name: 'Jasmine Nights',
    price: 105,
    image: 'https://via.placeholder.com/300x300?text=Jasmine+Nights',
    category: 'Eau de Parfum',
    description: 'Delicate jasmine with a hint of musk and spice.'
  },
  {
    id: 6,
    name: 'Cedar Woods',
    price: 125,
    image: 'https://via.placeholder.com/300x300?text=Cedar+Woods',
    category: 'Eau de Parfum',
    description: 'Rich cedarwood and vetiver for the modern man.'
  }
];

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) {
        return prevItems.filter((item) => item.id !== product.id);
      }
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    // Products
    products: mockProducts,
    getProductById: (id) => mockProducts.find((p) => p.id === parseInt(id)),

    // Cart
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartCount,

    // Wishlist
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
