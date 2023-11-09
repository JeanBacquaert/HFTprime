import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Animal, Drone } from './constants.ts'; 

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

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div>
      <h1 id='kaart'>Map</h1>
      <MapContainer center={[-3.468931501428507, -62.20852666422792]} zoom={11.5} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* animals rendering map */}
        {animals.map((animal) => {
          const isInsideCircle = drones.some((drone) => {
            const distance = getDistanceFromLatLonInKm(animal.latitude, animal.longitude, drone.latitude, drone.longitude);
            return distance <= drone.range;
          });

          return (
            <Marker
              key={animal.id}
              position={[animal.latitude, animal.longitude]}
              icon={new L.Icon({ iconUrl: isInsideCircle ? 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png' : 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png', iconSize: [40, 40], iconAnchor: [12, 41] })}
            >
              <Popup>
                <div>
                  <img src={`https://api.htf-2023.int.icapps-projects.com/${animal.image}`} alt={animal.name} style={{ width: '100px' }} />
                  <p>{animal.name}</p>
                  <p>Type: {animal.type}</p>
                  <p>Gender: {animal.gender}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
        {/* drones rendering map */}
        {drones.map((drone) => (
          <Circle
            key={drone.id}
            center={[drone.latitude, drone.longitude]}
            radius={drone.range * 1000}
            fillColor="blue"
            fillOpacity={0.2}
          >
            <Popup>
              <div>
                <img src={`https://api.htf-2023.int.icapps-projects.com/${drone.image}`} alt={drone.name} style={{ width: '100px' }} />
                <h2>{drone.name}</h2>
                <p>Range: {drone.range} km</p>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default Home;