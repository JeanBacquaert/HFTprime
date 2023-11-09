import React, { useState, useEffect } from "react";
import { ANIMAL_API_URL, Animal } from "./constants.ts"; // Update with the correct path


const Blogs = () => {
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

  return (
    <div className="animal-list">
      <h1>Animal List</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <div className="animal-card">
              <img
                src={`https://api.htf-2023.int.icapps-projects.com/${animal.image}`}
                alt={animal.name}
                className="animal-image"
              />
              <div className="animal-info">
                <h2 >{animal.name}</h2>
                <p style={{ textTransform: "lowercase" }}>Type: {animal.type}</p>
                <p>Age: {animal.age}</p>
                <p style={{ textTransform: "lowercase" }}>Gender: {animal.gender}</p>
                <p>Weight: {animal.weight} kg</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;