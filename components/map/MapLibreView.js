// MapLibreView.js - MapLibre GL map component for Carte GL page
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapLibreView({ center, bars, userLocation, onBoundsChange }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current && mapContainer.current) {
      mapRef.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://tiles.stadiamaps.com/styles/alidade_smooth.json',
        center: [center.longitude, center.latitude],
        zoom: 12,
        pitch: 45,
        bearing: -17.6
      });
      mapRef.current.on('load', () => {
        if (mapRef.current.getSource('openmaptiles')) {
          mapRef.current.addLayer({
            id: '3d-buildings',
            source: 'openmaptiles',
            'source-layer': 'building',
            type: 'fill-extrusion',
            minzoom: 15,
            paint: {
              'fill-extrusion-color': '#d1a3ff',
              'fill-extrusion-height': ["get", "height"],
              'fill-extrusion-base': ["get", "min_height"],
              'fill-extrusion-opacity': 0.6
            }
          });
        }
        // Initial marker rendering
        renderMarkers();
        // Listen for map move end to update markers
        mapRef.current.on('moveend', () => {
          if (onBoundsChange) {
            const bounds = mapRef.current.getBounds();
            onBoundsChange({
              south: bounds.getSouth(),
              west: bounds.getWest(),
              north: bounds.getNorth(),
              east: bounds.getEast()
            });
          }
        });
      });
    } else if (mapRef.current) {
      // Recenter the map if center prop changes
      mapRef.current.setCenter([center.longitude, center.latitude]);
      renderMarkers();
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center.latitude, center.longitude]);


  // Helper to render markers
  function renderMarkers() {
    if (!mapRef.current) return;
    // Remove existing bar markers
    if (mapRef.current._barMarkers) {
      mapRef.current._barMarkers.forEach(m => m.remove());
    }
    // Add bar markers
    mapRef.current._barMarkers = (bars || []).map(bar => {
      const marker = new maplibregl.Marker({ color: 'red' })
        .setLngLat([bar.longitude, bar.latitude])
        .setPopup(new maplibregl.Popup().setText(bar.name));
      marker.addTo(mapRef.current);
      if (marker._element) marker._element.style.zIndex = 1000;
      return marker;
    });
    // Remove and re-add user location marker
    if (mapRef.current._userMarker) {
      mapRef.current._userMarker.remove();
    }
    if (userLocation) {
      const marker = new maplibregl.Marker({ color: 'blue' })
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .addTo(mapRef.current);
      if (marker._element) marker._element.style.zIndex = 1000;
      mapRef.current._userMarker = marker;
    }
  }

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
  );
}
