import api from "./api";

const API_URL = "/api/auth";

export const login = (data) => api.post(`${API_URL}/login`, data);
export const register = (data) => api.post(`${API_URL}/register`, data);