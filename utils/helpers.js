// Helper functions for filtering, sorting, and data manipulation

/**
 * Filter bars based on criteria
 * @param {Array} bars - Array of bars
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered bars
 */
export const filterBars = (bars, filters) => {
  let filtered = [...bars];

  // Filter by price range
  if (filters.priceRange && filters.priceRange.length > 0) {
    filtered = filtered.filter(bar => 
      filters.priceRange.includes(bar.price_range)
    );
  }

  // Filter by minimum rating
  if (filters.minRating) {
    filtered = filtered.filter(bar => 
      bar.average_rating >= filters.minRating
    );
  }

  // Filter by distance
  if (filters.maxDistance && filters.userLocation) {
    filtered = filtered.filter(bar => {
      const distance = calculateDistance(
        filters.userLocation.latitude,
        filters.userLocation.longitude,
        bar.latitude,
        bar.longitude
      );
      return distance <= filters.maxDistance;
    });
  }

  // Filter by amenities
  if (filters.amenities && filters.amenities.length > 0) {
    filtered = filtered.filter(bar => {
      return filters.amenities.every(amenity => 
        bar.amenities?.[amenity] === true
      );
    });
  }

  return filtered;
};

/**
 * Sort bars by criteria
 * @param {Array} bars - Array of bars
 * @param {string} sortBy - Sort criteria
 * @param {Object} userLocation - User's location for distance sorting
 * @returns {Array} Sorted bars
 */
export const sortBars = (bars, sortBy, userLocation = null) => {
  const sorted = [...bars];

  switch (sortBy) {
    case 'rating':
      return sorted.sort((a, b) => b.average_rating - a.average_rating);
    
    case 'reviews':
      return sorted.sort((a, b) => b.review_count - a.review_count);
    
    case 'distance':
      if (!userLocation) return sorted;
      return sorted.sort((a, b) => {
        const distA = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          a.latitude,
          a.longitude
        );
        const distB = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          b.latitude,
          b.longitude
        );
        return distA - distB;
      });
    
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    
    default:
      return sorted;
  }
};

/**
 * Calculate distance between two points using Haversine formula
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

/**
 * Format distance for display
 * @param {number} distance - Distance in kilometers
 * @returns {string} Formatted distance
 */
export const formatDistance = (distance) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance} km`;
};

/**
 * Format price range for display
 * @param {string} priceRange - Price range (€, €€, €€€)
 * @returns {string} Formatted price range
 */
export const formatPriceRange = (priceRange) => {
  return priceRange || '€€';
};

/**
 * Generate star rating display
 * @param {number} rating - Rating value (0-5)
 * @returns {string} Star rating string
 */
export const generateStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '½' : '') + 
         '☆'.repeat(emptyStars);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return d.toLocaleDateString('fr-FR', options);
};

/**
 * Format time ago
 * @param {string|Date} date - Date to format
 * @returns {string} Time ago string
 */
export const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'À l\'instant';
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
  if (diffDays < 365) return `Il y a ${Math.floor(diffDays / 30)} mois`;
  return `Il y a ${Math.floor(diffDays / 365)} ans`;
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate phone number (French format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid
 */
export const isValidPhone = (phone) => {
  const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return re.test(phone);
};
