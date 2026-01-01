// ReviewCard component - Display a single review
import { Star, ThumbsUp } from 'lucide-react';
import { timeAgo } from '../../utils/helpers';

export default function ReviewCard({ review }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="flex">
              {renderStars(review.rating)}
            </div>
            <span className="text-sm font-medium">{review.rating}/5</span>
          </div>
          <p className="text-sm text-gray-500">
            {timeAgo(review.created_at)}
          </p>
        </div>
      </div>

      {/* Detailed ratings */}
      {(review.cleanliness_rating || review.atmosphere_rating || review.price_rating || review.service_rating) && (
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          {review.cleanliness_rating && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Propreté:</span>
              <div className="flex">
                {renderStars(review.cleanliness_rating)}
              </div>
            </div>
          )}
          {review.atmosphere_rating && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ambiance:</span>
              <div className="flex">
                {renderStars(review.atmosphere_rating)}
              </div>
            </div>
          )}
          {review.price_rating && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Prix:</span>
              <div className="flex">
                {renderStars(review.price_rating)}
              </div>
            </div>
          )}
          {review.service_rating && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Service:</span>
              <div className="flex">
                {renderStars(review.service_rating)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Comment */}
      {review.comment && (
        <p className="text-gray-700 mb-4">{review.comment}</p>
      )}

      {/* Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="flex space-x-2 mb-4">
          {review.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Review photo ${index + 1}`}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      )}

      {/* Helpful button */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <button className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
          <ThumbsUp size={16} />
          <span>Utile ({review.helpful_count})</span>
        </button>
      </div>
    </div>
  );
}
