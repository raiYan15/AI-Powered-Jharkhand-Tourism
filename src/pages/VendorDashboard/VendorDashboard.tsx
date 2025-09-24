
// --- IMPORTS ---
import React, { useState, useCallback, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// If using Gemini AI, import as needed (mocked for now)

// --- TYPES ---
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
  createdAt: string;
}
export interface Order {
  id: string;
  productName: string;
  customerName: string;
  date: string;
  amount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}
export interface EcotourismPackage {
  id: string;
  name: string;
  duration: string;
  price: number;
  imageUrl: string;
  itinerary: string;
  inclusions: string;
  exclusions: string;
  createdAt: string;
}
export interface Homestay {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  imageUrl: string;
  description: string;
  amenities: string;
  createdAt: string;
}
export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  price: number;
  imageUrl: string;
  description: string;
  createdAt: string;
}

// --- ICONS (SVGs) ---
const DashboardIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>);
const ProductsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.62-3.385m-5.043-.025a15.998 15.998 0 01-3.388-1.621m-5.043.025a15.998 15.998 0 00-3.388-1.621m16.5 5.043a15.998 15.998 0 00-1.62-3.385m-5.043-.025a15.998 15.998 0 01-1.622-3.385" /></svg>);
const EventsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z" /></svg>);
const HomestayIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>);
const EcotourismIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.979 14.979 0 00-2.61-4.13m2.61 4.13a14.979 14.979 0 01-4.13 2.61m7.02-6.74a14.979 14.979 0 00-4.13-2.61m-2.61 4.13a14.979 14.979 0 01-2.61-4.13m0 0a6 6 0 01-3.34-5.84m3.34 5.84a14.98 14.98 0 00-5.84-3.34M12 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const OrdersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
const PaymentsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>);

