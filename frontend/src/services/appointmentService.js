import api from "./api";
 
const API_URL = "/appointments";
 
export const getAllAppointments = () => api.get(API_URL);
export const getAppointmentById = (id) => api.get(`${API_URL}/${id}`);
export const createAppointment = (data) => api.post(API_URL, data);
export const updateAppointment = (id, data) => api.put(`${API_URL}/${id}`, data);
export const deleteAppointment = (id) => api.delete(`${API_URL}/${id}`);