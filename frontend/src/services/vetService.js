import axios from "axios";

const API_URL = "http://localhost:8081/vets";

export const getAllVets = () => axios.get(API_URL);
export const getVetById = (id) => axios.get(`${API_URL}/${id}`);
export const createVet = (data) => axios.post(API_URL, data);
export const updateVet = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteVet = (id) => axios.delete(`${API_URL}/${id}`);