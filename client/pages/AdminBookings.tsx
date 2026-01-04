import { Link } from "react-router-dom";
import { Building2, CheckCircle, XCircle, Clock4, Filter } from "lucide-react";
import { useState } from "react";

interface Booking {
  id: number;
  resident: string;
  apartment: string;
  requestDate: string;
  status: "pending" | "approved" | "declined";
  price: number;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    resident: "John Doe",
    apartment: "A-501 (3 BHK - Tower A)",
    requestDate: "2024-01-10",
    status: "pending",
    price: 2500,
  },
  {
    id: 2,
    resident: "Jane Smith",
    apartment: "B-302 (2 BHK - Tower B)",
    requestDate: "2024-01-09",
    status: "approved",
    price: 1800,
  },
  {
    id: 3,
    resident: "Mike Johnson",
    apartment: "C-601 (4 BHK - Tower C)",
    requestDate: "2024-01-08",
    status: "pending",
    price: 4000,
  },
  {
    id: 4,
    resident: "Sarah Williams",
    apartment: "A-801 (3 BHK - Tower A)",
    requestDate: "2024-01-07",
    status: "declined",
    price: 3200,
  },
  {
    id: 5,
    resident: "Tom Brown",
    apartment: "B-201 (2 BHK - Tower B)",
    requestDate: "2024-01-06",
    status: "approved",
    price: 1600,
  },
  {
    id: 6,
    resident: "Lisa Anderson",
    apartment: "C-702 (3 BHK - Tower C)",
    requestDate: "2024-01-05",
    status: "pending",
    price: 2900,
  },
];

export default function AdminBookings() {
  const [bookings, setBookings] = useState(mockBookings);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  const handleApprove = (id: number) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: "approved" as const } : b
      )
    );
  };

  const handleDecline = (id: number) => {
    setBookings(
      bookings.map((b) =>
        b.id === id ? { ...b, status: "declined" as const } : b
      )
    );
  };

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
            <Link to="/admin/dashboard" className="text-foreground hover:text-primary transition">
              Dashboard
            </Link>
            <Link to="/admin/bookings" className="font-semibold text-primary">
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Manage Bookings
          </h1>
          <p className="text-muted-foreground">
            Review and approve or decline apartment booking requests.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
            <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-2xl font-bold text-accent">
              {bookings.filter((b) => b.status === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Approved</p>
            <p className="text-2xl font-bold text-secondary">
              {bookings.filter((b) => b.status === "approved").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Declined</p>
            <p className="text-2xl font-bold text-destructive">
              {bookings.filter((b) => b.status === "declined").length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-8 flex items-center gap-4 flex-wrap">
          <Filter className="w-5 h-5 text-muted-foreground" />
          {["all", "pending", "approved", "declined"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-white border border-border text-foreground hover:bg-muted"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl border border-border p-12 text-center">
              <p className="text-muted-foreground">No bookings found</p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition"
              >
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  {/* Resident Info */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Resident</p>
                    <h3 className="text-lg font-semibold text-foreground">
                      {booking.resident}
                    </h3>
                  </div>

                  {/* Apartment */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Apartment</p>
                    <p className="font-medium text-foreground">
                      {booking.apartment}
                    </p>
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
                    <p className="text-xl font-bold text-foreground">
                      ${booking.price}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-lg border font-medium text-sm ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(booking.id)}
                          className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleDecline(booking.id)}
                          className="flex-1 px-4 py-2 bg-red-100 text-destructive rounded-lg hover:opacity-90 transition font-medium flex items-center justify-center gap-2 text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Decline
                        </button>
                      </>
                    )}
                    {booking.status === "approved" && (
                      <div className="flex items-center gap-2 text-secondary text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Approved
                      </div>
                    )}
                    {booking.status === "declined" && (
                      <div className="flex items-center gap-2 text-destructive text-sm font-medium">
                        <XCircle className="w-4 h-4" />
                        Declined
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
