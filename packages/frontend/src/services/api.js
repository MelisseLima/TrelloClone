import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
  },
});

export default api;
