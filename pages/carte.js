// Carte page - Interactive map view
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import dynamic from 'next/dynamic';
import { getCurrentPosition } from '../lib/osm/geocoding';
import Button from '../components/ui/Button';
import { MapPin } from 'lucide-react';
import { initializeMockData } from '../lib/db/mockData';

// Dynamically import map component (client-side only)
const MapView = dynamic(
  () => import('../components/map/MapView'),
  { ssr: false }
);

export default function Carte() {
  const [userLocation, setUserLocation] = useState(null);
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [center, setCenter] = useState({ latitude: 48.8566, longitude: 2.3522 }); // Paris default

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
      // If geolocation fails, search around default center (Paris)
      await searchBarsNearLocation(center.latitude, center.longitude);
    } finally {
      setLoading(false);
    }
  };

  const searchBarsNearLocation = async (latitude, longitude) => {
    try {
      const response = await fetch('/api/osm/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude, radius: 10000 }) // 10km radius
      });
      const data = await response.json();
      
      if (data.success) {
        setBars(data.bars);
      }
    } catch (error) {
      console.error('Error fetching bars:', error);
    }
  };

  return (
    <Layout title="Carte - ChichaAroundMe">
      <div className="relative" style={{ height: 'calc(100vh - 64px)' }}>
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

        {/* Map */}
        {loading ? (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <p className="text-gray-500">Chargement de la carte...</p>
          </div>
        ) : (
          <MapView 
            center={center}
            bars={bars}
            userLocation={userLocation}
          />
        )}
      </div>
    </Layout>
  );
}
