import React from "react";

interface SidebarProps {
  logout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ logout }) => (
  <aside className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
    <div className="p-6 font-bold text-xl border-b border-gray-700">Admin Panel</div>
    <nav className="flex-1 p-4 space-y-2">
      <a href="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</a>
      <a href="/admin/vendors" className="block py-2 px-4 rounded hover:bg-gray-700">Vendors</a>
      <a href="/admin/tourists" className="block py-2 px-4 rounded hover:bg-gray-700">Tourists</a>
      <a href="/admin/guides" className="block py-2 px-4 rounded hover:bg-gray-700">Guides</a>
      <a href="/admin/analytics" className="block py-2 px-4 rounded hover:bg-gray-700">Analytics</a>
    </nav>
    <button
      className="m-4 py-2 px-4 bg-red-600 rounded hover:bg-red-700"
      onClick={logout}
    >
      Logout
    </button>
  </aside>
);

export default Sidebar;
