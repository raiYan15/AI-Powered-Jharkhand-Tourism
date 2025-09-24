// Password recovery form
import React, { useState } from 'react';

const PasswordRecovery: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement real password recovery logic (API call)
      setSent(true);
      setError('');
    } catch (err) {
      setError('Failed to send recovery email.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Password Recovery</h2>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {sent ? (
        <div className="text-green-600 text-center">Recovery email sent! Check your inbox.</div>
      ) : (
        <>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded p-2" required />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">Send Recovery Email</button>
        </>
      )}
    </form>
  );
};

export default PasswordRecovery;
