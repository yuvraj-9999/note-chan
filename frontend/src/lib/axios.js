import axios from "axios";

// in production there is no localhost it will be dynanmic so we have to make our baseURL dynamic 
const BASE_URL = import.meta.env.MODE = "development" ? "ttp://localhost:5001/api" : "/api";
const api = axios.create({
    baseURL: BASE_URL,
});

export default api;