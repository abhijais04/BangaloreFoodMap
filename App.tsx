
import React, { useState, useEffect, useMemo } from 'react';
import { FoodPlace } from './types';
import { INITIAL_PLACES } from './constants';
import { MapDisplay } from './components/MapDisplay';
import { PlaceCard } from './components/PlaceCard';
import { PlaceForm } from './components/PlaceForm';
import { Plus, Search, MapPin } from './components/Icons';

const App: React.FC = () => {
  const [places, setPlaces] = useState<FoodPlace[]>(() => {
    const saved = localStorage.getItem('bangalore-food-places');
    return saved ? JSON.parse(saved) : INITIAL_PLACES;
  });
  
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<FoodPlace | null>(null);

  useEffect(() => {
    localStorage.setItem('bangalore-food-places', JSON.stringify(places));
  }, [places]);

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

  const handleAddPlace = (newPlaceData: Partial<FoodPlace>) => {
    const newPlace: FoodPlace = {
      ...newPlaceData as FoodPlace,
      id: crypto.randomUUID(),
      reviews: [],
      imageUrl: newPlaceData.imageUrl || `https://picsum.photos/seed/${newPlaceData.name}/600/400`
    };
    setPlaces(prev => [...prev, newPlace]);
    setIsFormOpen(false);
    setSelectedPlaceId(newPlace.id);
  };

  const handleEditPlace = (updatedPlaceData: Partial<FoodPlace>) => {
    if (!editingPlace) return;
    setPlaces(prev => prev.map(p => p.id === editingPlace.id ? { ...p, ...updatedPlaceData } : p));
    setEditingPlace(null);
    setIsFormOpen(false);
  };

  const handleDeletePlace = (id: string) => {
    if (confirm('Are you sure you want to remove this place from the map?')) {
      setPlaces(prev => prev.filter(p => p.id !== id));
      if (selectedPlaceId === id) setSelectedPlaceId(null);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar Admin Panel */}
      <aside className="w-[400px] border-r border-slate-200 flex flex-col bg-slate-50 overflow-hidden shrink-0">
        <header className="p-6 bg-white border-b border-slate-100 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold italic shadow-lg shadow-indigo-200">B</div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">Foodie Admin</h1>
            </div>
            <button 
              onClick={() => { setEditingPlace(null); setIsFormOpen(true); }}
              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search Bangalore food spots..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map(place => (
              <PlaceCard 
                key={place.id}
                place={place}
                isActive={selectedPlaceId === place.id}
                onSelect={(p) => setSelectedPlaceId(p.id)}
                onEdit={(p) => { setEditingPlace(p); setIsFormOpen(true); }}
                onDelete={handleDeletePlace}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400 space-y-2">
              <p className="text-sm italic">No matching places found</p>
            </div>
          )}
        </div>

        <footer className="p-4 bg-white border-t border-slate-100 text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
          {places.length} Curated Spots in Bangalore
        </footer>
      </aside>

      {/* Main Content: Map */}
      <main className="flex-1 relative">
        <MapDisplay 
          places={places} 
          selectedPlace={selectedPlace} 
          onMarkerClick={(p) => setSelectedPlaceId(p.id)} 
        />
        
        {/* Floating Detail Panel when a place is selected */}
        {selectedPlace && (
          <div className="absolute bottom-8 right-8 w-80 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 z-[1000] p-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">{selectedPlace.name}</h2>
              <button 
                onClick={() => setSelectedPlaceId(null)}
                className="text-slate-400 hover:text-slate-600"
              >&times;</button>
            </div>
            <img 
              src={selectedPlace.imageUrl} 
              className="w-full h-32 rounded-xl object-cover mb-4" 
              alt={selectedPlace.name} 
            />
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              {selectedPlace.description}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full w-fit">
              <MapPin className="w-3 h-3" />
              {selectedPlace.address}
            </div>
          </div>
        )}
      </main>

      {/* Admin Form Modal */}
      {isFormOpen && (
        <PlaceForm 
          initialData={editingPlace}
          onCancel={() => { setIsFormOpen(false); setEditingPlace(null); }}
          onSubmit={editingPlace ? handleEditPlace : handleAddPlace}
        />
      )}
    </div>
  );
};

export default App;
