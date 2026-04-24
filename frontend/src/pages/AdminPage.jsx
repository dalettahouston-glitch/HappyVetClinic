import { useEffect, useState } from "react";
import api from "@/api";
import { Trash2, Plus, X } from "lucide-react";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [vets, setVets] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddAppt, setShowAddAppt] = useState(false);
    const [apptForm, setApptForm] = useState({
        userId: "",
        petId: "",
        vetId: "",
        date: "",
        time: "",
        reason: "",
    });

    useEffect(() => {
        Promise.all([
            api.get("/users"),
            api.get("/pets"),
            api.get("/vets"),
            api.get("/appointments"),
            api.get("/services"),
        ]).then(([u, p, v, a, s]) => {
            setUsers(u.data);
            setPets(p.data);
            setVets(v.data);
            setAppointments(a.data);
            setServices(s.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const deleteUser = (id) => {
        api.delete(`/users/${id}`).then(() => setUsers(users.filter(u => u.id !== id)));
    };

    const deletePet = (id) => {
        api.delete(`/pets/${id}`).then(() => setPets(pets.filter(p => p.id !== id)));
    };

    const deleteVet = (id) => {
        api.delete(`/vets/${id}`).then(() => setVets(vets.filter(v => v.id !== id)));
    };

    const deleteAppointment = (id) => {
        api.delete(`/appointments/${id}`).then(() => setAppointments(appointments.filter(a => a.id !== id)));
    };

    const deleteService = (id) => {
        api.delete(`/services/${id}`).then(() => setServices(services.filter(s => s.id !== id)));
    };

    const handleAddAppt = async (e) => {
        e.preventDefault();
        try {
            await api.post(
                `/appointments?ownerId=${apptForm.userId}&petId=${apptForm.petId}&vetId=${apptForm.vetId}`,
                {
                    date: apptForm.date,
                    time: apptForm.time,
                    reason: apptForm.reason,
                }
            );
            const res = await api.get("/appointments");
            setAppointments(res.data);
            setShowAddAppt(false);
            setApptForm({ userId: "", petId: "", vetId: "", date: "", time: "", reason: "" });
        } catch {
            alert("Failed to create appointment.");
        }
    };

    const filteredPets = apptForm.userId
        ? pets.filter(p => p.user?.id === parseInt(apptForm.userId))
        : pets;

    const tabs = ["users", "pets", "vets", "appointments", "services"];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-medium text-gray-900">Admin Panel</h1>

            <div className="flex gap-2 border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${activeTab === tab
                            ? "border-b-2 border-teal-600 text-teal-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {loading && <p className="text-gray-500">Loading...</p>}

            {/* Users Tab */}
            {activeTab === "users" && !loading && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Name</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Username</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Email</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Role</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.username}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.role === "ROLE_ADMIN"
                                            ? "bg-purple-50 text-purple-700"
                                            : "bg-teal-50 text-teal-700"
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => deleteUser(user.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pets Tab */}
            {activeTab === "pets" && !loading && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Name</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Type</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Breed</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Age</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Owner</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map((pet) => (
                                <tr key={pet.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-4 py-3">{pet.name}</td>
                                    <td className="px-4 py-3">{pet.type}</td>
                                    <td className="px-4 py-3">{pet.breed}</td>
                                    <td className="px-4 py-3">{pet.age}</td>
                                    <td className="px-4 py-3">{pet.user?.name}</td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => deletePet(pet.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Vets Tab */}
            {activeTab === "vets" && !loading && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Name</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Specialty</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vets.map((vet) => (
                                <tr key={vet.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-4 py-3">Dr. {vet.firstName} {vet.lastName}</td>
                                    <td className="px-4 py-3">{vet.specialty}</td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => deleteVet(vet.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Appointments Tab */}
            {activeTab === "appointments" && !loading && (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowAddAppt(true)}
                            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                        >
                            <Plus size={16} />
                            Add Appointment
                        </button>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-4 py-3 font-medium text-gray-700">Date</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-700">Time</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-700">Reason</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-700">Vet</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appt) => (
                                    <tr key={appt.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3">{appt.date}</td>
                                        <td className="px-4 py-3">{appt.time}</td>
                                        <td className="px-4 py-3">{appt.reason}</td>
                                        <td className="px-4 py-3">Dr. {appt.vet?.firstName} {appt.vet?.lastName}</td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => deleteAppointment(appt.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Services Tab */}
            {activeTab === "services" && !loading && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Name</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Description</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Price</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-4 py-3">{service.name}</td>
                                    <td className="px-4 py-3">{service.description}</td>
                                    <td className="px-4 py-3">${service.price}</td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => deleteService(service.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Appointment Modal */}
            {showAddAppt && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
                        <button
                            onClick={() => setShowAddAppt(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-2xl font-medium text-gray-900 mb-6">Add Appointment</h2>
                        <form onSubmit={handleAddAppt} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                                <select
                                    required
                                    value={apptForm.userId}
                                    onChange={(e) => setApptForm({ ...apptForm, userId: e.target.value, petId: "" })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                >
                                    <option value="">Select a user</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>{u.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pet</label>
                                <select
                                    required
                                    value={apptForm.petId}
                                    onChange={(e) => setApptForm({ ...apptForm, petId: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                >
                                    <option value="">Select a pet</option>
                                    {filteredPets.map((p) => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Vet</label>
                                <select
                                    required
                                    value={apptForm.vetId}
                                    onChange={(e) => setApptForm({ ...apptForm, vetId: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                >
                                    <option value="">Select a vet</option>
                                    {vets.map((v) => (
                                        <option key={v.id} value={v.id}>Dr. {v.firstName} {v.lastName}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    required
                                    value={apptForm.date}
                                    onChange={(e) => setApptForm({ ...apptForm, date: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                <input
                                    type="time"
                                    required
                                    value={apptForm.time}
                                    onChange={(e) => setApptForm({ ...apptForm, time: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={apptForm.reason}
                                    onChange={(e) => setApptForm({ ...apptForm, reason: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    placeholder="Reason for appointment"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
                            >
                                Create Appointment
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}