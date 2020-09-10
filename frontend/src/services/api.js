import axios from "axios";

const api = axios.create({
  baseURL: "https://apitrelloclone.herokuapp.com/",
});

export default api;
