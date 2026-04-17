import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield, Lock, User } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, validate credentials
    if (email && password) {
      localStorage.setItem("authenticated", "true");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-8 animate-slide-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 border-2 border-primary rounded-lg bg-primary/10 backdrop-blur-sm">
            <Shield className="w-10 h-10 text-primary" strokeWidth={2.5} />
          </div>
          <h1 className="mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            GATE PASS SYSTEM
          </h1>
          <p className="text-muted-foreground">Secure Access Control</p>
        </div>

        {/* Login Card */}
        <div className="border border-primary/30 rounded-lg bg-card/50 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-primary/10 animate-slide-in-up stagger-1">
          <div className="mb-6">
            <h2 className="mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              AUTHENTICATE
            </h2>
            <p className="text-muted-foreground">Enter your credentials to access the system</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-foreground/80">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                  placeholder="user@company.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/50"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ACCESS SYSTEM
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Secured with end-to-end encryption
          </p>
        </div>
      </div>
    </div>
  );
}
