// BarCard component - Display a single bar in search results
import Card from '../ui/Card';
import { MapPin, Star, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { formatDistance } from '../../utils/helpers';

export default function BarCard({ bar, onClick }) {
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
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <MapPin size={48} />
          </div>
        )}
        {/* Price badge */}
        {bar.price_range && (
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium">
            {bar.price_range}
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
