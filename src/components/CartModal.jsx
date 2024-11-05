// src/components/CartModal.jsx
import React from 'react';
import { X, Plus, Minus } from 'lucide-react';

const CartModal = ({ showCart, setShowCart, cart, updateCartQuantity, removeFromCart, getCartTotal, products }) => {
  return (
    showCart && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
        <div className="bg-white h-full w-full md:w-96 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Cart</h2>
            <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-4 mb-20">
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.id);
              if (!product) return null;
              return (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.quantity}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full border hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full border hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(product.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 md:w-96 md:right-0 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-xl">${getCartTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={() => setShowCart(false)}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Go to Checkout
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CartModal;
