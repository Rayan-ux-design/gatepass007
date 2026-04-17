import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  Shield,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Users,
  Calendar,
} from "lucide-react";
import { getGatePasses, GatePass } from "../utils/storage";

export function PassList() {
  const navigate = useNavigate();
  const [passes, setPasses] = useState<GatePass[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated) {
      navigate("/");
      return;
    }
    setPasses(getGatePasses());
  }, [navigate]);

  const filteredPasses = passes.filter((pass) => {
    const matchesSearch =
      pass.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pass.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pass.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pass.hostName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || pass.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5" />;
      case "pending":
        return <Clock className="w-5 h-5" />;
      case "rejected":
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/dashboard"
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 border border-border rounded hover:bg-primary/10 hover:border-primary transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-primary rounded bg-primary/10 flex-shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={2.5} />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-xl truncate" style={{ fontFamily: 'var(--font-display)' }}>
                  ALL GATE PASSES
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm truncate">
                  {filteredPasses.length} pass{filteredPasses.length !== 1 ? "es" : ""} found
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                  placeholder="Search by name, purpose, or ID..."
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="sm:w-48">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pass List */}
        {filteredPasses.length > 0 ? (
          <div className="space-y-4">
            {filteredPasses.map((pass) => (
              <Link
                key={pass.id}
                to={`/pass/${pass.id}`}
                className="block border border-border bg-card rounded-lg hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/10 overflow-hidden"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Main Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                          <h3 className="text-base sm:text-lg truncate" style={{ fontFamily: 'var(--font-display)' }}>
                            {pass.visitorName}
                          </h3>
                        </div>
                        {/* Status - Mobile */}
                        <span
                          className={`sm:hidden inline-flex items-center gap-1 px-2 py-1 rounded border text-xs flex-shrink-0 ${getStatusColor(
                            pass.status
                          )}`}
                        >
                          {getStatusIcon(pass.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Purpose</p>
                          <p className="text-xs sm:text-sm truncate">{pass.purpose}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Host</p>
                          <p className="text-xs sm:text-sm truncate">{pass.hostName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Date</p>
                          <p className="text-xs sm:text-sm flex items-center gap-1">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{pass.date}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Time</p>
                          <p className="text-xs sm:text-sm truncate">
                            {pass.timeIn} - {pass.timeOut}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground font-mono">
                        <span className="truncate">ID: {pass.id}</span>
                        {pass.vehicleNumber && <span className="truncate">Vehicle: {pass.vehicleNumber}</span>}
                      </div>
                    </div>

                    {/* Status - Desktop */}
                    <div className="hidden sm:block sm:ml-auto">
                      <span
                        className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded border text-sm ${getStatusColor(
                          pass.status
                        )}`}
                      >
                        {getStatusIcon(pass.status)}
                        <span style={{ fontFamily: 'var(--font-display)' }}>
                          {pass.status.toUpperCase()}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 border border-dashed border-border rounded-lg px-4">
            <Search className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50" />
            <p className="text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4">No passes found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="px-4 sm:px-6 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-colors text-sm sm:text-base"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
