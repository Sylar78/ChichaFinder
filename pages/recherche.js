// Recherche page - Search for chicha bars
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import SearchBar from '../components/search/SearchBar';
import FilterBar from '../components/search/FilterBar';
import BarCard from '../components/search/BarCard';
import { useRouter } from 'next/router';
import { getCurrentPosition } from '../lib/osm/geocoding';
import { initializeMockData } from '../lib/db/mockData';

export default function Recherche() {
  const router = useRouter();
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [filters, setFilters] = useState({
    maxDistance: 5,
    priceRange: [],
    minRating: 0,
    amenities: []
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Initialize mock data and load all bars on component mount
  useEffect(() => {
    initializeMockData();
    // Charger tous les bars fictifs au chargement initial
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('chichaAroundMeData');
      if (data) {
        const parsed = JSON.parse(data);
        setBars(parsed.bars || []);
      }
    }
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      // First, geocode the query to get coordinates
      const geocodeResponse = await fetch('/api/osm/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, action: 'search' })
      });
      const geocodeData = await geocodeResponse.json();
      
      if (geocodeData.success && geocodeData.locations.length > 0) {
        const location = geocodeData.locations[0];
        setUserLocation({
          latitude: location.latitude,
          longitude: location.longitude
        });
        
        // Search for bars around this location
        await searchBarsNearLocation(location.latitude, location.longitude);
      }
    } catch (error) {
      console.error('Error searching:', error);
      alert('Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  const handleUseMyLocation = async () => {
    setLoading(true);
    try {
      const position = await getCurrentPosition();
      setUserLocation(position);
      await searchBarsNearLocation(position.latitude, position.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Impossible d\'obtenir votre position. Veuillez vérifier les permissions.');
    } finally {
      setLoading(false);
    }
  };

  const searchBarsNearLocation = async (latitude, longitude) => {
    try {
      const radius = (filters.maxDistance || 5) * 1000; // Convert km to meters
      const response = await fetch('/api/osm/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude, radius })
      });
      const data = await response.json();
      
      if (data.success) {
        setBars(data.bars);
      }
    } catch (error) {
      console.error('Error fetching bars:', error);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleApplyFilters = () => {
    // Si la position utilisateur est connue, filtrage géographique
    if (userLocation) {
      searchBarsNearLocation(userLocation.latitude, userLocation.longitude);
    } else {
      // Sinon, filtrage local sur tous les bars mockés
      if (typeof window !== 'undefined') {
        const data = localStorage.getItem('chichaAroundMeData');
        if (data) {
          let bars = JSON.parse(data).bars || [];
          // Filtrage prix
          if (filters.priceRange && filters.priceRange.length > 0) {
            bars = bars.filter(bar => filters.priceRange.includes(bar.price_range));
          }
          // Filtrage note
          if (filters.minRating && filters.minRating > 0) {
            bars = bars.filter(bar => bar.average_rating >= filters.minRating);
          }
          // Filtrage équipements
          if (filters.amenities && filters.amenities.length > 0) {
            bars = bars.filter(bar => filters.amenities.every(a => bar.amenities && bar.amenities[a]));
          }
          setBars(bars);
        }
      }
    }
    setShowMobileFilters(false);
  };

  const handleResetFilters = () => {
    setFilters({
      maxDistance: 5,
      priceRange: [],
      minRating: 0,
      amenities: []
    });
  };

  const handleBarClick = (bar) => {
    router.push(`/bar/${bar.osm_id}`);
  };

  return (
    <Layout title="Recherche - ChichaAroundMe">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Rechercher des Bars à Chicha
          </h1>
          <SearchBar 
            onSearch={handleSearch} 
            onUseMyLocation={handleUseMyLocation}
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Mobile filter button */}
            <button
              className="lg:hidden mb-4 w-full btn btn-outline"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              Filtres
            </button>

            {/* Mobile filters */}
            {showMobileFilters && (
              <div className="lg:hidden mb-4">
                <FilterBar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onApply={handleApplyFilters}
                  onReset={handleResetFilters}
                />
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Recherche en cours...</p>
              </div>
            ) : bars.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Aucun résultat trouvé
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Essayez une autre recherche ou modifiez vos filtres
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">
                    {bars.length} résultat{bars.length > 1 ? 's' : ''} trouvé{bars.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {bars.map((bar) => (
                    <BarCard 
                      key={bar.osm_id} 
                      bar={bar} 
                      onClick={handleBarClick}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
