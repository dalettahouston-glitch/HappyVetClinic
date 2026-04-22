import axios from "axios";

const API_URL = "http://localhost:8081/pets";

export const getAllPets = () => axios.get(API_URL);
export const getPetById = (id) => axios.get(`${API_URL}/${id}`);
export const createPet = (data) => axios.post(API_URL, data);
export const updatePet = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deletePet = (id) => axios.delete(`${API_URL}/${id}`);