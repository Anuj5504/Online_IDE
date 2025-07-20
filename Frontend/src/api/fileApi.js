import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000/api", 
    withCredentials: true, 
});

export const getFiles=(id)=>API.get(`/file/${id}`);

export const getFileContent=(id)=>API.get(`/file/getfilecontent/${id}`);

export const updateFileContent=(id,data)=>API.get(`/updatefile/${id}`,data);

export const createFile=(data)=>API.post("/file/createfile",data);