// API Route: Search bars with filters
import { getBars } from '../../lib/db/queries';
import { filterBars, sortBars } from '../../utils/helpers';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      filters = {}, 
      sortBy = 'rating',
      userLocation = null 
    } = req.body;

    // Get all bars from database
    let bars = getBars();

    // Apply filters
    if (Object.keys(filters).length > 0) {
      bars = filterBars(bars, filters);
    }

    // Sort results
    bars = sortBars(bars, sortBy, userLocation);

    return res.status(200).json({
      success: true,
      count: bars.length,
      bars
    });
  } catch (error) {
    console.error('Error searching bars:', error);
    return res.status(500).json({ 
      error: 'Search failed',
      message: error.message 
    });
  }
}
