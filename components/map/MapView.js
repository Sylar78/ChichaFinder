// MapView component - Interactive OpenStreetMap with Leaflet
import { useEffect, useRef } from 'react';
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

function MapController({ center }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView([center.latitude, center.longitude], 13);
    }
  }, [center, map]);
  
  return null;
}

export default function MapView({ center, bars = [], userLocation = null }) {
  const router = useRouter();
  const mapRef = useRef();

  const handleBarClick = (bar) => {
    router.push(`/bar/${bar.osm_id}`);
  };

  return (
    <div className="w-full h-full">
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
        
        <MapController center={center} />

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

        {/* Bar markers */}
        {bars.map((bar) => (
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
