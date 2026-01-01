
import React, { useState, useEffect } from 'react';
import { FoodPlace, CATEGORIES, PlaceCategory } from '../types';
import { Sparkles, Star } from './Icons';
import { enrichPlaceData } from '../services/geminiService';

interface PlaceFormProps {
  onSubmit: (place: Partial<FoodPlace>) => void;
  onCancel: () => void;
  initialData?: FoodPlace | null;
}

export const PlaceForm: React.FC<PlaceFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<Partial<FoodPlace>>({
    name: '',
    description: '',
    category: 'Cafe',
    rating: 4.5,
    lat: 12.9716,
    lng: 77.5946,
    address: '',
    imageUrl: 'https://picsum.photos/seed/food/600/400'
  });
  const [isEnriching, setIsEnriching] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleEnrich = async () => {
    if (!formData.name) return;
    setIsEnriching(true);
    const enriched = await enrichPlaceData(formData.name);
    if (enriched) {
      setFormData(prev => ({ ...prev, ...enriched }));
    }
    setIsEnriching(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-indigo-50/50">
          <h2 className="text-xl font-bold text-slate-800">{initialData ? 'Edit Food Place' : 'List New Food Place'}</h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Place Name</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                required
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="e.g. Koshy's"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              <button 
                type="button"
                onClick={handleEnrich}
                disabled={isEnriching || !formData.name}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 transition-all font-medium text-sm"
              >
                {isEnriching ? '...' : <><Sparkles className="w-4 h-4" /> AI Magic</>}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Category</label>
              <select 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as PlaceCategory })}
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Star Rating</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" step="0.1" min="0" max="5"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.rating}
                  onChange={e => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea 
              rows={3}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              placeholder="What makes this place special?"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Address</label>
            <input 
              type="text"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Full address in Bangalore"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Latitude</label>
              <input 
                type="number" step="0.000001"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.lat}
                onChange={e => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Longitude</label>
              <input 
                type="number" step="0.000001"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.lng}
                onChange={e => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
              />
            </div>
          </div>
        </form>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button 
            type="button" 
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            onClick={handleSubmit}
            className="flex-[2] px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
          >
            {initialData ? 'Save Changes' : 'Create Listing'}
          </button>
        </div>
      </div>
    </div>
  );
};
