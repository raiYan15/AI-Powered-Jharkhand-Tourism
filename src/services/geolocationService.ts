// src/services/geolocationService.ts
// Geolocation utility functions for React app

export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

export function getInitialLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation is not supported by your browser.'));
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Geolocation permission was denied. Please enable it in your browser settings.'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information is unavailable.'));
            break;
          case error.TIMEOUT:
            reject(new Error('The request to get user location timed out.'));
            break;
          default:
            reject(new Error('An unknown error occurred while getting location.'));
            break;
        }
      },
      GEOLOCATION_OPTIONS
    );
  });
}

export function watchUserLocation(
  onSuccess: (coords: Coordinates) => void,
  onError: (error: Error) => void
): () => void {
  if (!navigator.geolocation) {
    onError(new Error('Geolocation is not supported by your browser.'));
    return () => {};
  }
  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      onSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
    },
    (error) => {
      let errorMessage = 'An unknown error occurred while watching location.';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Geolocation permission was denied. Live tracking is disabled.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          errorMessage = 'The request to get user location timed out.';
          break;
      }
      onError(new Error(errorMessage));
    },
    GEOLOCATION_OPTIONS
  );
  return () => navigator.geolocation.clearWatch(watchId);
}
