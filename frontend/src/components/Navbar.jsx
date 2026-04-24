import { useAuth } from "@/context/AuthContext";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard";
    if (path === "/pets") return "Pets";
    if (path === "/vets") return "Vets";
    if (path === "/appointments") return "Appointments";
    if (path === "/services") return "Services";
    if (path === "/admin") return "Admin Panel";
    return "Dashboard";
  };

  return (
    <header className="w-full h-16 bg-background text-foreground border-b border-border flex items-center justify-between px-6">
      <h2 className="text-lg font-medium">{getPageTitle()}</h2>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDark}
          className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center">
            {user?.name?.[0] || "U"}
          </div>
          <span className="font-medium">{user?.name || "User"}</span>
        </div>
      </div>
    </header>
  );
}