// Axios instance for backend API
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api'; // Change to your backend URL

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // if using cookies for auth
});
