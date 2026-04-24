import DashboardLayout from "@/layouts/DashboardLayout";

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-medium">Welcome Back 👋</h1>
          <p className="text-muted-foreground">
            Here’s what’s happening at Happy Vet Clinic today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
            <p className="text-muted-foreground text-sm">Total Pets</p>
            <h2 className="text-3xl font-semibold mt-2">128</h2>
          </div>

          <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
            <p className="text-muted-foreground text-sm">Appointments Today</p>
            <h2 className="text-3xl font-semibold mt-2">14</h2>
          </div>

          <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
            <p className="text-muted-foreground text-sm">Active Vets</p>
            <h2 className="text-3xl font-semibold mt-2">6</h2>
          </div>

          <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
            <p className="text-muted-foreground text-sm">New Clients</p>
            <h2 className="text-3xl font-semibold mt-2">3</h2>
          </div>
        </div>

        {/* Placeholder for charts or recent activity */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
          <p className="text-muted-foreground">
            Charts, logs, or recent appointments will go here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}