// ChichaList component - Display list of chichas
import ChichaCard from './ChichaCard';

export default function ChichaList({ chichas, onEdit, onDelete }) {
  if (!chichas || chichas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Aucune chicha dans votre collection</p>
        <p className="text-gray-400 text-sm mt-2">
          Cliquez sur &quot;Ajouter une chicha&quot; pour commencer
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chichas.map((chicha) => (
        <ChichaCard
          key={chicha.id}
          chicha={chicha}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
