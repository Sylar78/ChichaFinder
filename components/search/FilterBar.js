// FilterBar component - Advanced search filters
import { useState } from 'react';
import { PRICE_RANGES, AMENITIES, DISTANCE_OPTIONS, RATING_OPTIONS } from '../../utils/constants';
import Button from '../ui/Button';

export default function FilterBar({ filters, onFilterChange, onApply, onReset }) {
  const handleCheckboxChange = (filterName, value) => {
    const current = filters[filterName] || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    onFilterChange(filterName, updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Distance */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Distance</h3>
        <select
          value={filters.maxDistance || ''}
          onChange={(e) => onFilterChange('maxDistance', Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Toutes distances</option>
          {DISTANCE_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Prix</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map(price => (
            <label key={price.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.priceRange || []).includes(price.value)}
                onChange={() => handleCheckboxChange('priceRange', price.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{price.label} ({price.icon})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Note minimale</h3>
        <select
          value={filters.minRating || ''}
          onChange={(e) => onFilterChange('minRating', Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Toutes les notes</option>
          {RATING_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Équipements</h3>
        <div className="space-y-2">
          {AMENITIES.map(amenity => (
            <label key={amenity.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.amenities || []).includes(amenity.value)}
                onChange={() => handleCheckboxChange('amenities', amenity.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{amenity.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <Button variant="primary" size="sm" onClick={onApply} className="w-full">
          Appliquer les filtres
        </Button>
        <Button variant="ghost" size="sm" onClick={onReset} className="w-full">
          Réinitialiser
        </Button>
      </div>
    </div>
  );
}
