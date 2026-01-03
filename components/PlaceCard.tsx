
import React from 'react';
import { FoodPlace } from '../types';
import { Star, MapPin } from './Icons';

interface PlaceCardProps {
  place: FoodPlace;
  onSelect: (place: FoodPlace) => void;
  isActive: boolean;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ 
  place, 
  onSelect, 
  isActive
}) => {
  return (
    <div 
      className={`group relative p-4 rounded-xl transition-all duration-200 cursor-pointer border-2 ${
        isActive ? 'bg-white border-indigo-500 shadow-md ring-4 ring-indigo-500/10' : 'bg-white border-transparent hover:border-slate-200 hover:shadow-sm'
      }`}
      onClick={() => onSelect(place)}
    >
      <div className="flex gap-4">
        <div className="relative flex-shrink-0">
          <img 
            src={place.imageUrl} 
            alt={place.name} 
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="absolute -top-2 -left-2 bg-white px-1.5 py-0.5 rounded-md shadow-sm border border-slate-100 flex items-center gap-1">
             <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
             <span className="text-[10px] font-bold text-slate-700">{place.rating}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 truncate leading-tight mb-0.5">{place.name}</h3>
          <p className="text-[10px] text-indigo-600 mb-1.5 font-bold uppercase tracking-wider">{place.category}</p>
          <div className="flex items-center text-[11px] text-slate-500">
            <MapPin className="w-3 h-3 mr-1 text-slate-400" />
            <span className="truncate">{place.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
