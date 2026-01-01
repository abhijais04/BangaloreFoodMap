
import React, { useEffect, useRef } from 'react';
import { FoodPlace } from '../types';
import { BANGALORE_CENTER } from '../constants';

interface MapDisplayProps {
  places: FoodPlace[];
  selectedPlace: FoodPlace | null;
  onMarkerClick: (place: FoodPlace) => void;
}

declare const L: any;

export const MapDisplay: React.FC<MapDisplayProps> = ({ places, selectedPlace, onMarkerClick }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([BANGALORE_CENTER.lat, BANGALORE_CENTER.lng], 12);
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker: any) => marker.remove());
    markersRef.current = {};

    // Add new markers
    places.forEach(place => {
      const marker = L.marker([place.lat, place.lng]).addTo(mapRef.current);
      
      const popupContent = `
        <div class="p-2 min-w-[150px]">
          <h4 class="font-bold text-slate-800">${place.name}</h4>
          <p class="text-xs text-slate-500">${place.category}</p>
          <div class="mt-2 flex items-center text-amber-500 font-bold">
            <span class="mr-1">★</span> ${place.rating}
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent);
      marker.on('click', () => onMarkerClick(place));
      markersRef.current[place.id] = marker;
    });
  }, [places, onMarkerClick]);

  useEffect(() => {
    if (selectedPlace && mapRef.current) {
      const marker = markersRef.current[selectedPlace.id];
      if (marker) {
        mapRef.current.setView([selectedPlace.lat, selectedPlace.lng], 15, { animate: true });
        marker.openPopup();
      }
    }
  }, [selectedPlace]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full shadow-inner z-0" />
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-2 pointer-events-none">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-semibold text-slate-600">Live Map View</span>
      </div>
    </div>
  );
};
