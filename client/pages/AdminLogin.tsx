import { Link, useNavigate } from "react-router-dom";
import { Building2, Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useState } from "react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in production this would call the backend
    localStorage.setItem("token", "admin-demo-token");
    localStorage.setItem("role", "admin");
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">Admin Portal</span>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Administration</h1>
          <p className="text-muted-foreground mb-8">Access the admin dashboard</p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4 rounded border-border" />
                <span className="text-foreground">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition"
            >
              Access Dashboard
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-foreground font-medium mb-1">Demo Admin Credentials</p>
            <p className="text-xs text-muted-foreground">Email: admin@example.com</p>
            <p className="text-xs text-muted-foreground">Password: admin123</p>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 flex gap-3">
            <Shield className="w-5 h-5 text-accent flex-shrink-0" />
            <p className="text-xs text-foreground">
              For security, always ensure you're accessing this portal from an official ResidentialHub domain.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-primary hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
