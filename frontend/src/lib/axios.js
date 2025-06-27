import axios from 'axios';
console.log(import.meta.env.MODE);
// Creating a new instance of axios
const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5001/api'
    : '/api';
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
