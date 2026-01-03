
import React from 'react';
import { FoodPlace } from '../types';
import { PlaceCard } from './PlaceCard';
import { Search } from './Icons';

interface UserSidebarProps {
  places: FoodPlace[];
  selectedPlaceId: string | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelect: (p: FoodPlace) => void;
}

export const UserSidebar: React.FC<UserSidebarProps> = ({
  places,
  selectedPlaceId,
  searchQuery,
  setSearchQuery,
  onSelect
}) => {
  return (
    <div className="flex flex-col h-full">
      <header className="p-6 bg-white border-b border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-amber-100">
            <span className="text-sm font-bold">🍔</span>
          </div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">Explore Bangalore</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search food, cafes, pubs..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm transition-all"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 mb-2">Curated for you</p>
        {places.map(place => (
          <PlaceCard 
            key={place.id}
            place={place}
            // Fix: Removed the non-existent isAdmin prop to resolve TypeScript error
            isActive={selectedPlaceId === place.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};
