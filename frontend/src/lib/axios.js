import axios from 'axios';

// Creating a new instance of axios
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

export default api;
