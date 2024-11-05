import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import FilterModal from './components/FilterModal';
import CartModal from './components/CartModal';
import BottomNavBar from './components/BottomNavbar';
import { Factory, Heart } from 'lucide-react';
import FavoritesPage from './components/FavoritesPage';

const App = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ categories: [], brands: [] });
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for products, categories, and brands
  const products = [
    { id: 1, name: 'Apple', quantity: '1kg', price: 3, image: '/placeholder.svg?height=200&width=200', category: 'Fruits', brand: 'Brand A' },
    { id: 2, name: 'Milk', quantity: '1L', price: 1.5, image: '/placeholder.svg?height=200&width=200', category: 'Dairy', brand: 'Brand B' },
    { id: 3, name: 'Carrot', quantity: '500g', price: 2, image: '/placeholder.svg?height=200&width=200', category: 'Vegetables', brand: 'Brand C' },
    { id: 4, name: 'Banana', quantity: '1kg', price: 2.5, image: '/placeholder.svg?height=200&width=200', category: 'Fruits', brand: 'Brand A' },
    { id: 5, name: 'Yogurt', quantity: '500g', price: 2, image: '/placeholder.svg?height=200&width=200', category: 'Dairy', brand: 'Brand B' },
    { id: 6, name: 'Tomato', quantity: '500g', price: 1.5, image: '/placeholder.svg?height=200&width=200', category: 'Vegetables', brand: 'Brand C' },
  ];

  const categories = ['Fruits', 'Vegetables', 'Dairy'];
  const brands = ['Brand A', 'Brand B', 'Brand C'];

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const updateCartQuantity = (productId, newQuantity) => {
    setCart((prev) =>
      prev.map(item => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilters.categories.length === 0 || activeFilters.categories.includes(product.category);
    const matchesBrand = activeFilters.brands.length === 0 || activeFilters.brands.includes(product.brand);
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const handleFilterChange = (filterType, filterValue) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(filterValue)
        ? prev[filterType].filter(item => item !== filterValue)
        : [...prev[filterType], filterValue]
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({ categories: [], brands: [] });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return product ? total + product.price * item.quantity : total;
    }, 0);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem) {
        return prev.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <NavBar setShowCart={setShowCart} cartItemsCount={cart.length} />
        <main className="flex-1 container mx-auto p-4">
          <Routes>
            <Route path="/" element={
              <>
                <div className='flex justify-between items-center mb-4 flex-wrap'>
                  <h1 className="text-2xl font-bold">Products</h1>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Search products"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Filter
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2 rounded-md" />
                      <h2 className="font-semibold text-lg">{product.name}</h2>
                      <p className="text-gray-600">{product.quantity}</p>
                      <p className="font-bold text-green-600">${product.price.toFixed(2)}</p>
                      <div className="flex justify-between items-center mt-2">
                        <button
                          onClick={() => addToCart(product.id)}
                          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className={`p-2 rounded-full ${favorites.includes(product.id) ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
                        >
                          <Heart className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            } />
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  favorites={favorites}
                  removeFromFavorites={(id) => setFavorites(favorites.filter(fav => fav !== id))}
                  products={products}
                />
              }
            />
          </Routes>
        </main>
        <FilterModal
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeFilters={activeFilters}
          handleFilterChange={handleFilterChange}
          handleClearFilters={handleClearFilters}
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
        <BottomNavBar setShowCart={setShowCart} setShowFilters={setShowFilters} />
      </div>
    </Router>
  );
};

export default App;
