// Utility functions and constants for the application

// Price range options
export const PRICE_RANGES = [
  { value: '€', label: 'Économique', icon: '€' },
  { value: '€€', label: 'Moyen', icon: '€€' },
  { value: '€€€', label: 'Élevé', icon: '€€€' }
];

// Amenities options
export const AMENITIES = [
  { value: 'wifi', label: 'Wi-Fi', icon: 'Wifi' },
  { value: 'parking', label: 'Parking', icon: 'Car' },
  { value: 'terrace', label: 'Terrasse', icon: 'Sun' },
  { value: 'accessible', label: 'Accessible', icon: 'Accessibility' },
  { value: 'music', label: 'Musique', icon: 'Music' },
  { value: 'food', label: 'Restauration', icon: 'UtensilsCrossed' }
];

// Distance options (in km)
export const DISTANCE_OPTIONS = [
  { value: 1, label: '1 km' },
  { value: 2, label: '2 km' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 20, label: '20 km' }
];

// Rating options
export const RATING_OPTIONS = [
  { value: 1, label: '1+ étoiles' },
  { value: 2, label: '2+ étoiles' },
  { value: 3, label: '3+ étoiles' },
  { value: 4, label: '4+ étoiles' },
  { value: 5, label: '5 étoiles' }
];

// List types
export const LIST_TYPES = [
  { value: 'favorites', label: 'Mes Favoris', icon: 'Heart' },
  { value: 'to_visit', label: 'À Visiter', icon: 'MapPin' },
  { value: 'to_avoid', label: 'À Fuir', icon: 'XCircle' },
  { value: 'custom', label: 'Personnalisée', icon: 'List' }
];

// Available icons for user chichas
export const CHICHA_ICONS = [
  'Flame',
  'Star',
  'Heart',
  'Coffee',
  'Wine',
  'Sparkles',
  'Sun',
  'Moon',
  'Cloud',
  'Zap',
  'Award',
  'Gift',
  'Music',
  'Smile',
  'TrendingUp'
];

// Default center location (Paris, France)
export const DEFAULT_CENTER = {
  latitude: 48.8566,
  longitude: 2.3522
};

// Map configuration
export const MAP_CONFIG = {
  defaultZoom: 13,
  minZoom: 3,
  maxZoom: 18,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

// Pagination
export const ITEMS_PER_PAGE = 12;

// API endpoints
export const API_ENDPOINTS = {
  search: '/api/search',
  osmQuery: '/api/osm/query',
  geocode: '/api/osm/geocode',
  chichas: '/api/chichas',
  reviews: '/api/reviews',
  lists: '/api/lists'
};
