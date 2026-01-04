import { Link } from "react-router-dom";
import { Building2, MapPin, Home, Bath, Wifi, Parking, Star, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Apartment {
  id: number;
  tower: string;
  unit: string;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  rating: number;
  amenities: string[];
  image: string;
}

const mockApartments: Apartment[] = [
  {
    id: 1,
    tower: "Tower A",
    unit: "A-501",
    floor: 5,
    bedrooms: 3,
    bathrooms: 2,
    price: 2500,
    rating: 4.9,
    amenities: ["Parking", "WiFi", "AC"],
    image: "bg-gradient-to-br from-blue-100 to-blue-200",
  },
  {
    id: 2,
    tower: "Tower B",
    unit: "B-302",
    floor: 3,
    bedrooms: 2,
    bathrooms: 1,
    price: 1800,
    rating: 4.7,
    amenities: ["Parking", "WiFi"],
    image: "bg-gradient-to-br from-green-100 to-green-200",
  },
  {
    id: 3,
    tower: "Tower A",
    unit: "A-801",
    floor: 8,
    bedrooms: 3,
    bathrooms: 2,
    price: 3200,
    rating: 4.8,
    amenities: ["Parking", "WiFi", "AC", "Balcony"],
    image: "bg-gradient-to-br from-purple-100 to-purple-200",
  },
  {
    id: 4,
    tower: "Tower C",
    unit: "C-601",
    floor: 6,
    bedrooms: 4,
    bathrooms: 3,
    price: 4000,
    rating: 5.0,
    amenities: ["Parking", "WiFi", "AC", "Gym"],
    image: "bg-gradient-to-br from-yellow-100 to-yellow-200",
  },
  {
    id: 5,
    tower: "Tower B",
    unit: "B-201",
    floor: 2,
    bedrooms: 2,
    bathrooms: 1,
    price: 1600,
    rating: 4.5,
    amenities: ["WiFi"],
    image: "bg-gradient-to-br from-red-100 to-red-200",
  },
  {
    id: 6,
    tower: "Tower C",
    unit: "C-702",
    floor: 7,
    bedrooms: 3,
    bathrooms: 2,
    price: 2900,
    rating: 4.6,
    amenities: ["Parking", "WiFi", "AC"],
    image: "bg-gradient-to-br from-indigo-100 to-indigo-200",
  },
];

export default function ResidentBrowse() {
  const [filteredApartments, setFilteredApartments] = useState(mockApartments);
  const [selectedTower, setSelectedTower] = useState("all");
  const [selectedBeds, setSelectedBeds] = useState("all");

  const handleTowerFilter = (tower: string) => {
    setSelectedTower(tower);
    filterApartments(tower, selectedBeds);
  };

  const handleBedsFilter = (beds: string) => {
    setSelectedBeds(beds);
    filterApartments(selectedTower, beds);
  };

  const filterApartments = (tower: string, beds: string) => {
    let filtered = mockApartments;

    if (tower !== "all") {
      filtered = filtered.filter((apt) => apt.tower === tower);
    }

    if (beds !== "all") {
      const bedCount = parseInt(beds);
      filtered = filtered.filter((apt) => apt.bedrooms === bedCount);
    }

    setFilteredApartments(filtered);
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
            <Link to="/resident/browse" className="font-semibold text-primary">
              Browse
            </Link>
            <Link to="/resident/bookings" className="text-foreground hover:text-primary transition">
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
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Available Apartments</h1>
          <p className="text-muted-foreground">
            Choose from {mockApartments.length} premium apartments across our residential towers.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-border p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-foreground mb-6">Filters</h2>

              {/* Tower Filter */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-3">Tower</h3>
                <div className="space-y-2">
                  {["all", "Tower A", "Tower B", "Tower C"].map((tower) => (
                    <label key={tower} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="tower"
                        value={tower}
                        checked={selectedTower === tower}
                        onChange={(e) => handleTowerFilter(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-foreground">
                        {tower === "all" ? "All Towers" : tower}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bedrooms Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Bedrooms</h3>
                <div className="space-y-2">
                  {["all", "2", "3", "4"].map((beds) => (
                    <label key={beds} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="beds"
                        value={beds}
                        checked={selectedBeds === beds}
                        onChange={(e) => handleBedsFilter(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-foreground">
                        {beds === "all" ? "All Bedrooms" : `${beds} BHK`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Apartments Grid */}
          <div className="lg:col-span-3">
            {filteredApartments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-border">
                <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No apartments match your filters</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredApartments.map((apartment) => (
                  <div
                    key={apartment.id}
                    className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition"
                  >
                    <div className={`h-48 ${apartment.image} flex items-center justify-center`}>
                      <Home className="w-24 h-24 text-white/40" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium text-primary mb-1">{apartment.tower}</p>
                          <h3 className="text-lg font-semibold text-foreground">
                            Unit {apartment.unit}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm font-medium text-foreground">
                            {apartment.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Home className="w-4 h-4" />
                          <span>{apartment.bedrooms} BHK</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          <span>{apartment.bathrooms} Bath</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {apartment.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="text-xs px-2 py-1 bg-blue-50 text-primary rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Monthly Rent</p>
                          <p className="text-2xl font-bold text-foreground">
                            ${apartment.price}
                          </p>
                        </div>
                        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium flex items-center gap-2">
                          Request <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
