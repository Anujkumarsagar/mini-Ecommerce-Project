import React from 'react';
import { Heart, Home, Search, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const BottomNavBar = ({ setShowCart }) => {
  const NavItem = ({ icon: Icon, label, action, to }) => (
    <Link
      to={to}
      onClick={action}
      className="flex flex-col items-center p-2 text-gray-800 hover:text-green-400 transition-colors"
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs mt-1 font-semibold">{label}</span>
    </Link>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-40 md:hidden">
      <div className="flex justify-around items-center p-2">
        <NavItem icon={Home} label="Shop" to="/" />
        <NavItem icon={Search} label="Explore" to="/explore" />
        <NavItem icon={ShoppingCart} label="Cart" action={() => setShowCart(true)} />
        <NavItem icon={Heart} label="Favorite" to="/favorites" />
        <NavItem icon={User} label="Account" to="/account" />
      </div>
    </nav>
  );
};

export default BottomNavBar;
