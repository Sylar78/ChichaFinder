// API Route: Search for chicha bars using OpenStreetMap + local database
import { searchChichaBars, calculateDistance } from '../../../lib/osm/overpass';
import { mockBars } from '../../../lib/db/mockData';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { latitude, longitude, radius = 3000 } = req.body;

    // Validate input
    if (!latitude || !longitude) {
      return res.status(400).json({ 
        error: 'Latitude and longitude are required' 
      });
    }

    let allBars = [];

    // 1. Query OpenStreetMap
    try {
      const osmBars = await searchChichaBars(latitude, longitude, radius);
      allBars = [...osmBars];
    } catch (osmError) {
      console.warn('OSM query failed, using only local data:', osmError.message);
    }

    // 2. Add mock/local bars within radius
    const radiusInKm = radius / 1000;
    const localBars = mockBars.filter(bar => {
      const distance = calculateDistance(latitude, longitude, bar.latitude, bar.longitude);
      return distance <= radiusInKm;
    });

    // Combine and deduplicate (OSM bars have priority)
    const osmIds = new Set(allBars.map(b => b.osm_id));
    localBars.forEach(bar => {
      if (!osmIds.has(bar.osm_id)) {
        allBars.push(bar);
      }
    });

    // Calculate distance for each bar
    const barsWithDistance = allBars.map(bar => ({
      ...bar,
      distance: calculateDistance(latitude, longitude, bar.latitude, bar.longitude)
    }));

    // Sort by distance
    barsWithDistance.sort((a, b) => a.distance - b.distance);

    return res.status(200).json({
      success: true,
      count: barsWithDistance.length,
      bars: barsWithDistance,
      sources: {
        osm: allBars.length - localBars.length,
        local: localBars.length
      }
    });
  } catch (error) {
    console.error('Error in OSM query:', error);
    return res.status(500).json({ 
      error: 'Failed to query OpenStreetMap',
      message: error.message 
    });
  }
}
