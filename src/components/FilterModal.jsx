// src/components/FilterModal.jsx
import React from 'react';
import { X } from 'lucide-react';

const FilterModal = ({ showFilters, setShowFilters, activeFilters, setActiveFilters, categories, brands }) => {
  return (
    showFilters && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
        <div className="bg-white h-full w-full md:w-96 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Filters</h2>
            <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Categories</h3>
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={activeFilters.categories.includes(category)}
                    onChange={(e) => {
                      setActiveFilters((prev) => ({
                        ...prev,
                        categories: e.target.checked
                          ? [...prev.categories, category]
                          : prev.categories.filter((c) => c !== category),
                      }));
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">{category}</span>
                </label>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Brand</h3>
              {brands.map((brand) => (
                <label key={brand} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={activeFilters.brands.includes(brand)}
                    onChange={(e) => {
                      setActiveFilters((prev) => ({
                        ...prev,
                        brands: e.target.checked
                          ? [...prev.brands, brand]
                          : prev.brands.filter((b) => b !== brand),
                      }));
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowFilters(false)}
            className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 hover:bg-green-600 transition duration-300"
          >
            Apply Filter
          </button>
        </div>
      </div>
    )
  );
};

export default FilterModal;
