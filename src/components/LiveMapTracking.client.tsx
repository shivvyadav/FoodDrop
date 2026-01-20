'use client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from 'react-leaflet';
import { useMap } from 'react-leaflet';

type Props = {
  userLocation: [number, number];
  deliveryBoyLocation: [number, number];
};

const deliveryBoyIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/7541/7541708.png',
  iconSize: [32, 36],
  iconAnchor: [20, 40],
});

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/11083/11083660.png',
  iconSize: [32, 36],
  iconAnchor: [20, 40],
});

export default function LiveMapTrackingClient({
  userLocation,
  deliveryBoyLocation,
}: Props) {
  return (
    <MapContainer
      center={userLocation}
      zoom={15}
      scrollWheelZoom
      className="z-0 h-full w-full rounded-lg"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={userLocation} icon={userIcon}>
        <Popup>delivery location</Popup>
      </Marker>

      {deliveryBoyLocation && (
        <Marker position={deliveryBoyLocation} icon={deliveryBoyIcon}>
          <Popup>Delivery Boy</Popup>
        </Marker>
      )}
      {deliveryBoyLocation && (
        <Polyline positions={[userLocation, deliveryBoyLocation]} color="red" />
      )}
    </MapContainer>
  );
}
