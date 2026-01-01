// Mock data for demonstration - Bars à chicha dans la région Île-de-France
export const mockBars = [
  {
    id: 1,
    osm_id: 'demo_1',
    name: 'Black Iris Lounge',
    latitude: 48.9967540,
    longitude: 1.7150009,
    address: '6 & 8 Allée de Chantereine LOT 9',
    city: 'Mantes-la-Jolie',
    postal_code: '78200',
    phone: '+33 1 XX XX XX XX',
    website: '',
    price_range: '€€',
    average_rating: 5.0,
    review_count: 9,
    amenities: {
      wifi: true,
      parking: true,
      terrace: false,
      accessible: true,
      music: true,
      food: true
    },
    opening_hours: 'Lun-Dim: 14h-2h',
    photos: [],
    description: 'Bar à chicha avec une ambiance conviviale et une large sélection de saveurs.',
    type: 'bar'
  },
  {
    id: 2,
    osm_id: 'demo_2',
    name: 'Le Lounge Oriental',
    latitude: 48.8566,
    longitude: 2.3522,
    address: '123 Rue de Rivoli',
    city: 'Paris',
    postal_code: '75001',
    phone: '+33 1 23 45 67 89',
    website: 'https://example.com',
    price_range: '€€€',
    average_rating: 4.5,
    review_count: 42,
    amenities: {
      wifi: true,
      parking: false,
      terrace: true,
      accessible: true,
      music: true,
      food: true
    },
    opening_hours: 'Lun-Dim: 18h-2h',
    photos: [],
    description: 'Bar à chicha premium au cœur de Paris avec une décoration orientale authentique.',
    type: 'bar'
  },
  {
    id: 3,
    osm_id: 'demo_3',
    name: 'Shisha Paradise',
    latitude: 48.8738,
    longitude: 2.2950,
    address: '45 Avenue des Champs-Élysées',
    city: 'Paris',
    postal_code: '75008',
    phone: '+33 1 34 56 78 90',
    website: 'https://shisha-paradise.fr',
    price_range: '€€€',
    average_rating: 4.7,
    review_count: 128,
    amenities: {
      wifi: true,
      parking: true,
      terrace: true,
      accessible: true,
      music: true,
      food: true
    },
    opening_hours: 'Lun-Dim: 16h-3h',
    photos: [],
    description: 'Le plus grand lounge à chicha de Paris. Ambiance VIP, DJ tous les soirs.',
    type: 'bar'
  },
  {
    id: 4,
    osm_id: 'demo_4',
    name: 'Café Narguilé',
    latitude: 48.9924,
    longitude: 1.7185,
    address: '15 Rue Nationale',
    city: 'Mantes-la-Jolie',
    postal_code: '78200',
    phone: '+33 1 45 67 89 01',
    website: '',
    price_range: '€',
    average_rating: 4.2,
    review_count: 34,
    amenities: {
      wifi: true,
      parking: false,
      terrace: true,
      accessible: false,
      music: false,
      food: true
    },
    opening_hours: 'Mar-Dim: 15h-23h',
    photos: [],
    description: 'Café traditionnel avec chichas et spécialités orientales.',
    type: 'cafe'
  },
  {
    id: 5,
    osm_id: 'demo_5',
    name: 'Hookah Lounge 78',
    latitude: 49.0002,
    longitude: 1.7128,
    address: '28 Boulevard des Cygnes',
    city: 'Mantes-la-Jolie',
    postal_code: '78200',
    phone: '+33 1 56 78 90 12',
    website: 'https://hookahlounge78.fr',
    price_range: '€€',
    average_rating: 4.6,
    review_count: 67,
    amenities: {
      wifi: true,
      parking: true,
      terrace: false,
      accessible: true,
      music: true,
      food: true
    },
    opening_hours: 'Lun-Dim: 17h-1h',
    photos: [],
    description: 'Lounge moderne avec terrasse couverte et large choix de saveurs.',
    type: 'bar'
  }
];

// Initialize mock data in localStorage if not exists
export const initializeMockData = () => {
  if (typeof window !== 'undefined') {
    const existingData = localStorage.getItem('chichaAroundMeData');
    if (!existingData) {
      const initialData = {
        bars: mockBars,
        userChichas: [],
        reviews: [],
        userLists: [],
        listItems: [],
        users: []
      };
      localStorage.setItem('chichaAroundMeData', JSON.stringify(initialData));
      console.log('✅ Données de démonstration initialisées');
    }
  }
};
