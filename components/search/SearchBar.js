// SearchBar component
import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ onSearch, onUseMyLocation }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center space-x-2">
        {/* Search input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une ville, une adresse..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Use my location button */}
        <button
          type="button"
          onClick={onUseMyLocation}
          className="px-4 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors flex items-center space-x-2"
          title="Utiliser ma position"
        >
          <MapPin size={20} />
          <span className="hidden sm:inline">Ma position</span>
        </button>

        {/* Search button */}
        <button
          type="submit"
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
}
