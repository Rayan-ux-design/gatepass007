export interface GatePass {
  id: string;
  visitorName: string;
  visitorPhone: string;
  visitorEmail: string;
  purpose: string;
  hostName: string;
  hostDepartment: string;
  date: string;
  timeIn: string;
  timeOut: string;
  vehicleNumber?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "gatePasses";

export function getGatePasses(): GatePass[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading gate passes:", error);
    return [];
  }
}

export function getGatePassById(id: string): GatePass | null {
  const passes = getGatePasses();
  return passes.find((pass) => pass.id === id) || null;
}

export function saveGatePass(pass: Omit<GatePass, "id" | "createdAt" | "updatedAt">): GatePass {
  const passes = getGatePasses();
  const now = new Date().toISOString();
  const newPass: GatePass = {
    ...pass,
    id: `GP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: now,
    updatedAt: now,
  };
  passes.unshift(newPass);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(passes));
  return newPass;
}

export function updateGatePass(id: string, updates: Partial<GatePass>): GatePass | null {
  const passes = getGatePasses();
  const index = passes.findIndex((pass) => pass.id === id);
  if (index === -1) return null;

  passes[index] = {
    ...passes[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(passes));
  return passes[index];
}

export function deleteGatePass(id: string): boolean {
  const passes = getGatePasses();
  const filteredPasses = passes.filter((pass) => pass.id !== id);
  if (filteredPasses.length === passes.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPasses));
  return true;
}

// Initialize with mock data if empty
export function initializeMockData() {
  const passes = getGatePasses();
  if (passes.length === 0) {
    const mockPasses: Omit<GatePass, "id" | "createdAt" | "updatedAt">[] = [
      {
        visitorName: "John Smith",
        visitorPhone: "+1-555-0123",
        visitorEmail: "john.smith@example.com",
        purpose: "Business Meeting",
        hostName: "Sarah Johnson",
        hostDepartment: "Sales",
        date: "2026-04-16",
        timeIn: "09:00",
        timeOut: "11:00",
        vehicleNumber: "ABC-1234",
        status: "approved",
      },
      {
        visitorName: "Emily Davis",
        visitorPhone: "+1-555-0456",
        visitorEmail: "emily.davis@example.com",
        purpose: "Technical Support",
        hostName: "Michael Chen",
        hostDepartment: "IT",
        date: "2026-04-16",
        timeIn: "14:00",
        timeOut: "16:00",
        status: "pending",
      },
      {
        visitorName: "Robert Wilson",
        visitorPhone: "+1-555-0789",
        visitorEmail: "robert.w@example.com",
        purpose: "Delivery",
        hostName: "Admin Desk",
        hostDepartment: "Operations",
        date: "2026-04-15",
        timeIn: "10:30",
        timeOut: "11:00",
        vehicleNumber: "XYZ-5678",
        status: "approved",
      },
    ];

    mockPasses.forEach(saveGatePass);
  }
}
