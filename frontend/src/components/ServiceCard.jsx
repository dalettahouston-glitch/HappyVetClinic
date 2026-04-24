export default function ServiceCard({ service }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-medium">{service.name}</h3>

      <p className="text-muted-foreground text-sm mt-1">
        {service.description}
      </p>

      <p className="text-sm mt-2">
        Price:{" "}
        <span className="font-medium">
          ${service.price?.toFixed(2)}
        </span>
      </p>
    </div>
  );
}