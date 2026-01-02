// API Route: Reviews CRUD operations
import { getReviewsByBarId, createReview } from '../../../lib/db/queries.js';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        // Get reviews for a bar
        const { barId } = req.query;
        
        if (!barId) {
          return res.status(400).json({ error: 'Bar ID is required' });
        }

        const reviews = getReviewsByBarId(parseInt(barId));
        return res.status(200).json({
          success: true,
          count: reviews.length,
          reviews
        });

      case 'POST':
        // Create a new review
        const userId = 1; // Mock user ID - replace with actual auth
        const {
          bar_id,
          rating,
          cleanliness_rating,
          atmosphere_rating,
          price_rating,
          service_rating,
          comment,
          photos = []
        } = req.body;

        if (!bar_id || !rating) {
          return res.status(400).json({ 
            error: 'Bar ID and rating are required' 
          });
        }

        if (rating < 1 || rating > 5) {
          return res.status(400).json({ 
            error: 'Rating must be between 1 and 5' 
          });
        }

        const newReview = createReview({
          bar_id,
          user_id: userId,
          rating,
          cleanliness_rating,
          atmosphere_rating,
          price_rating,
          service_rating,
          comment,
          photos
        });

        return res.status(201).json({
          success: true,
          review: newReview
        });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in reviews API:', error);
    return res.status(500).json({ 
      error: 'Operation failed',
      message: error.message 
    });
  }
}
