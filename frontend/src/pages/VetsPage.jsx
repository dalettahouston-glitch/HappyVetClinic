import { useEffect, useState } from "react";
import { getAllAppointments } from "../services/appointmentService";
import AppointmentCard from "../components/AppointmentCard";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await getAllAppointments();
      setAppointments(response.data);
    } catch (err) {
      console.error("Error loading appointments:", err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Appointments</h1>

      {loading && <p>Loading appointments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && appointments.length === 0 && (
        <p>No appointments found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.map((appt) => (
          <AppointmentCard key={appt.id} appointment={appt} />
        ))}
      </div>
    </div>
  );
}