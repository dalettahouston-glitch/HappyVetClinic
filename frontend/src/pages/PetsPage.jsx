import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api";
import { X } from "lucide-react";

export default function PetsPage() {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);

  const isAdmin = user?.role === "ROLE_ADMIN";

  useEffect(() => {
    if (!user) return;
    const url = isAdmin ? "/pets" : `/pets/user/${user.id}`;

    api.get(url)
      .then((response) => {
        setPets(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load pets");
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium text-gray-900">Pets</h1>

      {loading && <p className="text-gray-500">Loading pets...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && pets.length === 0 && (
        <p className="text-gray-500">No pets found.</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              onClick={() => setSelectedPet(pet)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">{pet.name}</h2>
                <span className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full">
                  {pet.type}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Breed:</span> {pet.breed}</p>
                <p><span className="font-medium">Age:</span> {pet.age}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setSelectedPet(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-medium text-gray-900 mb-6">{selectedPet.name}</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Type</span>
                <span>{selectedPet.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Breed</span>
                <span>{selectedPet.breed}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Age</span>
                <span>{selectedPet.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Owner</span>
                <span>{selectedPet.user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}