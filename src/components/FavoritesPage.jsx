// FavoritesPage.jsx
import React from 'react';

const FavoritesPage = ({ favorites, removeFromFavorites, products }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600">No favorites added yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map(favoriteId => {
            const product = products.find(p => p.id === favoriteId);
            return (
              product && (
                <div key={product.id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2 rounded-md" />
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <p className="text-gray-600">{product.quantity}</p>
                  <p className="font-bold text-green-600">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => removeFromFavorites(favoriteId)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Remove from Favorites
                  </button>
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
