import axios from 'axios';

export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  // Use Nominatim OpenStreetMap API for free reverse geocoding
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
  try {
    const response = await axios.get(url, { headers: { 'Accept-Language': 'en' } });
    const data = response.data;
    if (data && data.display_name) {
      return data.display_name;
    }
    return 'Unknown address';
  } catch (e) {
    return 'Unable to fetch address';
  }
}
