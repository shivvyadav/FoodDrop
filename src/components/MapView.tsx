// src/components/MapView.tsx
'use client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useMap } from 'react-leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/14090/14090313.png',
  iconSize: [32, 36],
  iconAnchor: [20, 40],
  popupAnchor: [1, -34],
});

type MapViewProps = {
  position: [number, number];
  setPosition?: (pos: [number, number]) => void;
};
export default function MapView({ position, setPosition }: MapViewProps) {
  function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    map.setView(center);
    return null;
  }
  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={true}
      className="z-0 h-full w-full"
    >
      <ChangeView center={position} />
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
      >
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  );
}
