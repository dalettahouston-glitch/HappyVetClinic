export default function VetCard({ vet }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-medium">
        Dr. {vet.firstName} {vet.lastName}
      </h3>

      <p className="text-muted-foreground text-sm mt-1">
        Specialty: {vet.specialty}
      </p>

      <p className="text-sm mt-2">
        Vet ID: <span className="font-medium">{vet.vetId}</span>
      </p>
    </div>
  );
}