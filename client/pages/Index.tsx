import { Link } from "react-router-dom";
import { Building2, Users, Shield, Home, Star, CheckCircle } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">ResidentialHub</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition">Features</a>
            <a href="#amenities" className="text-foreground hover:text-primary transition">Amenities</a>
            <a href="#contact" className="text-foreground hover:text-primary transition">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/resident/login" className="px-6 py-2 rounded-lg text-primary hover:bg-blue-50 transition font-medium">
              Resident Login
            </Link>
            <Link to="/admin/login" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium">
              Admin Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Find Your Dream Home
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover premium residential apartments with world-class amenities. Browse, book, and manage your rental with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/resident/browse"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold text-center"
                >
                  Browse Apartments
                </Link>
                <Link
                  to="/resident/login"
                  className="px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-blue-50 transition font-semibold text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-border">
                  <div className="space-y-4">
                    <div className="h-40 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center">
                      <Home className="w-20 h-20 text-primary/40" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Premium Apartment</h3>
                    <p className="text-sm text-muted-foreground">3 BHK • 2 Bathrooms • Balcony</p>
                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-foreground">4.9 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose ResidentialHub?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide a seamless rental experience with modern technology and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl border border-border hover:shadow-lg transition bg-white">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Diverse Apartments</h3>
              <p className="text-muted-foreground">
                Browse from a wide selection of apartments across multiple towers with varying layouts and price points.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl border border-border hover:shadow-lg transition bg-white">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Community Living</h3>
              <p className="text-muted-foreground">
                Access premium amenities including gym, swimming pool, parking, and recreational spaces for residents.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl border border-border hover:shadow-lg transition bg-white">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Secure Booking</h3>
              <p className="text-muted-foreground">
                Easy booking process with instant confirmation, secure payment, and 24/7 support for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 md:py-28 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">World-Class Amenities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every apartment comes with access to premium facilities designed for modern living.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Fitness Center", icon: "💪" },
              { name: "Swimming Pool", icon: "🏊" },
              { name: "Parking Garage", icon: "🚗" },
              { name: "Concierge", icon: "🔔" },
              { name: "Co-Working Space", icon: "💼" },
              { name: "Rooftop Garden", icon: "🌿" },
              { name: "Movie Theater", icon: "🎬" },
              { name: "Kids Play Area", icon: "🎪" },
            ].map((amenity, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition border border-border">
                <div className="text-4xl mb-3">{amenity.icon}</div>
                <h4 className="font-semibold text-foreground">{amenity.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to Find Your Perfect Apartment?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of residents who have found their ideal home on ResidentialHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/resident/browse"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-semibold inline-block"
            >
              Browse Now
            </Link>
            <Link
              to="/resident/login"
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-blue-50 transition font-semibold inline-block"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-6 h-6" />
                <span className="font-bold">ResidentialHub</span>
              </div>
              <p className="text-sm opacity-75">Premium residential apartments for modern living.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resident Portal</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><Link to="/resident/browse" className="hover:opacity-100 transition">Browse Apartments</Link></li>
                <li><Link to="/resident/bookings" className="hover:opacity-100 transition">My Bookings</Link></li>
                <li><Link to="/resident/login" className="hover:opacity-100 transition">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Admin Portal</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><Link to="/admin/dashboard" className="hover:opacity-100 transition">Dashboard</Link></li>
                <li><Link to="/admin/bookings" className="hover:opacity-100 transition">Manage Bookings</Link></li>
                <li><Link to="/admin/login" className="hover:opacity-100 transition">Admin Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li>Email: support@residentialhub.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Hours: 24/7 Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2024 ResidentialHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
