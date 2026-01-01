// Collection page - User's personal chicha collection
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ChichaList from '../components/chicha/ChichaList';
import ChichaForm from '../components/chicha/ChichaForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';

export default function Collection() {
  const [chichas, setChichas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChicha, setEditingChicha] = useState(null);

  useEffect(() => {
    fetchChichas();
  }, []);

  const fetchChichas = async () => {
    try {
      const response = await fetch('/api/chichas');
      const data = await response.json();
      if (data.success) {
        setChichas(data.chichas);
      }
    } catch (error) {
      console.error('Error fetching chichas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddChicha = async (formData) => {
    try {
      const response = await fetch('/api/chichas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setChichas([...chichas, data.chicha]);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error adding chicha:', error);
    }
  };

  const handleUpdateChicha = async (formData) => {
    try {
      const response = await fetch(`/api/chichas/${editingChicha.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setChichas(chichas.map(c => c.id === editingChicha.id ? data.chicha : c));
        setIsModalOpen(false);
        setEditingChicha(null);
      }
    } catch (error) {
      console.error('Error updating chicha:', error);
    }
  };

  const handleDeleteChicha = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette chicha ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/chichas/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setChichas(chichas.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Error deleting chicha:', error);
    }
  };

  const handleEdit = (chicha) => {
    setEditingChicha(chicha);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingChicha(null);
  };

  const handleOpenAddModal = () => {
    setEditingChicha(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <Layout title="Ma Collection - ChichaAroundMe">
        <div className="container py-12">
          <div className="text-center">Chargement...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Ma Collection - ChichaAroundMe">
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ma Collection</h1>
            <p className="text-gray-600 mt-2">
              Gérez votre collection personnelle de chichas
            </p>
          </div>
          <Button onClick={handleOpenAddModal} className="flex items-center space-x-2">
            <Plus size={20} />
            <span>Ajouter une chicha</span>
          </Button>
        </div>

        {/* Chichas List */}
        <ChichaList
          chichas={chichas}
          onEdit={handleEdit}
          onDelete={handleDeleteChicha}
        />

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingChicha ? 'Modifier la chicha' : 'Ajouter une chicha'}
        >
          <ChichaForm
            chicha={editingChicha}
            onSubmit={editingChicha ? handleUpdateChicha : handleAddChicha}
            onCancel={handleCloseModal}
          />
        </Modal>
      </div>
    </Layout>
  );
}
