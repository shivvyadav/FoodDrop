// src/components/MapView.tsx
'use client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/14090/14090313.png',
  iconSize: [32, 40],
  iconAnchor: [20, 40],
  popupAnchor: [1, -34],
});

type MapViewProps = {
  position: [number, number];
  setPosition?: (pos: [number, number]) => void;
};
export default function MapView({ position, setPosition }: MapViewProps) {
  return (
    <MapContainer
      key={`${position[0]}-${position[1]}`}
      center={position}
      zoom={15}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        icon={markerIcon}
        position={position}
        draggable={true}
        eventHandlers={{
          dragend: (e: L.LeafletEvent) => {
            const marker = e.target as L.Marker;
            const newPos = marker.getLatLng();
            if (setPosition) setPosition([newPos.lat, newPos.lng]);
          },
        }}
        key={`${position[0]}-${position[1]}`}
      >
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  );
}
