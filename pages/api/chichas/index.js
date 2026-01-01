// API Route: User chichas CRUD operations
import { 
  getUserChichas, 
  createUserChicha, 
  updateUserChicha, 
  deleteUserChicha 
} from '../../../lib/db/queries';

export default async function handler(req, res) {
  const userId = 1; // Mock user ID - replace with actual auth

  try {
    switch (req.method) {
      case 'GET':
        // Get all user chichas
        const chichas = getUserChichas(userId);
        return res.status(200).json({
          success: true,
          count: chichas.length,
          chichas
        });

      case 'POST':
        // Create a new chicha
        const { name, icon, notes } = req.body;
        
        if (!name) {
          return res.status(400).json({ error: 'Name is required' });
        }

        const newChicha = createUserChicha(userId, { name, icon, notes });
        return res.status(201).json({
          success: true,
          chicha: newChicha
        });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in chichas API:', error);
    return res.status(500).json({ 
      error: 'Operation failed',
      message: error.message 
    });
  }
}
