import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem('admin');
    if (stored) {
      const { email: storedEmail, password: storedPassword } = JSON.parse(stored);
      if (email === storedEmail && password === storedPassword) {
        navigate('/admin-dashboard');
        return;
      }
    }
    setError('Invalid credentials');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          Don't have an account?{' '}
          <button className="text-purple-600 underline" onClick={() => navigate('/admin-signup')}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
