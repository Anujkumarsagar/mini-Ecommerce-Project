// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Heart, Home, Search, ShoppingCart, User } from 'lucide-react';
const NavItem = ({ icon: Icon, label, action, to }) => (
  <Link
    to={to}
    onClick={action}
    className="flex flex-col items-center p-2 text-gray-800 hover:text-green-400 transition-colors"
    aria-label={label} // Adding aria-label for accessibility
  >
    <Icon className="h-6 w-6" />
    <span className="text-xs mt-1 font-semibold">{label}</span>
  </Link>
);

const NavBar = ({ setShowCart }) => (
  <header className="sticky top-0 bg-white z-40 shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-green-600">EcoMart</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <NavItem icon={Home} label="Shop" to="/" /> {/* Link to home page */}
          <NavItem icon={Search} label="Explore" to="/explore" /> {/* Link to explore page */}
          <NavItem icon={ShoppingCart} label="Cart" action={() => setShowCart(true)} />
          <NavItem icon={Heart} label="Favourite" to="/favourite" /> {/* Fixed spelling of 'favourite' */}
          <NavItem icon={User} label="Account" to="/account" /> {/* Link to account page */}
        </div>
      </div>
    </div>
  </header>
);

export default NavBar;
