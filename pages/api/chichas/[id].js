// API Route: Individual chicha operations
import { 
  updateUserChicha, 
  deleteUserChicha 
} from '../../../lib/db/queries';

export default async function handler(req, res) {
  const { id } = req.query;
  const chichaId = parseInt(id);

  if (isNaN(chichaId)) {
    return res.status(400).json({ error: 'Invalid chicha ID' });
  }

  try {
    switch (req.method) {
      case 'PUT':
        // Update a chicha
        const { name, icon, notes } = req.body;
        const updated = updateUserChicha(chichaId, { name, icon, notes });
        
        if (!updated) {
          return res.status(404).json({ error: 'Chicha not found' });
        }

        return res.status(200).json({
          success: true,
          chicha: updated
        });

      case 'DELETE':
        // Delete a chicha
        const deleted = deleteUserChicha(chichaId);
        
        if (!deleted) {
          return res.status(404).json({ error: 'Chicha not found' });
        }

        return res.status(200).json({
          success: true,
          message: 'Chicha deleted successfully'
        });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in chicha API:', error);
    return res.status(500).json({ 
      error: 'Operation failed',
      message: error.message 
    });
  }
}
