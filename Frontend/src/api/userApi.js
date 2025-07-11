import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000/api", 
    withCredentials: true, 
});

export const fetchUserSession = () => API.get("/user/me");

export const loginUser = (data) => API.post("/user/login", data);

export const logoutUser = () => API.post("/user/logout");

export const registerUser = (data) => API.post("/user/register", data);