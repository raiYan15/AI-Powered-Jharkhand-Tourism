
import React, { useState, useMemo, useCallback } from 'react';
import logo from '../../assets/images/jharkhand-tourism-logo-new.png';
import { useAuthContext } from '../../components/auth/AuthProvider';
import { GoogleGenAI } from "@google/genai";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// --- TYPE DEFINITIONS ---
enum VerificationStatus {
  UNVERIFIED = 'Unverified',
  VERIFYING = 'Verifying',
  VERIFIED = 'Verified',
  FAILED = 'Failed',
}
interface TourBooking {
  id: string;
  tourName: string;
  customerName: string;
  date: string;
  status: VerificationStatus;
  imageUrl?: string;
}
interface Payment {
  id: string;
  customerName: string;
  tourName: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  paymentMethod: 'Card' | 'Crypto';
  transactionHash?: string;
}
type Page = 'dashboard' | 'verifications' | 'payments' | 'settings';

// --- GEMINI API SERVICE ---
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY! });
const generateTourDescription = async (tourName: string): Promise<string> => {
  if (!API_KEY) {
    return "Error: API Key is not configured. Please set the VITE_GEMINI_API_KEY environment variable to use this feature.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a captivating, one-paragraph tour description for a tour named "${tourName}". Make it sound exciting and appealing to potential tourists.`,
    });
    return response.text ?? "";
  } catch (error) {
    console.error("Error generating tour description:", error);
    return "An error occurred while generating the description. Please check the console for details and try again later.";
  }
};
const generateTourImage = async (tourName: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API Key is not configured. Please set the VITE_GEMINI_API_KEY environment variable to use this feature.");
  }
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `A vibrant, picturesque, high-quality photograph of "${tourName}", suitable for a travel brochure.`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });
    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0]?.image?.imageBytes) {
      return response.generatedImages[0].image.imageBytes ?? "";
    } else {
      throw new Error("Image generation failed to return an image.");
    }
  } catch (error) {
    console.error("Error generating tour image:", error);
    throw new Error("An error occurred while generating the image. Please check the console for details and try again later.");
  }
};


// --- SIDEBAR COMPONENT ---
const Sidebar: React.FC<{ currentPage: Page; setPage: (p: Page) => void }> = ({ currentPage, setPage }) => (
  <aside className="w-64 bg-white/80 backdrop-blur-md text-green-900 flex flex-col py-8 px-4 border-r border-green-100 shadow-xl min-h-screen">
    <div className="text-2xl font-extrabold mb-10 tracking-wide text-green-700 font-serif drop-shadow">Guide Dashboard</div>
    <nav className="flex-1 flex flex-col gap-3">
      <SidebarButton label="Dashboard" icon="📊" active={currentPage === 'dashboard'} onClick={() => setPage('dashboard')} />
      <SidebarButton label="Verifications" icon="✅" active={currentPage === 'verifications'} onClick={() => setPage('verifications')} />
      <SidebarButton label="Payments" icon="💳" active={currentPage === 'payments'} onClick={() => setPage('payments')} />
      <SidebarButton label="Settings" icon="⚙️" active={currentPage === 'settings'} onClick={() => setPage('settings')} />
    </nav>
    <div className="mt-10 text-xs text-green-400">&copy; {new Date().getFullYear()} Jharkhand Tourism</div>
  </aside>
);
const SidebarButton: React.FC<{ label: string; icon: string; active: boolean; onClick: () => void }> = ({ label, icon, active, onClick }) => (
  <button
    className={`flex items-center gap-3 px-4 py-2 rounded-xl font-semibold transition-all duration-200 border border-transparent ${active ? 'bg-gradient-to-r from-green-200 to-yellow-100 text-green-900 shadow-lg border-green-300' : 'hover:bg-green-50 hover:border-green-200'}`}
    onClick={onClick}
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

// --- HEADER COMPONENT ---
const Header: React.FC<{ currentPage: Page }> = ({ currentPage }) => {
  const { user } = useAuthContext();
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-green-100 flex items-center px-10 justify-between shadow-sm">
      <div className="text-2xl font-bold text-green-700 font-serif tracking-wide">
        {(() => {
          switch (currentPage) {
            case 'dashboard': return 'Dashboard Overview';
            case 'verifications': return 'Tour & Guide Verifications';
            case 'payments': return 'Payments & Earnings';
            case 'settings': return 'Settings';
            default: return '';
          }
        })()}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-green-700 font-semibold">Welcome, {user?.name || 'Guide'}!</span>
        <img src={logo} alt="Guide Avatar" className="w-12 h-12 rounded-full border-2 border-green-400 shadow" />
      </div>
    </header>
  );
};

