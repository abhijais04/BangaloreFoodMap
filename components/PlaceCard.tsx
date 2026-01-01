
import React from 'react';
import { FoodPlace } from '../types';
import { Star, Trash, Edit, MapPin } from './Icons';

interface PlaceCardProps {
  place: FoodPlace;
  onEdit: (place: FoodPlace) => void;
  onDelete: (id: string) => void;
  onSelect: (place: FoodPlace) => void;
  isActive: boolean;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onEdit, onDelete, onSelect, isActive }) => {
  return (
    <div 
      className={`group relative p-4 rounded-xl transition-all duration-200 cursor-pointer border-2 ${
        isActive ? 'bg-indigo-50 border-indigo-500 shadow-md' : 'bg-white border-transparent hover:border-slate-200 hover:shadow-sm'
      }`}
      onClick={() => onSelect(place)}
    >
      <div className="flex gap-4">
        <img 
          src={place.imageUrl} 
          alt={place.name} 
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-slate-800 truncate pr-2">{place.name}</h3>
            <span className="flex items-center gap-1 text-sm font-medium text-amber-500">
              <Star className="w-3 h-3 fill-amber-500" />
              {place.rating}
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">{place.category}</p>
          <div className="flex items-center text-xs text-slate-400">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate">{place.address}</span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(place); }}
          className="p-1.5 bg-white shadow-sm border border-slate-200 rounded-md hover:text-indigo-600 transition-colors"
        >
          <Edit className="w-3.5 h-3.5" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(place.id); }}
          className="p-1.5 bg-white shadow-sm border border-slate-200 rounded-md hover:text-red-600 transition-colors"
        >
          <Trash className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