// --- HEADER ---
const Header: React.FC = () => (
  <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 lg:px-8 flex-shrink-0">
    <div className="flex items-center">
      <h2 className="text-2xl font-bold text-gray-800">Welcome, Sohrai Arts!</h2>
    </div>
    <div className="flex items-center space-x-6">
      <div className="relative">
        <input type="text" placeholder="Search orders, products..." className="w-64 pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
        <div className="absolute top-0 left-0 mt-2.5 ml-3.5">
          {/* SearchIcon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>
      <button className="relative text-gray-600 hover:text-amber-600">
        {/* BellIcon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </button>
    </div>
  </header>
);

// --- SIDEBAR ---
interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
}
const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'products', label: 'Handicrafts', icon: <ProductsIcon /> },
    { id: 'events', label: 'Events', icon: <EventsIcon /> },
    { id: 'homestays', label: 'Homestays', icon: <HomestayIcon /> },
    { id: 'ecotourism', label: 'Ecotourism', icon: <EcotourismIcon /> },
    { id: 'orders', label: 'Orders', icon: <OrdersIcon /> },
    { id: 'payments', label: 'Payments', icon: <PaymentsIcon /> },
    { id: 'reports', label: 'Reports & Analytics', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 17V9m4 8V5m4 12v-4" /></svg> },
    { id: 'profile', label: 'Profile & Settings', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 21a8.25 8.25 0 1115 0v.75A2.25 2.25 0 0117.25 24h-10.5A2.25 2.25 0 014.5 21.75V21z" /></svg> },
    { id: 'support', label: 'Support & Help', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.556 0 8.25-3.694 8.25-8.25S16.556 3.75 12 3.75 3.75 7.444 3.75 12c0 2.25 1.5 4.5 3.75 6.75V21l3-1.5c.75.25 1.5.25 2.25.25z" /></svg> },
  ];
  return (
    <aside className="w-64 bg-stone-800 text-stone-200 flex-col hidden lg:flex">
      <div className="h-20 flex items-center justify-center border-b border-stone-700">
        <h1 className="text-2xl font-bold text-amber-500 tracking-wider">JHARKALA</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {navItems.map(item => (
            <li key={item.id} className="mb-2">
              <a
                href="#"
                onClick={e => { e.preventDefault(); setView(item.id); }}
                className={`flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${currentView === item.id ? 'bg-amber-500 text-stone-900 font-semibold shadow-md' : 'hover:bg-stone-700 hover:text-white'}`}
              >
                <span className="w-6 h-6 mr-3">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-stone-700">
        <div className="flex items-center">
          <img src="https://picsum.photos/40" alt="Vendor" className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <p className="font-semibold text-white">Sohrai Arts</p>
            <p className="text-sm text-stone-400">Vendor ID: 12345</p>
          </div>
        </div>
      </div>
    </aside>
  );
};


// --- DASHBOARD OVERVIEW ---
const DashboardView: React.FC = () => {
  // Demo data
  const [revenueType, setRevenueType] = useState<'monthly' | 'yearly'>('monthly');
  const revenue = revenueType === 'monthly' ? 42000 : 510000;
  const growth = revenueType === 'monthly' ? 8.2 : 12.5;
  const salesData = [
    { month: 'Apr', sales: 7000 },
    { month: 'May', sales: 9000 },
    { month: 'Jun', sales: 12000 },
    { month: 'Jul', sales: 8000 },
    { month: 'Aug', sales: 6000 },
    { month: 'Sep', sales: 9000 },
  ];
  const topProducts = [
    { name: 'Sohrai Wall Plate', category: 'Handicrafts', sales: 120, stock: 8 },
    { name: 'Tribal Necklace', category: 'Handicrafts', sales: 95, stock: 15 },
    { name: 'Bamboo Basket', category: 'Handicrafts', sales: 80, stock: 5 },
  ];
  const recentOrders = [
    { id: 'ORD-1001', product: 'Sohrai Wall Plate', customer: 'Amit Kumar', date: '2025-09-14', amount: 1200, status: 'Delivered' },
    { id: 'ORD-1002', product: 'Tribal Necklace', customer: 'Priya Singh', date: '2025-09-13', amount: 950, status: 'Shipped' },
    { id: 'ORD-1003', product: 'Bamboo Basket', customer: 'Rahul Verma', date: '2025-09-12', amount: 800, status: 'Pending' },
  ];
  const avgRating = 4.7;
  const totalReviews = 128;
  const alerts = [
    { type: 'warning', message: 'Low stock: Bamboo Basket (5 left)' },
    { type: 'info', message: '2 new orders pending shipment' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome & Revenue */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Dashboard Overview</h2>
          <p className="text-gray-500">Business summary and insights for Sohrai Arts</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">Total Revenue ({revenueType === 'monthly' ? 'This Month' : 'This Year'})</span>
            <span className="text-3xl font-extrabold text-amber-600">₹{revenue.toLocaleString()}</span>
          </div>
          <div className="flex gap-2 ml-2">
            <button onClick={() => setRevenueType('monthly')} className={`px-3 py-1 rounded-full text-sm font-semibold border ${revenueType==='monthly' ? 'bg-amber-500 text-white' : 'bg-white text-amber-600 border-amber-400'}`}>Monthly</button>
            <button onClick={() => setRevenueType('yearly')} className={`px-3 py-1 rounded-full text-sm font-semibold border ${revenueType==='yearly' ? 'bg-amber-500 text-white' : 'bg-white text-amber-600 border-amber-400'}`}>Yearly</button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, idx) => (
            <div key={idx} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm ${alert.type==='warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}> 
              <span>{alert.type==='warning' ? '⚠️' : 'ℹ️'}</span> {alert.message}
            </div>
          ))}
        </div>
      )}

      {/* Sales Graph & Growth */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700">Sales Trend ({revenueType==='monthly' ? 'Last 6 Months' : 'Yearly'})</span>
            <span className="text-xs text-gray-400">Bar Chart</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fbbf24" />
              <XAxis dataKey="month" stroke="#92400e" />
              <YAxis stroke="#92400e" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#fbbf24" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-6">
          <span className="text-lg font-semibold text-gray-700 mb-2">Growth</span>
          <span className="text-3xl font-bold text-green-600 mb-1">+{growth}%</span>
          <span className="text-sm text-gray-500">{revenueType==='monthly' ? 'vs last month' : 'vs last year'}</span>
        </div>
      </div>

      {/* Top Products & Recent Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold text-gray-700 mb-2">Top Products</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th>Name</th><th>Category</th><th>Sales</th><th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, idx) => (
                <tr key={idx} className="border-t border-gray-100">
                  <td className="py-2 font-medium">{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.sales}</td>
                  <td className={p.stock < 10 ? 'text-red-500 font-bold' : ''}>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold text-gray-700 mb-2">Recent Orders</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th>Order ID</th><th>Product</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, idx) => (
                <tr key={idx} className="border-t border-gray-100">
                  <td className="py-2 font-mono">{o.id}</td>
                  <td>{o.product}</td>
                  <td>{o.customer}</td>
                  <td>{o.date}</td>
                  <td>₹{o.amount}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold shadow ${o.status==='Delivered' ? 'bg-green-100 text-green-700' : o.status==='Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-800'}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ratings */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-700">Average Rating:</span>
          <span className="text-2xl font-bold text-amber-500">{avgRating}</span>
          <span className="flex gap-1 ml-2">
            {Array.from({length: 5}).map((_,i) => (
              <span key={i} className={i < Math.round(avgRating) ? 'text-amber-400' : 'text-gray-300'}>★</span>
            ))}
          </span>
          <span className="ml-2 text-gray-500 text-sm">({totalReviews} reviews)</span>
        </div>
      </div>
    </div>
  );
};

