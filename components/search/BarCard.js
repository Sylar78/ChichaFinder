// BarCard component - Display a single bar in search results
import Card from '../ui/Card';
import { MapPin, Star, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { formatDistance } from '../../utils/helpers';
import { useEffect, useState } from 'react';

  // Exemple : persistance de la collection utilisateur côté client
  const [userChichas, setUserChichas] = useState([]);

  useEffect(() => {
    // Charger la collection depuis localStorage au montage
    const saved = typeof window !== 'undefined' ? localStorage.getItem('chichaAroundMeData') : null;
    if (saved) {
      try {
        setUserChichas(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    // Sauvegarder la collection à chaque modification
    if (userChichas.length > 0 && typeof window !== 'undefined') {
      localStorage.setItem('chichaAroundMeData', JSON.stringify(userChichas));
    }
  }, [userChichas]);

  return (
    <Card onClick={() => onClick(bar)} hover>
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {bar.photos && bar.photos.length > 0 ? (
          <Image
            src={bar.photos[0]}
            alt={bar.name}
            fill
            className="object-cover"
          />
        ) : bar.image ? (
          <Image
            src={`/images/chichas/${bar.image}`}
            alt={bar.name}
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src={bar.defaultImage || "/images/chichas/ChatGPT Image 2 janv. 2026, 14_45_06.png"}
            alt="Chicha par défaut"
            fill
            className="object-cover"
          />
        )}
        {/* Price badge + Rating below */}
        {bar.price_range && (
          <div className="absolute top-3 right-3 flex flex-col items-end">
            <div className="bg-white px-3 py-1 rounded-full text-sm font-medium mb-1">
              {bar.price_range}
            </div>
            {/* Note sous le prix */}
            <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded-full text-xs font-semibold text-yellow-800 shadow">
              <Star size={14} className="text-yellow-400 fill-current mr-1" />
              {bar.average_rating > 0 ? bar.average_rating.toFixed(1) : 'N/A'}
              {bar.review_count > 0 && (
                <span className="ml-1 text-gray-500 font-normal">({bar.review_count})</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {bar.name}
        </h3>

        {/* Address */}
        {bar.address && (
          <p className="text-sm text-gray-600 mb-2 flex items-center">
            <MapPin size={14} className="mr-1" />
            {bar.address}, {bar.city}
          </p>
        )}

        {/* Rating & Distance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium">
              {bar.average_rating > 0 ? bar.average_rating.toFixed(1) : 'N/A'}
            </span>
            {bar.review_count > 0 && (
              <span className="text-sm text-gray-500">
                ({bar.review_count})
              </span>
            )}
          </div>

          {bar.distance !== undefined && (
            <span className="text-sm text-gray-600">
              {formatDistance(bar.distance)}
            </span>
          )}
        </div>

        {/* Amenities */}
        {bar.amenities && (
          <div className="mt-3 flex flex-wrap gap-2">
            {bar.amenities.wifi && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                Wi-Fi
              </span>
            )}
            {bar.amenities.parking && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                Parking
              </span>
            )}
            {bar.amenities.terrace && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                Terrasse
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
