import api from "@/api";

const API_URL = "/pets";

export const getAllPets = () => api.get(API_URL);
export const getPetById = (id) => api.get(`${API_URL}/${id}`);
export const createPet = (data) => api.post(API_URL, data);
export const updatePet = (id, data) => api.put(`${API_URL}/${id}`, data);
export const deletePet = (id) => api.delete(`${API_URL}/${id}`);