import { NavLink, useNavigate } from "react-router-dom";
import {
    Home,
    PawPrint,
    Stethoscope,
    Calendar,
    Wrench,
    LogOut,
    ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Pets", icon: PawPrint, path: "/pets" },
    { name: "Vets", icon: Stethoscope, path: "/vets" },
    { name: "Appointments", icon: Calendar, path: "/appointments" },
    { name: "Services", icon: Wrench, path: "/services" },
];

export default function Sidebar() {
    const { user, logout } = useAuth();
    const isAdmin = user?.role === "ROLE_ADMIN";

    return (
        <aside className="w-64 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col p-4">
            <div className="flex items-center gap-2 mb-8 px-2">
                <div className="w-8 h-8 bg-teal-600 rounded-lg" />
                <h1 className="text-xl font-medium">Happy Vet Clinic</h1>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                                ${isActive
                                    ? "bg-teal-600 text-white"
                                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}

                {isAdmin && (
                    <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                            ${isActive
                                ? "bg-teal-600 text-white"
                                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            }`
                        }
                    >
                        <ShieldCheck size={20} />
                        <span>Admin</span>
                    </NavLink>
                )}
            </nav>

            <div className="mt-6">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors w-full"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}