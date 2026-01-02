// ChichaCard component - Display a single chicha from user collection
import Card from '../ui/Card';
import { Edit2, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function ChichaCard({ chicha, onEdit, onDelete }) {
  // Get the icon component dynamically
  const IconComponent = Icons[chicha.icon] || Icons.Flame;

  // Déterminer le chemin de l'image miniature
  const imageName = chicha.image || 'ChatGPT Image 2 janv. 2026, 14_45_06.png';
  const imagePath = `/images/chichas/${imageName}`;

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {/* Miniature */}
          <img
            src={imagePath}
            alt={chicha.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
          />
          {/* Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{chicha.name}</h3>
            {chicha.notes && (
              <p className="text-sm text-gray-600 mt-1">{chicha.notes}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(chicha)}
            className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
            title="Modifier"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(chicha.id)}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
            title="Supprimer"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </Card>
  );
}
