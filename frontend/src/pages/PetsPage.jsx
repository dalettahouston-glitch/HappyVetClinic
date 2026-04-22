import { useEffect, useState } from "react";
import { getAllPets } from "../services/petService";

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllPets()
      .then((response) => {
        setPets(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load pets");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Pets</h1>
      {pets.length === 0 ? (
        <p>No pets found.</p>
      ) : (
        <ul>
          {pets.map((pet) => (
            <li key={pet.id}>
              <strong>{pet.name}</strong> — {pet.type} ({pet.breed})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}