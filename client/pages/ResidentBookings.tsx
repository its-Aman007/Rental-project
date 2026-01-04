import { Link } from "react-router-dom";
import { Building2, Calendar, Clock, Home, CheckCircle, Clock4 } from "lucide-react";

interface Booking {
  id: number;
  apartment: string;
  tower: string;
  unit: string;
  requestDate: string;
  status: "pending" | "approved" | "declined";
  price: number;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    apartment: "3 BHK - Tower A",
    tower: "Tower A",
    unit: "A-501",
    requestDate: "2024-01-10",
    status: "approved",
    price: 2500,
  },
  {
    id: 2,
    apartment: "2 BHK - Tower B",
    tower: "Tower B",
    unit: "B-302",
    requestDate: "2024-01-08",
    status: "pending",
    price: 1800,
  },
  {
    id: 3,
    apartment: "4 BHK - Tower C",
    tower: "Tower C",
    unit: "C-601",
    requestDate: "2024-01-05",
    status: "declined",
    price: 4000,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-50 text-secondary border-green-200";
    case "pending":
      return "bg-yellow-50 text-accent border-yellow-200";
    case "declined":
      return "bg-red-50 text-destructive border-red-200";
    default:
      return "bg-gray-50 text-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-5 h-5" />;
    case "pending":
      return <Clock4 className="w-5 h-5" />;
    default:
      return null;
  }
};

export default function ResidentBookings() {
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
            <Link to="/resident/browse" className="text-foreground hover:text-primary transition">
              Browse
            </Link>
            <Link to="/resident/bookings" className="font-semibold text-primary">
              My Bookings
            </Link>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
              Logout
            </button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">
            View and manage your apartment booking requests.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-3xl font-bold text-foreground">
                  {mockBookings.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-3xl font-bold text-foreground">
                  {mockBookings.filter((b) => b.status === "approved").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock4 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-foreground">
                  {mockBookings.filter((b) => b.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {mockBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition"
            >
              <div className="grid md:grid-cols-4 gap-6 items-center">
                {/* Apartment Info */}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Apartment</p>
                  <h3 className="text-lg font-semibold text-foreground">
                    {booking.apartment}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Unit {booking.unit}
                  </p>
                </div>

                {/* Request Date */}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Request Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      {new Date(booking.requestDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${booking.price}
                  </p>
                </div>

                {/* Status & Action */}
                <div className="flex flex-col gap-3">
                  <div
                    className={`px-4 py-2 rounded-lg border font-medium flex items-center gap-2 justify-center ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {getStatusIcon(booking.status)}
                    <span className="capitalize">{booking.status}</span>
                  </div>
                  {booking.status === "approved" && (
                    <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition font-medium">
                      Complete Booking
                    </button>
                  )}
                  {booking.status === "pending" && (
                    <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg cursor-not-allowed font-medium">
                      Awaiting Response
                    </button>
                  )}
                  {booking.status === "declined" && (
                    <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg cursor-not-allowed font-medium">
                      Request Declined
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse More */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Want to explore more apartments?</p>
          <Link
            to="/resident/browse"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold"
          >
            Browse Apartments
          </Link>
        </div>
      </div>
    </div>
  );
}
