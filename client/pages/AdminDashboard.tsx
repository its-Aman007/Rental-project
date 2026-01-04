import { Link } from "react-router-dom";
import { Building2, Home, Users, BookOpen, TrendingUp, DollarSign } from "lucide-react";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const stats: StatCard[] = [
  {
    title: "Total Units",
    value: 156,
    change: "+12 this month",
    icon: <Home className="w-6 h-6" />,
    color: "bg-blue-100",
  },
  {
    title: "Active Tenants",
    value: 128,
    change: "+8 this month",
    icon: <Users className="w-6 h-6" />,
    color: "bg-green-100",
  },
  {
    title: "Pending Bookings",
    value: 23,
    change: "Awaiting approval",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-yellow-100",
  },
  {
    title: "Monthly Revenue",
    value: "$48,500",
    change: "+15% from last month",
    icon: <DollarSign className="w-6 h-6" />,
    color: "bg-purple-100",
  },
];

interface RecentBooking {
  id: number;
  resident: string;
  apartment: string;
  status: string;
  date: string;
}

const recentBookings: RecentBooking[] = [
  { id: 1, resident: "John Doe", apartment: "A-501", status: "Pending", date: "2024-01-10" },
  { id: 2, resident: "Jane Smith", apartment: "B-302", status: "Approved", date: "2024-01-09" },
  { id: 3, resident: "Mike Johnson", apartment: "C-601", status: "Pending", date: "2024-01-08" },
  { id: 4, resident: "Sarah Williams", apartment: "A-801", status: "Declined", date: "2024-01-07" },
  { id: 5, resident: "Tom Brown", apartment: "B-201", status: "Approved", date: "2024-01-06" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">ResidentialHub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/admin/dashboard" className="font-semibold text-primary">
              Dashboard
            </Link>
            <Link to="/admin/bookings" className="text-foreground hover:text-primary transition">
              Bookings
            </Link>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
              Logout
            </button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage properties, tenants, bookings, and view key metrics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <div className="text-primary">{stat.icon}</div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
              <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
              <p className="text-xs text-secondary">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Recent Bookings</h2>
                <Link
                  to="/admin/bookings"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View All →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Resident</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Apartment</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition">
                        <td className="py-3 px-4 text-foreground font-medium">{booking.resident}</td>
                        <td className="py-3 px-4 text-foreground">{booking.apartment}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              booking.status === "Pending"
                                ? "bg-yellow-100 text-accent"
                                : booking.status === "Approved"
                                  ? "bg-green-100 text-secondary"
                                  : "bg-red-100 text-destructive"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(booking.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-border p-6 h-fit">
            <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium text-left">
                Add New Unit
              </button>
              <button className="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition font-medium text-left">
                Manage Amenities
              </button>
              <Link
                to="/admin/bookings"
                className="block w-full px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition font-medium text-center"
              >
                Review Bookings
              </Link>
              <button className="w-full px-4 py-3 border-2 border-primary text-primary rounded-lg hover:bg-blue-50 transition font-medium text-left">
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Occupancy Overview */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Tower Occupancy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { tower: "Tower A", occupied: 45, total: 52, occupancy: 86 },
              { tower: "Tower B", occupied: 38, total: 52, occupancy: 73 },
              { tower: "Tower C", occupied: 45, total: 52, occupancy: 86 },
            ].map((tower) => (
              <div key={tower.tower}>
                <h3 className="font-semibold text-foreground mb-4">{tower.tower}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      {tower.occupied} of {tower.total} units occupied
                    </span>
                    <span className="font-semibold text-foreground">{tower.occupancy}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-secondary h-full rounded-full transition-all"
                      style={{ width: `${tower.occupancy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
