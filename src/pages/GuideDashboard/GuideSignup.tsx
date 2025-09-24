
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../components/auth/AuthProvider';

const GuideSignup: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuthContext();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setLoading(true);
    try {
      await register(name, email, password, 'Guide');
      navigate('/guide-dashboard');
    } catch (err: any) {
      // Try to show backend error message if available
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-green-200 via-blue-200 to-yellow-100 animate-gradient-move">
      {/* Animated floating shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute bg-green-300 opacity-30 rounded-full w-72 h-72 animate-float-slow left-[-6rem] top-[-6rem]" />
        <div className="absolute bg-blue-300 opacity-20 rounded-full w-96 h-96 animate-float-medium right-[-8rem] top-1/3" />
        <div className="absolute bg-yellow-200 opacity-30 rounded-full w-60 h-60 animate-float-fast left-1/2 bottom-[-5rem]" />
      </div>
      <div className="relative z-10 bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-md border border-green-100">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700 drop-shadow-lg">Guide Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-300 transition"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-300 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-yellow-300 transition"
            required
          />
          {error && <div className="text-red-500 text-sm animate-pulse">{error}</div>}
          <button type="submit" className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-200 disabled:opacity-60" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          Already have an account?{' '}
          <button className="text-green-600 underline hover:text-blue-600 transition" onClick={() => navigate('/guide-login')}>
            Login
          </button>
        </div>
      </div>
      {/* Animations CSS */}
      <style>{`
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 8s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(40px) scale(1.08); }
        }
        .animate-float-medium { animation: float-medium 9s ease-in-out infinite; }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(0.97); }
        }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default GuideSignup;
