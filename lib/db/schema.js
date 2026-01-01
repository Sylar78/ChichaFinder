// Database schema definitions
// This file defines the data structures for the application

// Bar Chicha structure
export const BarChichaSchema = {
  id: 'number',
  name: 'string',
  osm_id: 'number',
  latitude: 'number',
  longitude: 'number',
  address: 'string',
  city: 'string',
  postal_code: 'string',
  phone: 'string',
  website: 'string',
  price_range: 'string', // '€', '€€', '€€€'
  average_rating: 'number', // 0-5
  review_count: 'number',
  amenities: {
    wifi: 'boolean',
    parking: 'boolean',
    terrace: 'boolean',
    accessible: 'boolean',
    music: 'boolean',
    food: 'boolean'
  },
  opening_hours: 'object',
  photos: 'array', // Array of photo URLs
  description: 'string',
  created_at: 'timestamp',
  updated_at: 'timestamp'
};

// User Chicha (personal collection)
export const UserChichaSchema = {
  id: 'number',
  user_id: 'number',
  name: 'string',
  icon: 'string', // Lucide icon name
  notes: 'string',
  created_at: 'timestamp'
};

// Review structure
export const ReviewSchema = {
  id: 'number',
  bar_id: 'number',
  user_id: 'number',
  rating: 'number', // 1-5
  cleanliness_rating: 'number', // 1-5
  atmosphere_rating: 'number', // 1-5
  price_rating: 'number', // 1-5
  service_rating: 'number', // 1-5
  comment: 'string',
  photos: 'array',
  helpful_count: 'number',
  created_at: 'timestamp',
  updated_at: 'timestamp'
};

// User List structure
export const UserListSchema = {
  id: 'number',
  user_id: 'number',
  name: 'string',
  type: 'string', // 'favorites', 'to_visit', 'to_avoid', 'custom'
  description: 'string',
  is_public: 'boolean',
  created_at: 'timestamp'
};

// List Item structure
export const ListItemSchema = {
  id: 'number',
  list_id: 'number',
  bar_id: 'number',
  added_at: 'timestamp'
};

// User structure
export const UserSchema = {
  id: 'number',
  email: 'string',
  username: 'string',
  password_hash: 'string',
  avatar_url: 'string',
  provider: 'string', // 'email', 'google', 'facebook'
  created_at: 'timestamp',
  last_login: 'timestamp'
};

// SQL Schema for reference
export const SQLSchema = `
-- Bars à chicha
CREATE TABLE bars_chicha (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  osm_id BIGINT UNIQUE,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  phone VARCHAR(50),
  website VARCHAR(255),
  price_range VARCHAR(10),
  average_rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  amenities JSONB,
  opening_hours JSONB,
  photos TEXT[],
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_bars_location ON bars_chicha(latitude, longitude);
CREATE INDEX idx_bars_rating ON bars_chicha(average_rating);

-- Collection personnelle de chichas
CREATE TABLE user_chichas (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Avis
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  bar_id INTEGER REFERENCES bars_chicha(id),
  user_id INTEGER REFERENCES users(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  cleanliness_rating INTEGER CHECK (cleanliness_rating BETWEEN 1 AND 5),
  atmosphere_rating INTEGER CHECK (atmosphere_rating BETWEEN 1 AND 5),
  price_rating INTEGER CHECK (price_rating BETWEEN 1 AND 5),
  service_rating INTEGER CHECK (service_rating BETWEEN 1 AND 5),
  comment TEXT,
  photos TEXT[],
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reviews_bar ON reviews(bar_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);

-- Listes d'utilisateurs
CREATE TABLE user_lists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50),
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Items de listes
CREATE TABLE list_items (
  id SERIAL PRIMARY KEY,
  list_id INTEGER REFERENCES user_lists(id),
  bar_id INTEGER REFERENCES bars_chicha(id),
  added_at TIMESTAMP DEFAULT NOW()
);

-- Utilisateurs
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  avatar_url VARCHAR(255),
  provider VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);
`;
