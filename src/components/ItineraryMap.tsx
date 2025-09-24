import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { ItineraryStop } from '../types';

// Fix default marker icon issue in Leaflet + Webpack
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface ItineraryMapProps {
  stops: ItineraryStop[];
  selectedStopId?: string | null;
  onSelectStop?: (stopId: string) => void;
}

export const ItineraryMap: React.FC<ItineraryMapProps> = ({ stops, selectedStopId, onSelectStop }) => {
  if (!stops || stops.length === 0) {
    return <div className="text-gray-400 text-center py-8">No locations to display on map.</div>;
  }
  // Center map on first stop
  const center: LatLngTuple = [stops[0].coordinates.latitude, stops[0].coordinates.longitude];

  return (
  <MapContainer center={center} zoom={8} scrollWheelZoom={true} className="w-full h-96 rounded-2xl shadow-lg">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stops.map((stop) => (
        <Marker
          key={stop.id}
          position={[stop.coordinates.latitude, stop.coordinates.longitude]}
          eventHandlers={onSelectStop ? {
            click: () => onSelectStop(stop.id)
          } : undefined}
        >
          <Popup>
            <div>
              <strong>{stop.name}</strong><br />
              Day {stop.day}<br />
              Activities: {stop.activities.join(', ')}<br />
              Est. Cost: ₹{stop.estimatedCost.toLocaleString()}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
