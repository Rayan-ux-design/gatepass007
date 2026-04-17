import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import {
  Shield,
  User,
  Phone,
  Mail,
  FileText,
  Building,
  Calendar,
  Clock,
  Car,
  ArrowLeft,
  Save,
} from "lucide-react";
import { saveGatePass } from "../utils/storage";

export function CreatePass() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    visitorName: "",
    visitorPhone: "",
    visitorEmail: "",
    purpose: "",
    hostName: "",
    hostDepartment: "",
    date: "",
    timeIn: "",
    timeOut: "",
    vehicleNumber: "",
    status: "pending" as const,
  });

  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPass = saveGatePass(formData);
    navigate(`/pass/${newPass.id}`);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
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
                  CREATE NEW GATE PASS
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm hidden sm:block">Fill in visitor details</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Visitor Information */}
          <div className="border border-primary/30 rounded-lg bg-card/50 backdrop-blur-xl p-6">
            <h2 className="mb-6 pb-3 border-b border-border" style={{ fontFamily: 'var(--font-display)' }}>
              VISITOR INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="visitorName" className="block text-foreground/80">
                  FULL NAME *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="visitorName"
                    type="text"
                    value={formData.visitorName}
                    onChange={(e) => handleChange("visitorName", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="visitorPhone" className="block text-foreground/80">
                  PHONE NUMBER *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="visitorPhone"
                    type="tel"
                    value={formData.visitorPhone}
                    onChange={(e) => handleChange("visitorPhone", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                    placeholder="+1-555-0123"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="visitorEmail" className="block text-foreground/80">
                  EMAIL ADDRESS *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="visitorEmail"
                    type="email"
                    value={formData.visitorEmail}
                    onChange={(e) => handleChange("visitorEmail", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                    placeholder="visitor@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="purpose" className="block text-foreground/80">
                  PURPOSE OF VISIT *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-primary/50" />
                  <textarea
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => handleChange("purpose", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Meeting, Delivery, Maintenance, etc."
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Host Information */}
          <div className="border border-primary/30 rounded-lg bg-card/50 backdrop-blur-xl p-6">
            <h2 className="mb-6 pb-3 border-b border-border" style={{ fontFamily: 'var(--font-display)' }}>
              HOST INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="hostName" className="block text-foreground/80">
                  HOST NAME *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="hostName"
                    type="text"
                    value={formData.hostName}
                    onChange={(e) => handleChange("hostName", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                    placeholder="Employee name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="hostDepartment" className="block text-foreground/80">
                  DEPARTMENT *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="hostDepartment"
                    type="text"
                    value={formData.hostDepartment}
                    onChange={(e) => handleChange("hostDepartment", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                    placeholder="IT, Sales, HR, etc."
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visit Details */}
          <div className="border border-primary/30 rounded-lg bg-card/50 backdrop-blur-xl p-6">
            <h2 className="mb-6 pb-3 border-b border-border" style={{ fontFamily: 'var(--font-display)' }}>
              VISIT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label htmlFor="date" className="block text-foreground/80">
                  DATE *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="timeIn" className="block text-foreground/80">
                  TIME IN *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="timeIn"
                    type="time"
                    value={formData.timeIn}
                    onChange={(e) => handleChange("timeIn", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="timeOut" className="block text-foreground/80">
                  TIME OUT *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="timeOut"
                    type="time"
                    value={formData.timeOut}
                    onChange={(e) => handleChange("timeOut", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-3">
                <label htmlFor="vehicleNumber" className="block text-foreground/80">
                  VEHICLE NUMBER (Optional)
                </label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                  <input
                    id="vehicleNumber"
                    type="text"
                    value={formData.vehicleNumber}
                    onChange={(e) => handleChange("vehicleNumber", e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded focus:outline-none focus:border-primary transition-colors"
                    placeholder="ABC-1234"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
            <Link
              to="/dashboard"
              className="px-6 py-3 border border-border rounded hover:bg-muted transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/50"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <Save className="w-5 h-5" />
              CREATE PASS
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
