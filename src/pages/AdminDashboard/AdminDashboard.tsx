import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { getVendors, getTourists, getGuides, getAnalytics } from '../../api/admin';

const AdminDashboard: React.FC = () => {
  const { token, user, logout } = useAuth();
  const [vendors, setVendors] = useState<any[]>([]);
  const [tourists, setTourists] = useState<any[]>([]);
  const [guides, setGuides] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    if (token) {
      getVendors(token).then(setVendors);
      getTourists(token).then(setTourists);
      getGuides(token).then(setGuides);
      getAnalytics(token).then(setAnalytics);
    }
  }, [token]);

  if (!user || user.role !== "admin") {
    return <div className="p-8 text-red-600">Access denied. Please log in as admin.</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar logout={logout} />
      <main className="flex-1 p-6">
        {/* Overview Cards */}
        <section id="dashboard" className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded shadow">Vendors: {vendors.length}</div>
            <div className="bg-green-100 p-4 rounded shadow">Tourists: {tourists.length}</div>
            <div className="bg-yellow-100 p-4 rounded shadow">Guides: {guides.length}</div>
          </div>
        </section>

        {/* Vendors Table */}
        <section id="vendors" className="mb-8">
          <h2 className="text-xl font-bold mb-2">Vendors</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v: any) => (
                  <tr key={v.id} className="border-t">
                    <td className="px-4 py-2">{v.name}</td>
                    <td className="px-4 py-2">{v.email}</td>
                    <td className="px-4 py-2">{v.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tourists Table */}
        <section id="tourists" className="mb-8">
          <h2 className="text-xl font-bold mb-2">Tourists</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                {tourists.map((t: any) => (
                  <tr key={t.id} className="border-t">
                    <td className="px-4 py-2">{t.name}</td>
                    <td className="px-4 py-2">{t.email}</td>
                    <td className="px-4 py-2">{t.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Guides Table */}
        <section id="guides" className="mb-8">
          <h2 className="text-xl font-bold mb-2">Guides</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                {guides.map((g: any) => (
                  <tr key={g.id} className="border-t">
                    <td className="px-4 py-2">{g.name}</td>
                    <td className="px-4 py-2">{g.email}</td>
                    <td className="px-4 py-2">{g.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Analytics Section */}
        <section id="analytics">
          <h2 className="text-xl font-bold mb-2">Analytics</h2>
          {analytics ? (
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{JSON.stringify(analytics, null, 2)}</pre>
          ) : (
            <div>Loading analytics...</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
