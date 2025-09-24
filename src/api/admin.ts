// API hooks for admin dashboard (mock implementation)
export async function getVendors(token: string) {
  // Replace with real API call
  return [
    { id: 1, name: "Vendor 1", email: "vendor1@example.com", phone: "1234567890" },
    { id: 2, name: "Vendor 2", email: "vendor2@example.com", phone: "9876543210" },
  ];
}

export async function getTourists(token: string) {
  return [
    { id: 1, name: "Tourist 1", email: "tourist1@example.com", phone: "1111111111" },
    { id: 2, name: "Tourist 2", email: "tourist2@example.com", phone: "2222222222" },
  ];
}

export async function getGuides(token: string) {
  return [
    { id: 1, name: "Guide 1", email: "guide1@example.com", phone: "3333333333" },
    { id: 2, name: "Guide 2", email: "guide2@example.com", phone: "4444444444" },
  ];
}

export async function getAnalytics(token: string) {
  return {
    totalVendors: 2,
    totalTourists: 2,
    totalGuides: 2,
    revenue: 10000,
    bookings: 50,
    activeUsers: 10,
  };
}
