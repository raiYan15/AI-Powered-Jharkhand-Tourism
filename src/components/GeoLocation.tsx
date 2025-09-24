import React, { useEffect, useState } from 'react';
import { getInitialLocation, watchUserLocation, Coordinates } from '../services/geolocationService';

const GeoLocation: React.FC = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [watching, setWatching] = useState(false);

  useEffect(() => {
    getInitialLocation()
      .then(setLocation)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    if (watching) {
      cleanup = watchUserLocation(
        (coords) => {
          setLocation(coords);
          setError(null);
        },
        (err) => setError(err.message)
      );
    }
    return () => {
      if (cleanup) cleanup();
    };
  }, [watching]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Geo Location</h2>
      {location ? (
        <div className="mb-4">
          <p><span className="font-semibold">Latitude:</span> {location.latitude}</p>
          <p><span className="font-semibold">Longitude:</span> {location.longitude}</p>
          {location.accuracy && <p><span className="font-semibold">Accuracy:</span> {location.accuracy} meters</p>}
        </div>
      ) : error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : (
        <div className="mb-4">Fetching location...</div>
      )}
      <button
        className={`px-4 py-2 rounded text-white ${watching ? 'bg-red-500' : 'bg-blue-600'} hover:opacity-80`}
        onClick={() => setWatching((w) => !w)}
      >
        {watching ? 'Stop Live Tracking' : 'Start Live Tracking'}
      </button>
    </div>
  );
};

export default GeoLocation;
