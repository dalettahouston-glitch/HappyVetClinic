import api from "./api";

const API_URL = "/vets";

export const getAllVets = () => api.get(API_URL);
export const getVetById = (id) => api.get(`${API_URL}/${id}`);
export const createVet = (data) => api.post(API_URL, data);
export const updateVet = (id, data) => api.put(`${API_URL}/${id}`, data);
export const deleteVet = (id) => api.delete(`${API_URL}/${id}`);