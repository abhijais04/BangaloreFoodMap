
export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Dish {
  id: string;
  name: string;
}

export interface FoodPlace {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  lat: number;
  lng: number;
  imageUrl: string;
  address: string;
  reviews: Review[];
  dishes: Dish[];
}

export type PlaceCategory = 'Fine Dining' | 'Cafe' | 'Street Food' | 'Pub' | 'Fast Food' | 'Bakery';

export const CATEGORIES: PlaceCategory[] = ['Fine Dining', 'Cafe', 'Street Food', 'Pub', 'Fast Food', 'Bakery'];
