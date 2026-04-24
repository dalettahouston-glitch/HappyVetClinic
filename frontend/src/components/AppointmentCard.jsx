export default function AppointmentCard({ appt }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-medium">
        {appt.petName} — {appt.vetName}
      </h3>

      <p className="text-muted-foreground text-sm mt-1">
        {appt.date} at {appt.time}
      </p>

      <p className="text-sm mt-2">
        Reason: <span className="font-medium">{appt.reason}</span>
      </p>
    </div>
  );
}