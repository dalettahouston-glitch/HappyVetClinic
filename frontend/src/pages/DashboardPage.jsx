import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Heart, Calendar, PawPrint, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/api";

export default function DashboardPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [counts, setCounts] = useState({
        pets: 0,
        appointments: 0,
        vets: 0,
        services: 0,
    });
    const [recentAppointments, setRecentAppointments] = useState([]);

    useEffect(() => {
        if (!user) return;
        const isAdmin = user?.role === "ROLE_ADMIN";
        const apptUrl = isAdmin ? "/appointments" : `/appointments/user/${user?.id}`;

        Promise.all([
            api.get("/pets"),
            api.get("/appointments"),
            api.get("/vets"),
            api.get("/services"),
            api.get(apptUrl),
        ])
            .then(([pets, appointments, vets, services, myAppts]) => {
                setCounts({
                    pets: pets.data.length,
                    appointments: appointments.data.length,
                    vets: vets.data.length,
                    services: services.data.length,
                });
                setRecentAppointments(myAppts.data.slice(0, 3));
            })
            .catch((err) => console.error("Failed to load counts", err));
    }, [user]);

    const stats = [
        { label: "Total Pets", value: counts.pets, icon: PawPrint, color: "bg-teal-50 text-teal-600", path: "/pets" },
        { label: "Appointments", value: counts.appointments, icon: Calendar, color: "bg-blue-50 text-blue-600", path: "/appointments" },
        { label: "Vets", value: counts.vets, icon: Stethoscope, color: "bg-purple-50 text-purple-600", path: "/vets" },
        { label: "Services", value: counts.services, icon: Heart, color: "bg-pink-50 text-pink-600", path: "/services" },
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
                    <div
                        key={stat.label}
                        onClick={() => navigate(stat.path)}
                        className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-md hover:border-teal-300 transition-all"
                    >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-2xl font-medium text-gray-900">{stat.value}</p>
                        <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Recent Appointments</h2>
                    <button
                        onClick={() => navigate("/appointments")}
                        className="text-sm text-teal-600 hover:text-teal-700 transition"
                    >
                        View all →
                    </button>
                </div>

                {recentAppointments.length === 0 ? (
                    <p className="text-gray-500 text-sm">No appointments yet.</p>
                ) : (
                    <div className="space-y-3">
                        {recentAppointments.map((appt) => (
                            <div
                                key={appt.id}
                                onClick={() => navigate("/appointments")}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-teal-50 cursor-pointer transition"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{appt.reason}</p>
                                    <p className="text-xs text-gray-500">Dr. {appt.vet?.firstName} {appt.vet?.lastName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-teal-600">{appt.date}</p>
                                    <p className="text-xs text-gray-500">{appt.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}