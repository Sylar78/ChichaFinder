// RatingStars component - Display and select star ratings
import { Star } from 'lucide-react';

export default function RatingStars({ 
  rating, 
  onChange = null, 
  size = 20,
  interactive = false 
}) {
  const handleClick = (value) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          disabled={!interactive}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <Star
            size={size}
            className={
              value <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }
          />
        </button>
      ))}
    </div>
  );
}
