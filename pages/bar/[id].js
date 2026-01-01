// Bar detail page - [id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import ReviewCard from '../../components/reviews/ReviewCard';
import RatingStars from '../../components/reviews/RatingStars';
import Button from '../../components/ui/Button';
import { MapPin, Phone, Globe, Clock, Star, Wifi, Car, Sun } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapView = dynamic(
  () => import('../../components/map/MapView'),
  { ssr: false }
);

export default function BarDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [bar, setBar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // In a real app, fetch bar details from API using OSM ID
      // For now, we'll create a mock bar
      const mockBar = {
        osm_id: id,
        name: 'Le Lounge Oriental',
        latitude: 48.8566,
        longitude: 2.3522,
        address: '123 Rue de la Paix',
        city: 'Paris',
        postal_code: '75001',
        phone: '+33 1 23 45 67 89',
        website: 'https://example.com',
        price_range: '€€',
        average_rating: 4.5,
        review_count: 42,
        amenities: {
          wifi: true,
          parking: true,
          terrace: true,
          accessible: false,
          music: true,
          food: true
        },
        opening_hours: 'Lun-Dim: 18h-2h',
        description: 'Un bar à chicha convivial avec une ambiance chaleureuse et une large sélection de saveurs.',
        photos: []
      };
      
      setBar(mockBar);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Layout title="Chargement...">
        <div className="container py-12">
          <div className="text-center">Chargement...</div>
        </div>
      </Layout>
    );
  }

  if (!bar) {
    return (
      <Layout title="Bar non trouvé">
        <div className="container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Bar non trouvé</h1>
            <Button onClick={() => router.push('/recherche')}>
              Retour à la recherche
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${bar.name} - ChichaAroundMe`}>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{bar.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <RatingStars rating={Math.round(bar.average_rating)} size={20} />
              <span className="text-lg font-medium ml-2">
                {bar.average_rating.toFixed(1)}
              </span>
              <span className="text-gray-500">
                ({bar.review_count} avis)
              </span>
            </div>
            {bar.price_range && (
              <span className="text-lg font-medium text-primary-600">
                {bar.price_range}
              </span>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {bar.description && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">À propos</h2>
                <p className="text-gray-700">{bar.description}</p>
              </div>
            )}

            {/* Amenities */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Équipements</h2>
              <div className="grid grid-cols-2 gap-4">
                {bar.amenities.wifi && (
                  <div className="flex items-center space-x-2">
                    <Wifi size={20} className="text-primary-600" />
                    <span>Wi-Fi gratuit</span>
                  </div>
                )}
                {bar.amenities.parking && (
                  <div className="flex items-center space-x-2">
                    <Car size={20} className="text-primary-600" />
                    <span>Parking</span>
                  </div>
                )}
                {bar.amenities.terrace && (
                  <div className="flex items-center space-x-2">
                    <Sun size={20} className="text-primary-600" />
                    <span>Terrasse</span>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Avis</h2>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Aucun avis pour le moment</p>
              )}
            </div>

            {/* Map */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Localisation</h2>
              <div style={{ height: '300px' }}>
                <MapView
                  center={{ latitude: bar.latitude, longitude: bar.longitude }}
                  bars={[bar]}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Informations</h3>
              <div className="space-y-3">
                {bar.address && (
                  <div className="flex items-start space-x-3">
                    <MapPin size={20} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900">{bar.address}</p>
                      <p className="text-sm text-gray-600">
                        {bar.postal_code} {bar.city}
                      </p>
                    </div>
                  </div>
                )}
                {bar.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-gray-400" />
                    <a href={`tel:${bar.phone}`} className="text-sm text-primary-600 hover:underline">
                      {bar.phone}
                    </a>
                  </div>
                )}
                {bar.website && (
                  <div className="flex items-center space-x-3">
                    <Globe size={20} className="text-gray-400" />
                    <a 
                      href={bar.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:underline"
                    >
                      Site web
                    </a>
                  </div>
                )}
                {bar.opening_hours && (
                  <div className="flex items-start space-x-3">
                    <Clock size={20} className="text-gray-400 mt-0.5" />
                    <p className="text-sm text-gray-900">{bar.opening_hours}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
              <Button variant="primary" className="w-full">
                Laisser un avis
              </Button>
              <Button variant="outline" className="w-full">
                Ajouter aux favoris
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
