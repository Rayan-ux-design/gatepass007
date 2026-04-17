import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield, Lock, User, Mail, Building } from "lucide-react";

export function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Mock registration
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("userName", formData.fullName);
    navigate("/dashboard");
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-6 sm:mb-8 animate-slide-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 border-2 border-primary rounded-lg bg-primary/10 backdrop-blur-sm">
            <Shield className="w-10 h-10 text-primary" strokeWidth={2.5} />
          </div>
          <h1 className="mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            CREATE ACCOUNT
          </h1>
          <p className="text-muted-foreground">Register for system access</p>
        </div>

        {/* Signup Card */}
        <div className="border border-primary/30 rounded-lg bg-card/50 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-primary/10 animate-slide-in-up stagger-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-foreground/80">
                FULL NAME
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-foreground/80">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                  placeholder="user@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="organization" className="block text-foreground/80">
                ORGANIZATION
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                <input
                  id="organization"
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleChange("organization", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                  placeholder="Company Name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-foreground/80">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-foreground/80">
                CONFIRM PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/50 mt-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              CREATE ACCOUNT
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
