import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full">
      <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <h2 className="mt-4 text-xl font-semibold text-gray-700">Fetching Your Location...</h2>
      <p className="mt-2 text-gray-500">Please wait while we find nearby transport options.</p>
      <p className="mt-1 text-sm text-gray-400">(This may require location permissions)</p>
    </div>
  );
};
