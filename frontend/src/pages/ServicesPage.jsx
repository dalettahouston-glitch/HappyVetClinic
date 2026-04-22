import { useEffect, useState } from "react";
import { getAllServices } from "../services/serviceService";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await getAllServices();
      setServices(response.data);
    } catch (err) {
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="services-container">
      <h1 className="services-title">Our Veterinary Services</h1>

      {loading && <p>Loading services...</p>}
      {error && <p className="error">{error}</p>}

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <p className="price">${service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}