import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Animal, Drone } from './constants.ts'; // Update with the correct path

const API_URL = 'https://api.htf-2023.int.icapps-projects.com';
const ANIMAL_API_URL = `${API_URL}/animals`;
const DRONES_API_URL = `${API_URL}/drones`;

const Home = () => {
  const [animals, setAnimals] = useState([]);
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(ANIMAL_API_URL);
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error('Error fetching animal data:', error);
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

    fetchAnimals();
    fetchDrones();
  }, []);

  return (
    <div>
      <h1 id='kaart'>Kaart</h1>
      <MapContainer center={[-3.468931501428507, -62.20852666422792]} zoom={11.5} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {animals.map((animal) => (
          <Marker key={animal.id} position={[animal.latitude, animal.longitude]} icon={new L.Icon({iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png', iconSize: [40, 40], iconAnchor: [12, 41]})}>
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
          <Circle key={drone.id} center={[drone.latitude, drone.longitude]} radius={drone.range * 1000} fillColor="red" fillOpacity={0.2} />
        ))}
      </MapContainer>
    </div>
    
  );
};

export default Home;