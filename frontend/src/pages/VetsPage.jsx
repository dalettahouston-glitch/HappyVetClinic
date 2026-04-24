import { useEffect, useState } from "react";
import { getAllVets } from "@/services/vetsService";
import { X } from "lucide-react";

export default function VetsPage() {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVet, setSelectedVet] = useState(null);

  useEffect(() => {
    getAllVets()
      .then((res) => {
        setVets(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load vets.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium text-gray-900">Vets</h1>

      {loading && <p className="text-gray-500">Loading vets...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vets.map((vet) => (
            <div
              key={vet.id}
              onClick={() => setSelectedVet(vet)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Dr. {vet.firstName} {vet.lastName}</h2>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Specialty:</span> {vet.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedVet && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setSelectedVet(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Dr. {selectedVet.firstName} {selectedVet.lastName}</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Specialty</span>
                <span>{selectedVet.specialty}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Vet ID</span>
                <span>{selectedVet.id}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}