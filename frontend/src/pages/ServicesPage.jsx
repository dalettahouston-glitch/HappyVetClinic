import { useEffect, useState } from "react";
// import DashboardLayout from "@/layouts/DashboardLayout";
import { getAllServices } from "@/services/servicesService";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllServices()
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load services.");
        setLoading(false);
      });
  }, []);

  return (
    
      <div className="space-y-6">
        <h1 className="text-2xl font-medium">Services</h1>

        {loading && (
          <p className="text-muted-foreground">Loading services…</p>
        )}

        {error && (
          <p className="text-destructive">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    
  );
}