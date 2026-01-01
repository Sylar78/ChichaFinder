// ChichaForm component - Form to add/edit chicha
import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { CHICHA_ICONS } from '../../utils/constants';
import * as Icons from 'lucide-react';

export default function ChichaForm({ chicha = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: chicha?.name || '',
    icon: chicha?.icon || 'Flame',
    notes: chicha?.notes || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleIconSelect = (iconName) => {
    setFormData(prev => ({ ...prev, icon: iconName }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <Input
        label="Nom de la chicha"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ex: Ma chicha préférée"
        required
        error={errors.name}
      />

      {/* Icon Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Icône
        </label>
        <div className="grid grid-cols-5 gap-3">
          {CHICHA_ICONS.map((iconName) => {
            const IconComponent = Icons[iconName];
            const isSelected = formData.icon === iconName;
            return (
              <button
                key={iconName}
                type="button"
                onClick={() => handleIconSelect(iconName)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <IconComponent 
                  size={24} 
                  className={isSelected ? 'text-primary-600' : 'text-gray-600'}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          Notes (optionnel)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Ajoutez vos notes..."
          rows={4}
          className="input"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button variant="ghost" onClick={onCancel} type="button">
          Annuler
        </Button>
        <Button variant="primary" type="submit">
          {chicha ? 'Modifier' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
}
