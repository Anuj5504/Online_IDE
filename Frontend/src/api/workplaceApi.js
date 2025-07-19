import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000/api", 
    withCredentials: true, 
});

export const createWorkspaceApi=(data)=> API.post("/workspace/createworkspace",data);

export const getallworkspace=()=> API.get("/workspace/getallworkspace");