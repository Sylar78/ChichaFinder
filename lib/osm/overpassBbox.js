// OpenStreetMap Overpass API client with bounding box support
const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';

/**
 * Build an Overpass query to search for chicha bars in a bounding box
 * @param {number} south - South latitude
 * @param {number} west - West longitude
 * @param {number} north - North latitude
 * @param {number} east - East longitude
 * @returns {string} Overpass QL query
 */
export const buildOverpassQueryBbox = (south, west, north, east) => {
  const bbox = `${south},${west},${north},${east}`;
  return `[out:json][timeout:25];
(
  // Filtres spécifiques chichas - commentés pour voir tous les établissements
  // node["amenity"~"bar|cafe|restaurant"]["name"~"chicha|shisha|hookah|narguilé",i](${bbox});
  // way["amenity"~"bar|cafe|restaurant"]["name"~"chicha|shisha|hookah|narguilé",i](${bbox});
  // node["amenity"="shisha_lounge"](${bbox});
  // way["amenity"="shisha_lounge"](${bbox});
  // node["amenity"="bar"]["hookah"="yes"](${bbox});
  // way["amenity"="bar"]["hookah"="yes"](${bbox});
  // node["amenity"="cafe"]["hookah"="yes"](${bbox});
  // way["amenity"="cafe"]["hookah"="yes"](${bbox});
  
  // Afficher TOUS les bars, cafés et restaurants pour tester
  node["amenity"~"bar|cafe|restaurant"](${bbox});
  way["amenity"~"bar|cafe|restaurant"](${bbox});
);
out center tags;`;
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
  const seenIds = new Set();
  
  const elements = overpassData.elements.filter(el => 
    (el.type === 'node' || el.type === 'way') && el.tags
  );

  elements.forEach(element => {
    if (!element.tags) return;
    
    if (seenIds.has(element.id)) return;
    seenIds.add(element.id);

    let latitude, longitude;
    if (element.type === 'node') {
      latitude = element.lat;
      longitude = element.lon;
    } else if (element.type === 'way' && element.center) {
      latitude = element.center.lat;
      longitude = element.center.lon;
    } else {
      return;
    }

    const name = element.tags.name || element.tags['alt_name'] || '';
    
    const bar = {
      osm_id: element.id,
      latitude: latitude,
      longitude: longitude,
      name: name || 'Bar à Chicha',
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

const buildAddress = (tags) => {
  const parts = [];
  if (tags['addr:housenumber']) parts.push(tags['addr:housenumber']);
  if (tags['addr:street']) parts.push(tags['addr:street']);
  return parts.join(' ');
};

const determinePriceRange = (tags) => {
  if (tags.payment && tags.payment.includes('cash_only')) {
    return '€';
  }
  return '€€';
};

/**
 * Search for chicha bars in a bounding box
 * @param {number} south - South latitude
 * @param {number} west - West longitude
 * @param {number} north - North latitude
 * @param {number} east - East longitude
 * @returns {Promise<Array>} Array of bars
 */
export const searchChichaBarsBbox = async (south, west, north, east) => {
  try {
    console.log(`[overpassBbox] Searching in bbox: ${south},${west},${north},${east}`);
    const query = buildOverpassQueryBbox(south, west, north, east);
    console.log('[overpassBbox] Query:', query);
    
    const data = await queryOverpass(query);
    console.log('[overpassBbox] Raw data received:', data);
    
    const bars = parseOverpassData(data);
    console.log(`[overpassBbox] Parsed ${bars.length} bars`);
    
    return bars;
  } catch (error) {
    console.error('[overpassBbox] Error searching chicha bars with bbox:', error);
    throw error;
  }
};
