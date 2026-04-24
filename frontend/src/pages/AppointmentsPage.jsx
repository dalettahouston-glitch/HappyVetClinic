import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api";
import { X, Plus } from "lucide-react";

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [formData, setFormData] = useState({
    petId: "",
    vetId: "",
    date: "",
    time: "",
    reason: "",
  });

  const isAdmin = user?.role === "ROLE_ADMIN";

  useEffect(() => {
    if (!user) return;
    Promise.all([
      isAdmin ? api.get("/appointments") : api.get(`/appointments/user/${user.id}`),
      api.get("/pets"),
      api.get("/vets"),
    ]).then(([appts, petsRes, vetsRes]) => {
      setAppointments(appts.data);
      setPets(petsRes.data);
      setVets(vetsRes.data);
      setLoading(false);
    }).catch(() => {
      setError("Failed to load data.");
      setLoading(false);
    });
  }, [user]);

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        `/appointments?ownerId=${user.id}&petId=${formData.petId}&vetId=${formData.vetId}`,
        {
          date: formData.date,
          time: formData.time,
          reason: formData.reason,
        }
      );
      const res = isAdmin ? await api.get("/appointments") : await api.get(`/appointments/user/${user.id}`);
      setAppointments(res.data);
      setShowBooking(false);
      setFormData({ petId: "", vetId: "", date: "", time: "", reason: "" });
    } catch {
      setError("Failed to book appointment.");
    }
  };

  const handleCancel = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments(appointments.filter((a) => a.id !== id));
      setSelectedAppointment(null);
    } catch {
      setError("Failed to cancel appointment.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-gray-900">Appointments</h1>
        <button
          onClick={() => setShowBooking(true)}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          <Plus size={16} />
          Book Appointment
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading appointments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && appointments.length === 0 && (
        <p className="text-gray-500">No appointments found.</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              onClick={() => setSelectedAppointment(appt)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">{appt.date}</h2>
                <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                  {appt.time}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Reason:</span> {appt.reason}</p>
                <p><span className="font-medium">Vet:</span> Dr. {appt.vet?.firstName} {appt.vet?.lastName}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setSelectedAppointment(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Appointment Details</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Date</span>
                <span>{selectedAppointment.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Time</span>
                <span>{selectedAppointment.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Reason</span>
                <span>{selectedAppointment.reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Vet</span>
                <span>Dr. {selectedAppointment.vet?.firstName} {selectedAppointment.vet?.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Specialty</span>
                <span>{selectedAppointment.vet?.specialty}</span>
              </div>
            </div>
            <button
              onClick={() => handleCancel(selectedAppointment.id)}
              className="mt-6 w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      )}

      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowBooking(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Book Appointment</h2>
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pet</label>
                <select
                  required
                  value={formData.petId}
                  onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="">Select a pet</option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>{pet.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vet</label>
                <select
                  required
                  value={formData.vetId}
                  onChange={(e) => setFormData({ ...formData, vetId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="">Select a vet</option>
                  {vets.map((vet) => (
                    <option key={vet.id} value={vet.id}>Dr. {vet.firstName} {vet.lastName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea
                  required
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Describe the reason for the appointment"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}