import axios from 'axios';

const api = axios.create({
  // Adjust the port if your backend runs on a different one (e.g., 8000 or 5000)
  baseURL: 'http://localhost:8000/api/v1', 
  withCredentials: true, // Required to send/receive cookies (Access/Refresh tokens)
});

export default api;