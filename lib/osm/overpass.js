// OpenStreetMap Overpass API client
// This file handles queries to OpenStreetMap for finding chicha bars

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';

/**
 * Build an Overpass query to search for chicha bars
 * @param {number} latitude - Center latitude
 * @param {number} longitude - Center longitude
 * @param {number} radius - Search radius in meters (default: 3000)
 * @returns {string} Overpass QL query
 */
export const buildOverpassQuery = (latitude, longitude, radius = 3000) => {
  return `[out:json][timeout:25];
(
  node["amenity"="bar"]["hookah"="yes"](around:${radius},${latitude},${longitude});
  node["amenity"="cafe"]["hookah"="yes"](around:${radius},${latitude},${longitude});
  node["amenity"="bar"]["name"~"chicha|shisha|hookah|lounge",i](around:${radius},${latitude},${longitude});
  node["amenity"="cafe"]["name"~"chicha|shisha|hookah|lounge",i](around:${radius},${latitude},${longitude});
  way["amenity"="bar"]["name"~"chicha|shisha|hookah|lounge",i](around:${radius},${latitude},${longitude});
  way["amenity"="cafe"]["name"~"chicha|shisha|hookah|lounge",i](around:${radius},${latitude},${longitude});
);
out center;`;
};

/**
 * Query OpenStreetMap Overpass API
 * @param {string} query - Overpass QL query
 * @returns {Promise<Object>} Query results
 */
export const queryOverpass = async (query) => {
  try {
    const response = await fetch(OVERPASS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error querying Overpass API:', error);
    throw error;
  }
};

/**
 * Parse Overpass API response to extract bar information
 * @param {Object} overpassData - Raw Overpass API response
 * @returns {Array} Array of bar objects
 */
export const parseOverpassData = (overpassData) => {
  if (!overpassData || !overpassData.elements) {
    return [];
  }

  const bars = [];
  const seenIds = new Set(); // Pour éviter les doublons
  
  // Traiter à la fois les nodes et les ways
  const elements = overpassData.elements.filter(el => 
    (el.type === 'node' || el.type === 'way') && el.tags
  );

  elements.forEach(element => {
    if (!element.tags) return;
    
    // Éviter les doublons
    if (seenIds.has(element.id)) return;
    seenIds.add(element.id);

    // Pour les ways, on utilise le centre calculé ou le premier nœud
    let latitude, longitude;
    if (element.type === 'node') {
      latitude = element.lat;
      longitude = element.lon;
    } else if (element.type === 'way' && element.center) {
      latitude = element.center.lat;
      longitude = element.center.lon;
    } else {
      return; // Skip si pas de coordonnées
    }

    const bar = {
      osm_id: element.id,
      latitude: latitude,
      longitude: longitude,
      name: element.tags.name || element.tags['alt_name'] || 'Bar à Chicha',
      address: buildAddress(element.tags),
      city: element.tags['addr:city'] || '',
      postal_code: element.tags['addr:postcode'] || '',
      phone: element.tags.phone || element.tags['contact:phone'] || '',
      website: element.tags.website || element.tags['contact:website'] || '',
      opening_hours: element.tags.opening_hours || '',
      amenities: {
        wifi: element.tags.internet_access === 'wlan' || element.tags.wifi === 'yes',
        parking: element.tags.parking === 'yes',
        terrace: element.tags.outdoor_seating === 'yes',
        accessible: element.tags.wheelchair === 'yes',
        music: element.tags.live_music === 'yes',
        food: element.tags.cuisine !== undefined
      },
      description: element.tags.description || '',
      price_range: determinePriceRange(element.tags),
      type: element.tags.amenity || element.tags.leisure || 'bar'
    };

    bars.push(bar);
  });

  return bars;
};

/**
 * Build a formatted address from OSM tags
 * @param {Object} tags - OSM node tags
 * @returns {string} Formatted address
 */
const buildAddress = (tags) => {
  const parts = [];
  
  if (tags['addr:housenumber']) parts.push(tags['addr:housenumber']);
  if (tags['addr:street']) parts.push(tags['addr:street']);
  
  return parts.join(' ');
};

/**
 * Determine price range from OSM tags
 * @param {Object} tags - OSM node tags
 * @returns {string} Price range (€, €€, or €€€)
 */
const determinePriceRange = (tags) => {
  // OSM doesn't have standardized pricing, so we make educated guesses
  if (tags.payment && tags.payment.includes('cash_only')) {
    return '€';
  }
  
  // Default to medium price
  return '€€';
};

/**
 * Search for chicha bars around a location
 * @param {number} latitude - Center latitude
 * @param {number} longitude - Center longitude
 * @param {number} radius - Search radius in meters
 * @returns {Promise<Array>} Array of bars
 */
export const searchChichaBars = async (latitude, longitude, radius = 3000) => {
  try {
    const query = buildOverpassQuery(latitude, longitude, radius);
    const data = await queryOverpass(query);
    const bars = parseOverpassData(data);
    return bars;
  } catch (error) {
    console.error('Error searching chicha bars:', error);
    throw error;
  }
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal
};

const toRad = (degrees) => {
  return degrees * (Math.PI / 180);
};
