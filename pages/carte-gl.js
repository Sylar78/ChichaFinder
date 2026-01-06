// Carte GL page - Interactive map view with MapLibre GL
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import dynamic from 'next/dynamic';
import { getCurrentPosition } from '../lib/osm/geocoding';
import Button from '../components/ui/Button';
import { MapPin } from 'lucide-react';
import { initializeMockData } from '../lib/db/mockData';
import SearchBar from '../components/search/SearchBar';
import FilterBar from '../components/search/FilterBar';

// Dynamically import MapLibre GL map component (client-side only)
const MapLibreView = dynamic(
  () => import('../components/map/MapLibreView'),
  { ssr: false }
);

export default function CarteGL() {
  const [userLocation, setUserLocation] = useState(null);
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [center, setCenter] = useState({ latitude: 48.8566, longitude: 2.3522 }); // Paris default
  const [filters, setFilters] = useState({
    maxDistance: 5,
    priceRange: [],
    minRating: 0,
    amenities: []
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    initializeMockData();
    handleUseMyLocation();
  }, []);

  const handleUseMyLocation = async () => {
    setLoading(true);
    try {
      const position = await getCurrentPosition();
      setUserLocation(position);
      setCenter(position);
      await searchBarsNearLocation(position.latitude, position.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      await searchBarsNearLocation(center.latitude, center.longitude);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
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
        await searchBarsNearLocation(location.latitude, location.longitude);
      }
    } catch (error) {
      console.error('Error searching:', error);
      alert('Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  const searchBarsNearLocation = async (latitude, longitude, bounds) => {
    try {
      let body;
      if (bounds) {
        body = JSON.stringify({
          south: bounds.south,
          west: bounds.west,
          north: bounds.north,
          east: bounds.east
        });
      } else {
        body = JSON.stringify({ latitude, longitude, radius: 10000 });
      }
      const response = await fetch('/api/osm/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
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
    if (userLocation) {
      searchBarsNearLocation(userLocation.latitude, userLocation.longitude);
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

  return (
    <Layout title="Carte GL - ChichaAroundMe">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Rechercher des Bars à Chicha (MapLibre GL)
          </h1>
          <SearchBar 
            onSearch={handleSearch} 
            onUseMyLocation={handleUseMyLocation}
          />
        </div>
        <div className="mb-8">
          <button
            className="lg:hidden mb-4 w-full btn btn-outline"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            Filtres
          </button>
          <div className="hidden lg:block">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
            />
          </div>
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
        </div>
        <div className="relative" style={{ height: 'calc(100vh - 64px - 300px)' }}>
          {/* Map controls */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white rounded-lg shadow-lg p-4 space-y-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleUseMyLocation}
                disabled={loading}
                className="flex items-center space-x-2 w-full"
              >
                <MapPin size={18} />
                <span>Ma position</span>
              </Button>
              <div className="text-sm text-gray-600">
                {bars.length} bar{bars.length > 1 ? 's' : ''} trouvé{bars.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>
          {/* MapLibre GL Map */}
          {loading ? (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <p className="text-gray-500">Chargement de la carte...</p>
            </div>
          ) : (
            <MapLibreView 
              center={center}
              bars={bars}
              userLocation={userLocation}
              onBoundsChange={(bounds) => {
                // Fetch bars for the visible bounds when map movement stops
                searchBarsNearLocation(
                  (bounds.north + bounds.south) / 2,
                  (bounds.east + bounds.west) / 2,
                  bounds
                );
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
