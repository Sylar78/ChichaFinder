// ChichaCard component - Display a single chicha from user collection
import Card from '../ui/Card';
import { Edit2, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function ChichaCard({ chicha, onEdit, onDelete }) {
  // Get the icon component dynamically
  const IconComponent = Icons[chicha.icon] || Icons.Flame;

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <IconComponent className="text-white" size={32} />
          </div>
          
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
