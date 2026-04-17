import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  Shield,
  ArrowLeft,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Phone,
  Mail,
  FileText,
  Building,
  Calendar,
  Car,
  Save,
  X,
} from "lucide-react";
import { getGatePassById, updateGatePass, deleteGatePass, GatePass } from "../utils/storage";

export function PassDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pass, setPass] = useState<GatePass | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<GatePass>>({});

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated) {
      navigate("/");
      return;
    }

    if (id) {
      const foundPass = getGatePassById(id);
      if (foundPass) {
        setPass(foundPass);
        setEditData(foundPass);
      } else {
        navigate("/passes");
      }
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this gate pass?")) {
      if (id && deleteGatePass(id)) {
        navigate("/dashboard");
      }
    }
  };

  const handleSave = () => {
    if (id) {
      const updated = updateGatePass(id, editData);
      if (updated) {
        setPass(updated);
        setIsEditing(false);
      }
    }
  };

  const handleStatusChange = (newStatus: "approved" | "pending" | "rejected") => {
    if (id) {
      const updated = updateGatePass(id, { status: newStatus });
      if (updated) {
        setPass(updated);
      }
    }
  };

  if (!pass) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading pass details...</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-6 h-6" />;
      case "pending":
        return <Clock className="w-6 h-6" />;
      case "rejected":
        return <XCircle className="w-6 h-6" />;
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
        return "";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <Link
                to="/passes"
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
                    GATE PASS DETAILS
                  </h1>
                  <p className="text-muted-foreground font-mono text-xs sm:text-sm truncate">{pass.id}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-primary/50 text-primary hover:bg-primary/10 rounded transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-destructive/50 text-destructive hover:bg-destructive/10 rounded transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors text-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditData(pass);
                    }}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-border rounded hover:bg-muted transition-colors text-sm"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Cancel</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Card */}
        <div className="mb-6 p-4 sm:p-6 border border-primary/30 rounded-lg bg-card/50 backdrop-blur-xl">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-muted-foreground mb-2 text-sm">Current Status</p>
              <div
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded border text-sm sm:text-base ${getStatusColor(
                  pass.status
                )}`}
              >
                {getStatusIcon(pass.status)}
                <span style={{ fontFamily: 'var(--font-display)' }}>
                  {pass.status.toUpperCase()}
                </span>
              </div>
            </div>

            {!isEditing && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusChange("approved")}
                  disabled={pass.status === "approved"}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange("pending")}
                  disabled={pass.status === "pending"}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded hover:bg-yellow-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Pending
                </button>
                <button
                  onClick={() => handleStatusChange("rejected")}
                  disabled={pass.status === "rejected"}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Visitor Information */}
          <div className="border border-primary/30 rounded-lg bg-card/50 backdrop-blur-xl p-6">
            <h2 className="mb-6 pb-3 border-b border-border" style={{ fontFamily: 'var(--font-display)' }}>
              VISITOR INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <User className="w-4 h-4" />
                  FULL NAME
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.visitorName || ""}
                    onChange={(e) => setEditData({ ...editData, visitorName: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-lg">{pass.visitorName}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4" />
                  PHONE NUMBER
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.visitorPhone || ""}
                    onChange={(e) => setEditData({ ...editData, visitorPhone: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-lg font-mono">{pass.visitorPhone}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Mail className="w-4 h-4" />
                  EMAIL ADDRESS
                </div>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.visitorEmail || ""}
                    onChange={(e) => setEditData({ ...editData, visitorEmail: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-lg font-mono">{pass.visitorEmail}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <FileText className="w-4 h-4" />
                  PURPOSE OF VISIT
                </div>
                {isEditing ? (
                  <textarea
                    value={editData.purpose || ""}
                    onChange={(e) => setEditData({ ...editData, purpose: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded focus:outline-none focus:border-primary resize-none"
                    rows={3}
                  />
                ) : (
                  <p className="text-lg">{pass.purpose}</p>
                )}
              </div>
            </div>
          </div>

          {/* Host Information */}
          <div className="border border-primary/30 rounded-lg bg-card/50 backdrop-blur-xl p-6">
            <h2 className="mb-6 pb-3 border-b border-border" style={{ fontFamily: 'var(--font-display)' }}>
              HOST INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <User className="w-4 h-4" />
                  HOST NAME
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.hostName || ""}
                    onChange={(e) => setEditData({ ...editData, hostName: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-lg">{pass.hostName}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Building className="w-4 h-4" />
                  DEPARTMENT
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.hostDepartment || ""}
                    onChange={(e) => setEditData({ ...editData, hostDepartment: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-lg">{pass.hostDepartment}</p>
                )}
              </div>
            </div>
          </div>

          {/* Visit Details */}
          <div className="border border-primary/30 rounded-lg bg-card/50 backdrop-blur-xl p-6">
            <h2 className="mb-6 pb-3 border-b border-border" style={{ fontFamily: 'var(--font-display)' }}>
              VISIT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  DATE
                </div>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.date || ""}
                    onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-lg font-mono">{pass.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4" />
                  TIME IN
                </div>
                {isEditing ? (
                  <input
                    type="time"
                    value={editData.timeIn || ""}
                    onChange={(e) => setEditData({ ...editData, timeIn: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-lg font-mono">{pass.timeIn}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4" />
                  TIME OUT
                </div>
                {isEditing ? (
                  <input
                    type="time"
                    value={editData.timeOut || ""}
                    onChange={(e) => setEditData({ ...editData, timeOut: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded focus:outline-none focus:border-primary"
                  />
                ) : (
                  <p className="text-lg font-mono">{pass.timeOut}</p>
                )}
              </div>

              {(pass.vehicleNumber || isEditing) && (
                <div className="space-y-2 md:col-span-3">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Car className="w-4 h-4" />
                    VEHICLE NUMBER
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.vehicleNumber || ""}
                      onChange={(e) => setEditData({ ...editData, vehicleNumber: e.target.value })}
                      className="w-full px-4 py-2 bg-input-background border border-border rounded focus:outline-none focus:border-primary"
                      placeholder="Optional"
                    />
                  ) : (
                    <p className="text-lg font-mono">{pass.vehicleNumber}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="border border-border rounded-lg bg-card/30 p-3 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground font-mono">
              <div>
                <span className="opacity-60">Created:</span>{" "}
                <span className="block sm:inline mt-1 sm:mt-0">
                  {new Date(pass.createdAt).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="opacity-60">Last Updated:</span>{" "}
                <span className="block sm:inline mt-1 sm:mt-0">
                  {new Date(pass.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