const HandicraftsView: React.FC = () => <div className="text-xl font-semibold">Handicrafts Management (to be implemented)</div>;
const EventsView: React.FC = () => {
  // Demo data
  const [tab, setTab] = useState<'upcoming'|'past'>('upcoming');
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', location: '', price: '', banner: '', description: '', capacity: '' });
  const [events, setEvents] = useState([
    { id: 'E-1001', name: 'Tribal Art Fest', date: '2025-09-25', location: 'Ranchi', price: 200, status: 'Open', ticketsSold: 120, capacity: 200, banner: '', description: 'A celebration of tribal art and culture.', feedback: [{ rating: 5, review: 'Amazing event!' }], demographics: { local: 80, international: 40 } },
    { id: 'E-1002', name: 'Handicraft Expo', date: '2025-10-10', location: 'Jamshedpur', price: 150, status: 'Booked', ticketsSold: 200, capacity: 200, banner: '', description: 'Showcase of local handicrafts.', feedback: [{ rating: 4, review: 'Great products!' }], demographics: { local: 150, international: 50 } },
    { id: 'E-1003', name: 'Folk Music Night', date: '2025-08-15', location: 'Dhanbad', price: 100, status: 'Cancelled', ticketsSold: 30, capacity: 100, banner: '', description: 'Folk music performances.', feedback: [{ rating: 3, review: 'Cancelled, disappointed.' }], demographics: { local: 25, international: 5 } },
  ]);
  const today = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) >= today);
  const pastEvents = events.filter(e => new Date(e.date) < today);
  const notifications = [
    { type: 'warning', message: 'Low registrations for Folk Music Night.' },
    { type: 'danger', message: 'Event cancelled: Folk Music Night.' },
  ];

  // Add new event handler (mock)
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents(prev => [
      ...prev,
      {
        id: `E-${1000 + prev.length + 1}`,
        name: newEvent.name,
        date: newEvent.date,
        location: newEvent.location,
        price: Number(newEvent.price),
        status: 'Open',
        ticketsSold: 0,
        capacity: Number(newEvent.capacity),
        banner: newEvent.banner,
        description: newEvent.description,
        feedback: [],
        demographics: { local: 0, international: 0 },
      }
    ]);
    setShowForm(false);
    setNewEvent({ name: '', date: '', location: '', price: '', banner: '', description: '', capacity: '' });
  };

  return (
    <div className="space-y-8">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="space-y-2">
          {notifications.map((n, i) => (
            <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm ${n.type==='warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}> 
              <span>{n.type==='warning' ? '⚠️' : '❌'}</span> {n.message}
            </div>
          ))}
        </div>
      )}

      {/* Tabs and Add Event */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button onClick={()=>setTab('upcoming')} className={`px-4 py-2 rounded-t-lg font-semibold ${tab==='upcoming' ? 'bg-amber-500 text-white' : 'bg-white text-amber-600 border-b-2 border-amber-500'}`}>Upcoming Events</button>
          <button onClick={()=>setTab('past')} className={`px-4 py-2 rounded-t-lg font-semibold ${tab==='past' ? 'bg-amber-500 text-white' : 'bg-white text-amber-600 border-b-2 border-amber-500'}`}>Past Events</button>
        </div>
        <button onClick={()=>setShowForm(true)} className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold shadow hover:bg-amber-600">+ Add New Event</button>
      </div>

      {/* Add Event Form */}
      {showForm && (
        <form className="bg-white rounded-xl shadow p-6 space-y-4" onSubmit={handleAddEvent}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required className="border p-2 rounded" placeholder="Event Name" value={newEvent.name} onChange={e=>setNewEvent(v=>({...v, name: e.target.value}))} />
            <input required className="border p-2 rounded" type="date" value={newEvent.date} onChange={e=>setNewEvent(v=>({...v, date: e.target.value}))} />
            <input required className="border p-2 rounded" placeholder="Location" value={newEvent.location} onChange={e=>setNewEvent(v=>({...v, location: e.target.value}))} />
            <input required className="border p-2 rounded" type="number" placeholder="Ticket Price" value={newEvent.price} onChange={e=>setNewEvent(v=>({...v, price: e.target.value}))} />
            <input required className="border p-2 rounded" type="number" placeholder="Max Capacity" value={newEvent.capacity} onChange={e=>setNewEvent(v=>({...v, capacity: e.target.value}))} />
            <input className="border p-2 rounded" placeholder="Banner Image URL" value={newEvent.banner} onChange={e=>setNewEvent(v=>({...v, banner: e.target.value}))} />
          </div>
          <textarea className="border p-2 rounded w-full" placeholder="Description" value={newEvent.description} onChange={e=>setNewEvent(v=>({...v, description: e.target.value}))} />
          <div className="flex gap-4">
            <button type="submit" className="bg-amber-500 text-white px-6 py-2 rounded font-bold">Add Event</button>
            <button type="button" className="bg-gray-200 px-6 py-2 rounded font-bold" onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {/* Event Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-gray-700 mb-2">{tab==='upcoming' ? 'Upcoming Events' : 'Past Events'}</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th>Name</th><th>Date</th><th>Location</th><th>Status</th><th>Tickets Sold</th><th>Capacity</th><th>Insights</th><th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {(tab==='upcoming'?upcomingEvents:pastEvents).map((e, idx) => (
              <tr key={idx} className="border-t border-gray-100">
                <td className="py-2 font-medium">{e.name}</td>
                <td>{e.date}</td>
                <td>{e.location}</td>
                <td><span className={`px-2 py-1 rounded-full text-xs font-bold shadow ${e.status==='Open' ? 'bg-green-100 text-green-700' : e.status==='Booked' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-800'}`}>{e.status}</span></td>
                <td>{e.ticketsSold}</td>
                <td>{e.capacity}</td>
                <td>
                  <div className="text-xs">
                    <div>Revenue: <span className="font-bold">₹{e.ticketsSold * e.price}</span></div>
                    <div>Demographics: <span className="text-green-700">{e.demographics.local} local</span>, <span className="text-blue-700">{e.demographics.international} intl</span></div>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col gap-1">
                    {e.feedback.map((f, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs">
                        <span className="text-amber-400">{'★'.repeat(f.rating)}{'☆'.repeat(5-f.rating)}</span>
                        <span className="ml-1 text-gray-600">{f.review}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const HomestaysView: React.FC = () => <div className="text-xl font-semibold">Homestays Management (to be implemented)</div>;
const EcotourismView: React.FC = () => <div className="text-xl font-semibold">Ecotourism Management (to be implemented)</div>;
const OrdersView: React.FC = () => <div className="text-xl font-semibold">Orders & Bookings (to be implemented)</div>;
const PaymentsView: React.FC = () => <div className="text-xl font-semibold">Payments & Transactions (to be implemented)</div>;
const ReportsView: React.FC = () => <div className="text-xl font-semibold">Reports & Analytics (to be implemented)</div>;
const ProfileView: React.FC = () => <div className="text-xl font-semibold">Profile & Settings (to be implemented)</div>;
const SupportView: React.FC = () => <div className="text-xl font-semibold">Support & Help (to be implemented)</div>;

// --- MAIN DASHBOARD COMPONENT ---
const VendorDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'products': return <HandicraftsView />;
      case 'events': return <EventsView />;
      case 'homestays': return <HomestaysView />;
      case 'ecotourism': return <EcotourismView />;
      case 'orders': return <OrdersView />;
      case 'payments': return <PaymentsView />;
      case 'reports': return <ReportsView />;
      case 'profile': return <ProfileView />;
      case 'support': return <SupportView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-stone-100 font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-stone-100 p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;