// --- DASHBOARD OVERVIEW ---
const Dashboard: React.FC = () => {
  // Dummy analytics data
  const analytics = [
    { label: 'Total Tours', value: 24, icon: '🗺️' },
    { label: 'Verified Tours', value: 18, icon: '✅' },
    { label: 'Pending Verifications', value: 3, icon: '⏳' },
    { label: 'Total Earnings', value: '₹1,20,000', icon: '💰' },
  ];
  const chartData = [
    { month: 'Jan', earnings: 12000 },
    { month: 'Feb', earnings: 15000 },
    { month: 'Mar', earnings: 18000 },
    { month: 'Apr', earnings: 10000 },
    { month: 'May', earnings: 22000 },
    { month: 'Jun', earnings: 16000 },
  ];
  // Sentiment analysis mock data
  const sentimentData = [
    { name: 'Positive', value: 68 },
    { name: 'Neutral', value: 20 },
    { name: 'Negative', value: 12 },
  ];
  // Tour type distribution mock data
  const tourTypeData = [
    { name: 'Nature', value: 10 },
    { name: 'Pilgrimage', value: 6 },
    { name: 'Adventure', value: 4 },
    { name: 'Cultural', value: 4 },
  ];
  // Custom color palettes
  const tourTypeColors = ['#34d399', '#fbbf24', '#818cf8', '#f472b6'];
  const sentimentColors = ['#22c55e', '#facc15', '#ef4444'];
  return (
    <div className="p-8 bg-gradient-to-br from-[#f8fafc] via-[#e3ffe6] to-[#ffe9d6] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {analytics.map((a) => (
          <div key={a.label} className="glassmorphic-card rounded-2xl p-6 flex flex-col items-center shadow-xl border border-green-200/40 bg-white/80">
            <span className="text-4xl mb-2 drop-shadow-lg">{a.icon}</span>
            <div className="text-3xl font-extrabold text-green-700 font-serif">{a.value}</div>
            <div className="text-green-900 mt-1 text-base font-semibold">{a.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="glassmorphic-card rounded-2xl p-8 shadow-xl border border-green-200/40 bg-white/80">
          <div className="text-xl font-bold text-green-700 mb-4 font-serif">Earnings (Last 6 Months)</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="month" stroke="#166534" />
              <YAxis stroke="#166534" />
              <Tooltip />
              <Legend />
              <Bar dataKey="earnings" fill="#a3e635" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glassmorphic-card rounded-2xl p-8 shadow-xl border border-green-200/40 bg-white/80 flex flex-col items-center justify-center">
          <div className="text-xl font-bold text-green-700 mb-4 font-serif">Tour Type Distribution</div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tourTypeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {tourTypeData.map((entry, idx) => (
                  <Cell key={`cell-tourtype-${idx}`} fill={tourTypeColors[idx % tourTypeColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glassmorphic-card rounded-2xl p-8 shadow-xl border border-green-200/40 bg-white/80 flex flex-col items-center justify-center">
        <div className="text-xl font-bold text-green-700 mb-4 font-serif">Sentiment Analysis (Recent Reviews)</div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sentimentData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
              labelLine={false}
            >
              {sentimentData.map((entry, idx) => (
                <Cell key={`cell-sentiment-${idx}`} fill={sentimentColors[idx % sentimentColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-green-400 inline-block"></span> Positive</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-yellow-300 inline-block"></span> Neutral</div>
          <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-red-400 inline-block"></span> Negative</div>
        </div>
      </div>
    </div>
  );
};

// --- VERIFICATIONS ---
const Verifications: React.FC = () => {
  // Dummy bookings data
  const [bookings, setBookings] = useState<TourBooking[]>([
    { id: '1', tourName: 'Ranchi City Tour', customerName: 'Amit Kumar', date: '2025-09-10', status: VerificationStatus.VERIFIED },
    { id: '2', tourName: 'Netarhat Nature Trek', customerName: 'Priya Singh', date: '2025-09-12', status: VerificationStatus.UNVERIFIED },
    { id: '3', tourName: 'Deoghar Pilgrimage', customerName: 'Rahul Verma', date: '2025-09-14', status: VerificationStatus.VERIFYING },
    { id: '4', tourName: 'Hazaribagh Wildlife', customerName: 'Sneha Das', date: '2025-09-15', status: VerificationStatus.FAILED },
  ]);
  const handleVerify = (id: string) => {
    setBookings((prev) => prev.map(b => b.id === id ? { ...b, status: VerificationStatus.VERIFIED } : b));
  };
  return (
    <div className="p-8 bg-gradient-to-br from-[#f8fafc] via-[#e3ffe6] to-[#ffe9d6] min-h-screen">
      <div className="text-2xl font-bold text-green-700 mb-6 font-serif">Tour & Guide Verifications</div>
      <div className="overflow-x-auto rounded-2xl shadow-xl border border-green-200/40 bg-white/80">
        <table className="w-full rounded-2xl">
          <thead>
            <tr className="text-green-900 text-left bg-green-50">
              <th className="py-3 px-4">Tour Name</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-green-100 hover:bg-green-50 transition">
                <td className="py-3 px-4 font-semibold">{b.tourName}</td>
                <td className="py-3 px-4">{b.customerName}</td>
                <td className="py-3 px-4">{b.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow ${
                    b.status === VerificationStatus.VERIFIED ? 'bg-green-200 text-green-900' :
                    b.status === VerificationStatus.UNVERIFIED ? 'bg-yellow-100 text-yellow-800' :
                    b.status === VerificationStatus.VERIFYING ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {b.status !== VerificationStatus.VERIFIED && (
                    <button
                      className="bg-gradient-to-r from-green-400 to-yellow-300 text-green-900 px-5 py-1.5 rounded-lg font-bold shadow hover:from-green-500 hover:to-yellow-400 transition"
                      onClick={() => handleVerify(b.id)}
                    >Verify</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- PAYMENTS ---
const Payments: React.FC = () => {
  // Dummy payments data
  const [payments] = useState<Payment[]>([
    { id: '1', customerName: 'Amit Kumar', tourName: 'Ranchi City Tour', amount: 5000, date: '2025-09-10', status: 'Completed', paymentMethod: 'Card', transactionHash: '0xabc123' },
    { id: '2', customerName: 'Priya Singh', tourName: 'Netarhat Nature Trek', amount: 8000, date: '2025-09-12', status: 'Pending', paymentMethod: 'Crypto', transactionHash: '0xdef456' },
    { id: '3', customerName: 'Rahul Verma', tourName: 'Deoghar Pilgrimage', amount: 6000, date: '2025-09-14', status: 'Completed', paymentMethod: 'Card', transactionHash: '0xghi789' },
  ]);
  return (
    <div className="p-8 bg-gradient-to-br from-[#f8fafc] via-[#e3ffe6] to-[#ffe9d6] min-h-screen">
      <div className="text-2xl font-bold text-green-700 mb-6 font-serif">Payments & Earnings</div>
      <div className="overflow-x-auto rounded-2xl shadow-xl border border-green-200/40 bg-white/80">
        <table className="w-full rounded-2xl">
          <thead>
            <tr className="text-green-900 text-left bg-green-50">
              <th className="py-3 px-4">Tour Name</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Method</th>
              <th className="py-3 px-4">Transaction</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t border-green-100 hover:bg-green-50 transition">
                <td className="py-3 px-4 font-semibold">{p.tourName}</td>
                <td className="py-3 px-4">{p.customerName}</td>
                <td className="py-3 px-4 text-green-900 font-bold">₹{p.amount.toLocaleString()}</td>
                <td className="py-3 px-4">{p.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow ${
                    p.status === 'Completed' ? 'bg-green-200 text-green-900' :
                    p.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="py-3 px-4">{p.paymentMethod}</td>
                <td className="py-3 px-4 font-mono text-xs">{p.transactionHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- SETTINGS PLACEHOLDER ---
const SettingsPlaceholder: React.FC = () => (
  <div className="p-8 bg-gradient-to-br from-[#f8fafc] via-[#e3ffe6] to-[#ffe9d6] min-h-screen">
    <div className="text-2xl font-bold text-green-700 mb-6 font-serif">Settings</div>
    <div className="glassmorphic-card rounded-2xl p-8 shadow-xl border border-green-200/40 bg-white/80 text-green-900">
      Settings functionality coming soon!
    </div>
  </div>
);

// --- MAIN GUIDE DASHBOARD COMPONENT ---
const GuideDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuthContext();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e3ffe6] to-[#ffe9d6]">
        <div className="text-xl text-green-900 font-bold p-8 bg-white/80 rounded-2xl shadow-xl border border-green-200/40">
          Please log in as a guide to view the dashboard.
        </div>
      </div>
    );
  }
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'verifications':
        return <Verifications />;
      case 'payments':
        return <Payments />;
      case 'settings':
        return <SettingsPlaceholder />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-[#f8fafc] via-[#e3ffe6] to-[#ffe9d6]">
      <Sidebar currentPage={currentPage} setPage={setCurrentPage} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage={currentPage} />
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default GuideDashboard;
