// Geocoding functions for address lookups using Nominatim (OpenStreetMap)

const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org';

/**
 * Search for a location by name/address
 * @param {string} query - Search query (address, city, etc.)
 * @returns {Promise<Array>} Array of matching locations
 */
export const searchLocation = async (query) => {
  try {
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      addressdetails: '1',
      limit: '5'
    });

    const response = await fetch(`${NOMINATIM_API_URL}/search?${params}`, {
      headers: {
        'User-Agent': 'ChichaAroundMe/1.0' // Nominatim requires a User-Agent
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data = await response.json();
    return data.map(location => ({
      display_name: location.display_name,
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon),
      type: location.type,
      address: location.address
    }));
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
};

/**
 * Reverse geocode coordinates to address
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {Promise<Object>} Address information
 */
export const reverseGeocode = async (latitude, longitude) => {
  try {
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString(),
      format: 'json',
      addressdetails: '1'
    });

    const response = await fetch(`${NOMINATIM_API_URL}/reverse?${params}`, {
      headers: {
        'User-Agent': 'ChichaAroundMe/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || data.error) {
      throw new Error('Location not found');
    }

    return {
      display_name: data.display_name,
      address: data.address,
      latitude: parseFloat(data.lat),
      longitude: parseFloat(data.lon)
    };
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    throw error;
  }
};

/**
 * Get user's current position using browser Geolocation API
 * @returns {Promise<Object>} Position with latitude and longitude
 */
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out';
            break;
        }
        
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

/**
 * Format address from components
 * @param {Object} address - Address object from Nominatim
 * @returns {string} Formatted address string
 */
export const formatAddress = (address) => {
  if (!address) return '';

  const parts = [];
  
  if (address.house_number) parts.push(address.house_number);
  if (address.road) parts.push(address.road);
  if (address.city || address.town || address.village) {
    parts.push(address.city || address.town || address.village);
  }
  if (address.postcode) parts.push(address.postcode);
  
  return parts.join(', ');
};
