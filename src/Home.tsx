import React, { useState, useEffect } from 'react';
import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Animal } from "./constants.ts"; // Update with the correct path

const API_URL = "https://api.htf-2023.int.icapps-projects.com";
export const ANIMAL_API_URL = `${API_URL}/animals`;
export const DRONES_API_URL = `${API_URL}/drones`;

const Home = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ANIMAL_API_URL);
        const data = await response.json();
        setAnimals(data); // Assuming the API returns an array of Animal objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDrones = async () => {
      try {
        const response = await fetch(DRONES_API_URL);
        const data = await response.json();
        setDrones(data);
      } catch (error) {
        console.error('Error fetching drone data:', error);
      }
    };

    fetchData();
    fetchDrones();
  }, []); // Empty dependency array ensures useEffect runs only once when the component mounts

  return (
    <div>
      <h1 id='kaart'>Kaart</h1>
      <MapContainer center={[-3.468931501428507, -62.20852666422792]} zoom={11.5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {animals.map((animal) => (
          <Marker key={animal.id} position={[animal.latitude, animal.longitude]}>
            <Popup>
              <div>
                <img src={`https://api.htf-2023.int.icapps-projects.com/${animal.image}`} alt={animal.name} style={{ width: '100px' }} />
                <p>{animal.name}</p>
                <p>Type: {animal.type}</p>
                <p>Gender: {animal.gender}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {drones.map((drone) => (
        <Marker key={drone.id} position={[drone.latitude, drone.longitude]} icon={new L.Icon({iconUrl: 'https://cdn0.iconfinder.com/data/icons/drones-1/100/drone-512.png', iconSize: [25, 41], iconAnchor: [12, 41]})}>
          <Popup>
            <div>
              <h2>{drone.name}</h2>
              <p>Range: {drone.range} meters</p>
            </div>
          </Popup>
        </Marker>
      ))}
      </MapContainer>
    </div>
  );
};

export default Home;