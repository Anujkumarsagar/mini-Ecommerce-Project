// src/App.jsx
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import FilterModal from './components/FilterModal';
import CartModal from './components/CartModal';

const EcommerceApp = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ categories: [], brands: [] });
  const [cart, setCart] = useState([{ id: 1, quantity: 1 }]);

  // Sample data for categories and brands
  const categories = ['Fruits', 'Vegetables', 'Dairy'];
  const brands = ['Brand A', 'Brand B', 'Brand C'];

  const updateCartQuantity = (productId, newQuantity) => {
    setCart((prev) => prev.map(item => (item.id === productId ? { ...item, quantity: newQuantity } : item)));
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return product ? total + product.price * item.quantity : total;
    }, 0);
  };

  const products = [
    { id: 1, name: 'Apple', quantity: '1kg', price: 3, image: 'apple.jpg', category: 'Fruits', brand: 'Brand A' },
    { id: 2, name: 'Milk', quantity: '1L', price: 1.5, image: 'milk.jpg', category: 'Dairy', brand: 'Brand B' },
    // add more products here...
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar setShowCart={setShowCart} />
      <main className="flex-1">
        {/* Product listing and other components will go here */}
      </main>
      <button onClick={() => setShowFilters(true)}>Open Filters</button>
      <FilterModal
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        categories={categories}
        brands={brands}
      />
      <CartModal
        showCart={showCart}
        setShowCart={setShowCart}
        cart={cart}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        getCartTotal={getCartTotal}
        products={products}
      />
    </div>
  );
};

export default EcommerceApp;
