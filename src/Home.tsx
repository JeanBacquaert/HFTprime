import React, { useState, useEffect } from 'react';
import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Animal } from "./constants.ts"; // Update with the correct path

const API_URL = "https://api.htf-2023.int.icapps-projects.com";
export const ANIMAL_API_URL = `${API_URL}/animals`;
export const DRONES_API_URL = `${API_URL}/drones`;

const Home = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);

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

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once when the component mounts

  console.log(animals); // Log the animals array to the console to check if it's empty or not

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {animals.map((animal) => (
        <Marker key={animal.id} position={[animal.latitude, animal.longitude]}>
          <Popup>
            <div>
              <h2>{animal.name}</h2>
              <p>Type: {animal.type}</p>
              <p>Gender: {animal.gender}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Home;