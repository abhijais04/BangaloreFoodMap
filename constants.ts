
import { FoodPlace } from './types';

export const BANGALORE_CENTER = { lat: 12.9716, lng: 77.5946 };

export const INITIAL_PLACES: FoodPlace[] = [
  {
    id: '1',
    name: 'Hoy Punjab',
    description: 'A nice place to enjoy authentic Punjabi cuisine.',
    category: 'Punjabi',
    rating: 4.4,
    lat: 12.97790902836562,
    lng: 77.75688145277954,
    imageUrl: 'https://picsum.photos/seed/mtr/600/400',
    address: 'Whitefield, Bangalore',
    reviews: [
    ],
  dishes: [
    { id: 'd1', name: 'Butter Chicken' },
    { id: 'd2', name: 'Mutton Rogan Josh' },
    { id: 'd3', name: 'Chilli Laccha Paratha' }
  ],
  },
  {
    id: '2',
    name: 'Aladdin Shawarma - Brookefield',
    description: 'A place to enjoy delicious Shawarma and live Middle Eastern chicken tikka.',
    category: 'Middle Eastern',
    rating: 4.5,
    lat: 12.96623978855156,
    lng: 77.71404705767091,
    imageUrl: 'https://picsum.photos/seed/mtr/600/400',
    address: 'Brookefield, Bangalore',
    reviews: [
    ],
  dishes: [
    { id: 'd1', name: 'Lebenese Chicken Tikka' },
    { id: 'd2', name: 'Arabic Chicken Tikka' },
    { id: 'd3', name: 'Turkish Chicken Shawarma' }
  ],
  },
  {
    id: '3',
    name: 'Burger Seigneur',
    description: 'Delicous juicy burgers with soft buns',
    category: 'Burgers',
    rating: 4.3,
    lat: 12.975357674065126,
    lng: 77.60245634479664,
    imageUrl: 'https://picsum.photos/seed/mtr/600/400',
    address: 'MG Road, Bangalore',
    reviews: [
    ],
  dishes: [
    { id: 'd1', name: 'Paris Delice' },
    { id: 'd2', name: 'Detriot Lamb Burger' }
  ],
  },
  {
    id: '4',
    name: 'Blue Tokai Coffee Roasters',
    description: 'Delicous coffee, artisnal breads & nice food options.',
    category: 'Cafe',
    rating: 4.6,
    lat: 12.963599880142697,
    lng: 77.7096796576709,
    imageUrl: 'https://picsum.photos/seed/mtr/600/400',
    address: 'Brookefield, Bangalore',
    reviews: [
    ],
  dishes: [
    { id: 'd1', name: 'French Vanilla Latte' },
    { id: 'd2', name: 'Vietnamese Ice Coffee' },
    { id: 'd3', name: 'Spaghetti In mushroom florentine' },
    { id: 'd4', name: 'Spaghetti Aglio E Olio' }
  ],
  },
  {
    id: '5',
    name: 'Pizza 4P\'s Indiranagar',
    description: 'Best Sourdough Pizza In Bangalore, Exceptional service !',
    category: 'Pizzeria',
    rating: 4.9,
    lat: 12.970289354922517,
    lng: 77.6362405949975,
    imageUrl: 'https://picsum.photos/seed/mtr/600/400',
    address: 'Indiranagar, Bangalore',
    reviews: [
    ],
  dishes: [
    { id: 'd1', name: 'Salad Pizza with Burrata on top' },
    { id: 'd2', name: 'Crab Spaghetti' },
    { id: 'd3', name: 'Four cheese Pizza' },
  ],
  },
];
