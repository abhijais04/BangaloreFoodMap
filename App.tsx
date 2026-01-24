
import React, { useState, useMemo } from 'react';
import { FoodPlace } from './types';
import { INITIAL_PLACES } from './constants';
import { MapDisplay } from './components/MapDisplay';
import { UserSidebar } from './components/UserSidebar';
import { MapPin, Utensils } from './components/Icons';

const App: React.FC = () => {
  const [places] = useState<FoodPlace[]>(INITIAL_PLACES);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaces = useMemo(() => {
    return places.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [places, searchQuery]);

  const selectedPlace = useMemo(() => 
    places.find(p => p.id === selectedPlaceId) || null,
  [places, selectedPlaceId]);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar - Discovery View */}
      <aside className="w-[380px] border-r border-slate-200 flex flex-col bg-slate-50 overflow-hidden shrink-0 shadow-xl z-20">
        <div className="flex-1 overflow-hidden">
          <UserSidebar 
            places={filteredPlaces}
            selectedPlaceId={selectedPlaceId}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelect={(p) => setSelectedPlaceId(p.id)}
          />
        </div>

        {/* Branding Footer */}
        <footer className="p-4 bg-white border-t border-slate-100 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Bangalore Foodie Guide • {places.length} Curated Spots
          </p>
        </footer>
      </aside>

      {/* Map Area */}
      <main className="flex-1 relative">
        <MapDisplay 
          places={places} 
          selectedPlace={selectedPlace} 
          onMarkerClick={(p) => setSelectedPlaceId(p.id)} 
        />
        
        {/* Floating Info Panel */}
        {selectedPlace && (
          <div className="absolute bottom-8 right-8 w-96 bg-white rounded-2xl shadow-2xl border border-white z-[1000] overflow-hidden animate-in slide-in-from-bottom-4 duration-500 flex flex-col max-h-[85vh]">
            <div className="relative shrink-0">
              <img 
                src={selectedPlace.imageUrl} 
                className="w-full h-44 object-cover" 
                alt={selectedPlace.name} 
              />
              <button 
                onClick={() => setSelectedPlaceId(null)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/20 backdrop-blur-md text-white rounded-full hover:bg-black/40 transition-colors font-bold"
              >&times;</button>
              <div className="absolute bottom-4 left-4">
                 <span className="px-3 py-1 bg-white text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg border border-slate-100">
                    {selectedPlace.category}
                 </span>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-black text-slate-800 tracking-tight">{selectedPlace.name}</h2>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-600 rounded-lg">
                   <span className="text-sm font-bold">★</span>
                   <span className="text-sm font-black">{selectedPlace.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-slate-500 mb-6 leading-relaxed font-medium italic">
                "{selectedPlace.description}"
              </p>

              {/* Dishes Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Utensils className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Must-Try Dishes</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {selectedPlace.dishes.map((dish) => (
                    <div key={dish.id} className="flex justify-between items-center bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-100">
                      <span className="text-sm font-bold text-slate-700">✨ {dish.name}</span>
                    </div>
                  ))}
                  {selectedPlace.dishes.length === 0 && (
                    <p className="text-xs text-slate-400 italic py-2">No dishes listed for this place.</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-400 border-t border-slate-50 pt-4">
                <MapPin className="w-4 h-4 text-slate-300" />
                <span className="uppercase tracking-wide">{selectedPlace.address}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
