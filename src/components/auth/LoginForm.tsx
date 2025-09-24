// Login form for all user roles
import React, { useState } from 'react';
import { useAuthContext } from './AuthProvider';

const roles = ['tourist', 'guide', 'vendor', 'admin'];

const LoginForm: React.FC = () => {
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tourist');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, role);
    } catch (err) {
      setError('Login failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Login</h2>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded p-2" required />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded p-2" required />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Role</label>
        <select value={role} onChange={e => setRole(e.target.value)} className="w-full border rounded p-2">
          {roles.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
        </select>
      </div>
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">Login</button>
    </form>
  );
};

export default LoginForm;
