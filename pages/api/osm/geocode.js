// API Route: Geocoding (search location and reverse geocode)
import { searchLocation, reverseGeocode } from '../../../lib/osm/geocoding';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, latitude, longitude, action = 'search' } = req.body;

    if (action === 'search') {
      // Search for a location by name/address
      if (!query) {
        return res.status(400).json({ error: 'Query is required' });
      }

      const locations = await searchLocation(query);
      return res.status(200).json({
        success: true,
        count: locations.length,
        locations
      });
    } 
    else if (action === 'reverse') {
      // Reverse geocode coordinates to address
      if (!latitude || !longitude) {
        return res.status(400).json({ 
          error: 'Latitude and longitude are required' 
        });
      }

      const address = await reverseGeocode(latitude, longitude);
      return res.status(200).json({
        success: true,
        address
      });
    } 
    else {
      return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Error in geocoding:', error);
    return res.status(500).json({ 
      error: 'Geocoding failed',
      message: error.message 
    });
  }
}
