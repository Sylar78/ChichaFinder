// API Route: Search for chicha bars using bounding box
import { searchChichaBarsBbox } from '../../../lib/osm/overpassBbox';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { south, west, north, east } = req.query;

    // Validate input
    if (!south || !west || !north || !east) {
      return res.status(400).json({ 
        error: 'Bounding box coordinates (south, west, north, east) are required' 
      });
    }

    const southNum = parseFloat(south);
    const westNum = parseFloat(west);
    const northNum = parseFloat(north);
    const eastNum = parseFloat(east);

    if (isNaN(southNum) || isNaN(westNum) || isNaN(northNum) || isNaN(eastNum)) {
      return res.status(400).json({ 
        error: 'Invalid coordinates' 
      });
    }

    // Query OpenStreetMap
    const osmBars = await searchChichaBarsBbox(southNum, westNum, northNum, eastNum);

    return res.status(200).json({
      success: true,
      count: osmBars.length,
      bars: osmBars
    });
  } catch (error) {
    console.error('Error in OSM bbox query:', error);
    return res.status(500).json({ 
      error: 'Failed to query OpenStreetMap',
      message: error.message 
    });
  }
}
