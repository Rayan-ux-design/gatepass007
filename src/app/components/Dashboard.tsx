import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  Shield,
  Plus,
  List,
  CheckCircle,
  Clock,
  XCircle,
  LogOut,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";
import { getGatePasses, initializeMockData } from "../utils/storage";

export function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [passes, setPasses] = useState<any[]>([]);

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated) {
      navigate("/");
      return;
    }
    const name = localStorage.getItem("userName") || "User";
    setUserName(name);
    initializeMockData();
    setPasses(getGatePasses());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  const stats = {
    total: passes.length,
    approved: passes.filter((p) => p.status === "approved").length,
    pending: passes.filter((p) => p.status === "pending").length,
    rejected: passes.filter((p) => p.status === "rejected").length,
  };

  const recentPasses = passes.slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-primary rounded bg-primary/10 flex-shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={2.5} />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-xl truncate" style={{ fontFamily: 'var(--font-display)' }}>
                  GATE PASS CONTROL
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm truncate">Welcome, {userName}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 border border-destructive/50 text-destructive hover:bg-destructive/10 rounded transition-colors flex-shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Link
            to="/create-pass"
            className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 border border-primary/30 bg-primary/5 rounded-lg hover:bg-primary/10 hover:border-primary transition-all"
          >
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary/20 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
              <Plus className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base truncate" style={{ fontFamily: 'var(--font-display)' }}>CREATE NEW PASS</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Issue a new gate pass</p>
            </div>
          </Link>

          <Link
            to="/passes"
            className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 border border-primary/30 bg-card rounded-lg hover:bg-primary/5 hover:border-primary transition-all"
          >
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
              <List className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base truncate" style={{ fontFamily: 'var(--font-display)' }}>VIEW ALL PASSES</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">Manage existing passes</p>
            </div>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 sm:mb-8">
          <h2 className="mb-3 sm:mb-4 text-base sm:text-xl" style={{ fontFamily: 'var(--font-display)' }}>
            STATISTICS
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 sm:p-6 border border-border bg-card rounded-lg">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                  <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                </div>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground hidden sm:block" />
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs sm:text-sm">Total Passes</p>
                <p className="text-2xl sm:text-3xl font-mono">{stats.total}</p>
              </div>
            </div>

            <div className="p-4 sm:p-6 border border-border bg-card rounded-lg">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-500" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs sm:text-sm">Approved</p>
                <p className="text-2xl sm:text-3xl font-mono text-green-500">{stats.approved}</p>
              </div>
            </div>

            <div className="p-4 sm:p-6 border border-border bg-card rounded-lg">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-yellow-500/10 rounded-lg">
                  <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs sm:text-sm">Pending</p>
                <p className="text-2xl sm:text-3xl font-mono text-yellow-500">{stats.pending}</p>
              </div>
            </div>

            <div className="p-4 sm:p-6 border border-border bg-card rounded-lg">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-red-500/10 rounded-lg">
                  <XCircle className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs sm:text-sm">Rejected</p>
                <p className="text-2xl sm:text-3xl font-mono text-red-500">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Passes */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-xl" style={{ fontFamily: 'var(--font-display)' }}>RECENT PASSES</h2>
            <Link to="/passes" className="text-primary hover:underline text-xs sm:text-sm">
              View All →
            </Link>
          </div>

          {recentPasses.length > 0 ? (
            <div className="space-y-3">
              {recentPasses.map((pass) => (
                <Link
                  key={pass.id}
                  to={`/pass/${pass.id}`}
                  className="block p-3 sm:p-4 border border-border bg-card rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                        <h3 className="text-sm sm:text-base truncate" style={{ fontFamily: 'var(--font-display)' }}>
                          {pass.visitorName}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                        <p className="truncate">Purpose: {pass.purpose}</p>
                        <p className="truncate">Date: {pass.date}</p>
                        <p className="truncate font-mono">ID: {pass.id}</p>
                      </div>
                    </div>
                    <div className="sm:ml-4 self-start sm:self-center">
                      <span
                        className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                          pass.status === "approved"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : pass.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {pass.status === "approved" ? (
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : pass.status === "pending" ? (
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                        <span className="hidden xs:inline">{pass.status.toUpperCase()}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12 border border-dashed border-border rounded-lg px-4">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50" />
              <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">No gate passes created yet</p>
              <Link
                to="/create-pass"
                className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                Create Your First Pass
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
