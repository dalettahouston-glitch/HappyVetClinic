import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Heart, Calendar, PawPrint, Stethoscope } from "lucide-react";
import api from "@/api";

export default function DashboardPage() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({
    pets: 0,
    appointments: 0,
    vets: 0,
    services: 0,
  });

  useEffect(() => {
    Promise.all([
      api.get("/pets"),
      api.get("/appointments"),
      api.get("/vets"),
      api.get("/services"),
    ])
      .then(([pets, appointments, vets, services]) => {
        setCounts({
          pets: pets.data.length,
          appointments: appointments.data.length,
          vets: vets.data.length,
          services: services.data.length,
        });
      })
      .catch((err) => console.error("Failed to load counts", err));
  }, []);

  const stats = [
    { label: "Total Pets", value: counts.pets, icon: PawPrint, color: "bg-teal-50 text-teal-600" },
    { label: "Appointments", value: counts.appointments, icon: Calendar, color: "bg-blue-50 text-blue-600" },
    { label: "Vets", value: counts.vets, icon: Stethoscope, color: "bg-purple-50 text-purple-600" },
    { label: "Services", value: counts.services, icon: Heart, color: "bg-pink-50 text-pink-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-gray-900">
          Welcome back, {user?.name || user?.username}!
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening at Happy Vet Clinic.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-2xl font-medium text-gray-900">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}