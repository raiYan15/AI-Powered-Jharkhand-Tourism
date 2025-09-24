// Social login buttons (Google, Facebook, etc.)
import React from 'react';

const SocialLogin: React.FC = () => {
  // TODO: Integrate real social login providers
  return (
    <div className="flex flex-col gap-3 mt-4">
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition flex items-center justify-center gap-2">
        <span>🔵</span> Login with Facebook
      </button>
      <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition flex items-center justify-center gap-2">
        <span>🟠</span> Login with Google
      </button>
      {/* Add more providers as needed */}
    </div>
  );
};

export default SocialLogin;
