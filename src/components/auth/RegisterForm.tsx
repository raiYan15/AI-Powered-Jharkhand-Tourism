// Registration form for all user roles
import React, { useState } from 'react';
import { useAuthContext } from './AuthProvider';

const roles = ['tourist', 'guide', 'vendor', 'admin'];

const RegisterForm: React.FC = () => {
  const { register } = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tourist');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      setSuccess('Registration successful!');
      setError('');
    } catch (err) {
      setError('Registration failed.');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Register</h2>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {success && <div className="text-green-600 text-center">{success}</div>}
      <div>
        <label className="block mb-1 font-semibold">Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded p-2" required />
      </div>
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
      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">Register</button>
    </form>
  );
};

export default RegisterForm;
