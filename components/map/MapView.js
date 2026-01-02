// MapView component - Interactive OpenStreetMap with Leaflet
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/router';

// Fix for default marker icon in Leaflet with Next.js
if (typeof window !== 'undefined') {
  const L = require('leaflet');
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

function MapController({ center, onBoundsChange }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView([center.latitude, center.longitude], 13);
    }
  }, [center, map]);

  useEffect(() => {
    const updateBounds = () => {
      const bounds = map.getBounds();
      if (onBoundsChange) {
        onBoundsChange(bounds);
      }
    };

    // Appeler immédiatement après le montage
    updateBounds();

    // Écouter les événements de déplacement et zoom
    map.on('moveend', updateBounds);
    map.on('zoomend', updateBounds);

    return () => {
      map.off('moveend', updateBounds);
      map.off('zoomend', updateBounds);
    };
  }, [map, onBoundsChange]);
  
  return null;
}

export default function MapView({ center, bars = [], userLocation = null }) {
  const router = useRouter();
  const mapRef = useRef();
  const [osmBars, setOsmBars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Récupération des vrais chichas via l'API OSM pour la zone visible
  const fetchChichasInView = async (bounds) => {
    if (!bounds) return;
    
    setIsLoading(true);
    const south = bounds.getSouth();
    const west = bounds.getWest();
    const north = bounds.getNorth();
    const east = bounds.getEast();

    console.log('Fetching chichas for bounds:', { south, west, north, east });

    try {
      const response = await fetch(
        `/api/osm/bbox?south=${south}&west=${west}&north=${north}&east=${east}`
      );
      const data = await response.json();
      
      console.log('Chichas received:', data);
      
      if (data.success && data.bars) {
        setOsmBars(data.bars);
        console.log(`${data.bars.length} chichas found`);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des chichas:', error);
      setOsmBars([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBarClick = (bar) => {
    router.push(`/bar/${bar.osm_id}`);
  };

  return (
    <div className="w-full h-full">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute top-20 right-4 z-10 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Chargement des chichas...
        </div>
      )}
      
      {/* Chichas count */}
      <div className="absolute top-20 left-4 z-10 bg-white px-4 py-2 rounded-lg shadow-lg">
        {osmBars.length} chicha{osmBars.length > 1 ? 's' : ''} trouvé{osmBars.length > 1 ? 's' : ''}
      </div>

      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} onBoundsChange={fetchChichasInView} />

        {/* User location marker */}
        {userLocation && (
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
            <Popup>
              <div className="map-popup">
                <h3>Vous êtes ici</h3>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Bar markers (OSM) */}
        {osmBars.map((bar) => (
          <Marker
            key={bar.osm_id}
            position={[bar.latitude, bar.longitude]}
          >
            <Popup>
              <div className="map-popup">
                <h3>{bar.name}</h3>
                {bar.address && <p>{bar.address}</p>}
                {bar.distance && (
                  <p className="text-gray-600">
                    {bar.distance} km
                  </p>
                )}
                {bar.price_range && (
                  <p className="text-primary-600 font-medium">
                    {bar.price_range}
                  </p>
                )}
                <button
                  onClick={() => handleBarClick(bar)}
                  className="btn btn-primary btn-sm mt-2"
                >
                  Voir les détails
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
