// Database query helpers
// This file contains reusable database query functions

// Mock database - In production, replace with actual database connection
let mockDatabase = {
  bars: [],
  userChichas: [],
  reviews: [],
  userLists: [],
  listItems: [],
  users: []
};

// (SUPPRIMÉ) Initialisation et persistance localStorage côté serveur : à faire côté client React uniquement
// Voir exemple d'utilisation dans un composant React avec useEffect

// User Chichas queries
export const getUserChichas = (userId) => {
  return mockDatabase.userChichas.filter(chicha => chicha.user_id === userId);
};

export const createUserChicha = (userId, data) => {
  const newChicha = {
    id: Date.now(),
    user_id: userId,
    ...data,
    created_at: new Date().toISOString()
  };
  mockDatabase.userChichas.push(newChicha);
  saveToStorage();
  return newChicha;
};

export const updateUserChicha = (id, data) => {
  const index = mockDatabase.userChichas.findIndex(c => c.id === id);
  if (index !== -1) {
    mockDatabase.userChichas[index] = {
      ...mockDatabase.userChichas[index],
      ...data
    };
    saveToStorage();
    return mockDatabase.userChichas[index];
  }
  return null;
};

export const deleteUserChicha = (id) => {
  const index = mockDatabase.userChichas.findIndex(c => c.id === id);
  if (index !== -1) {
    mockDatabase.userChichas.splice(index, 1);
    saveToStorage();
    return true;
  }
  return false;
};

// Bars queries
export const getBars = (filters = {}) => {
  let bars = [...mockDatabase.bars];
  
  // Apply filters
  if (filters.priceRange) {
    bars = bars.filter(bar => bar.price_range === filters.priceRange);
  }
  
  if (filters.minRating) {
    bars = bars.filter(bar => bar.average_rating >= filters.minRating);
  }
  
  if (filters.amenities) {
    bars = bars.filter(bar => {
      return filters.amenities.every(amenity => bar.amenities?.[amenity]);
    });
  }
  
  return bars;
};

export const getBarById = (id) => {
  return mockDatabase.bars.find(bar => bar.id === id);
};

export const createBar = (data) => {
  const newBar = {
    id: Date.now(),
    ...data,
    average_rating: 0,
    review_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockDatabase.bars.push(newBar);
  saveToStorage();
  return newBar;
};

// Reviews queries
export const getReviewsByBarId = (barId) => {
  return mockDatabase.reviews.filter(review => review.bar_id === barId);
};

export const createReview = (data) => {
  const newReview = {
    id: Date.now(),
    ...data,
    helpful_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  mockDatabase.reviews.push(newReview);
  
  // Update bar average rating
  const barReviews = getReviewsByBarId(data.bar_id);
  const avgRating = barReviews.reduce((sum, r) => sum + r.rating, 0) / barReviews.length;
  const barIndex = mockDatabase.bars.findIndex(b => b.id === data.bar_id);
  if (barIndex !== -1) {
    mockDatabase.bars[barIndex].average_rating = avgRating;
    mockDatabase.bars[barIndex].review_count = barReviews.length;
  }
  
  saveToStorage();
  return newReview;
};

// User Lists queries
export const getUserLists = (userId) => {
  return mockDatabase.userLists.filter(list => list.user_id === userId);
};

export const createUserList = (userId, data) => {
  const newList = {
    id: Date.now(),
    user_id: userId,
    ...data,
    created_at: new Date().toISOString()
  };
  mockDatabase.userLists.push(newList);
  saveToStorage();
  return newList;
};

export const addToList = (listId, barId) => {
  const newItem = {
    id: Date.now(),
    list_id: listId,
    bar_id: barId,
    added_at: new Date().toISOString()
  };
  mockDatabase.listItems.push(newItem);
  saveToStorage();
  return newItem;
};

export const getListItems = (listId) => {
  const items = mockDatabase.listItems.filter(item => item.list_id === listId);
  return items.map(item => {
    const bar = getBarById(item.bar_id);
    return { ...item, bar };
  });
};

// Export mock database for testing
export const getMockDatabase = () => mockDatabase;

export const resetDatabase = () => {
  mockDatabase = {
    bars: [],
    userChichas: [],
    reviews: [],
    userLists: [],
    listItems: [],
    users: []
  };
  saveToStorage();
};
