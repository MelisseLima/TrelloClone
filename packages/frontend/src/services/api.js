import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apitrelloclone.herokuapp.com',
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
  },
});

export default api;
