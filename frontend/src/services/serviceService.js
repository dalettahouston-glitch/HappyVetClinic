import api from "./api";
 
const API_URL = "/services";
 
export const getAllServices = () => api.get(API_URL);
export const getServiceById = (id) => api.get(`${API_URL}/${id}`);
export const createService = (data) => api.post(API_URL, data);
export const updateService = (id, data) => api.put(`${API_URL}/${id}`, data);
export const deleteService = (id) => api.delete(`${API_URL}/${id}`);