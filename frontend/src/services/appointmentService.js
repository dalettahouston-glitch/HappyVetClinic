import axios from "axios";

const API_URL = "http://localhost:8081/appointments";

export const getAllAppointments = () => axios.get(API_URL);
export const getAppointmentById = (id) => axios.get(`${API_URL}/${id}`);
export const createAppointment = (data) => axios.post(API_URL, data);
export const updateAppointment = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteAppointment = (id) => axios.delete(`${API_URL}/${id}`);