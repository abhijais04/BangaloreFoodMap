
import { FoodPlace } from './types';

export const BANGALORE_CENTER = { lat: 12.9716, lng: 77.5946 };

export const INITIAL_PLACES: FoodPlace[] = [
  {
    id: '1',
    name: 'MTR - Mavalli Tiffin Rooms',
    description: 'A legendary heritage eatery serving authentic South Indian breakfast since 1924. Famous for its Rava Idli and filter coffee.',
    category: 'Street Food',
    rating: 4.8,
    lat: 12.9553,
    lng: 77.5855,
    imageUrl: 'https://picsum.photos/seed/mtr/600/400',
    address: 'Lalbagh Road, Bangalore',
    reviews: [
      { id: 'r1', userName: 'Anjali R.', rating: 5, comment: 'Best breakfast in town!', date: '2023-10-12' }
    ]
  },
  {
    id: '2',
    name: 'Corner House Ice Cream',
    description: 'Indias favorite dessert destination, specifically for the Death by Chocolate. A true local icon.',
    category: 'Fast Food',
    rating: 4.9,
    lat: 12.9667,
    lng: 77.6067,
    imageUrl: 'https://picsum.photos/seed/cornerhouse/600/400',
    address: 'Residency Road, Bangalore',
    reviews: [
      { id: 'r2', userName: 'Rahul K.', rating: 5, comment: 'The DBC is life-changing.', date: '2023-11-05' }
    ]
  },
  {
    id: '3',
    name: 'Toit Brewpub',
    description: 'A vibrant microbrewery in Indiranagar known for its craft beers and amazing wood-fired pizzas.',
    category: 'Pub',
    rating: 4.6,
    lat: 12.9791,
    lng: 77.6407,
    imageUrl: 'https://picsum.photos/seed/toit/600/400',
    address: 'Indiranagar, Bangalore',
    reviews: [
      { id: 'r3', userName: 'Suresh M.', rating: 4, comment: 'Great vibes and even better beer.', date: '2023-12-01' }
    ]
  }
];
