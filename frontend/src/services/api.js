import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  signup: (data) => apiClient.post('/auth/signup', data),
  login: (data) => apiClient.post('/auth/login', data),
  getProfile: () => apiClient.get('/auth/profile'),
};

// Employee APIs
export const employeeAPI = {
  addEmployee: (data) => apiClient.post('/employees', data),
  getAllEmployees: (page = 1, limit = 10) =>
    apiClient.get(`/employees?page=${page}&limit=${limit}`),
  searchEmployees: (params) => apiClient.get('/employees/search', { params }),
  getEmployeeById: (id) => apiClient.get(`/employees/${id}`),
  updateEmployee: (id, data) => apiClient.put(`/employees/${id}`, data),
  deleteEmployee: (id) => apiClient.delete(`/employees/${id}`),
  getAnalytics: () => apiClient.get('/employees/analytics'),
};

// AI APIs
export const aiAPI = {
  getRecommendation: (employeeId) =>
    apiClient.post(`/ai/recommend/${employeeId}`),
  generateBulkRecommendations: () => apiClient.post('/ai/bulk-recommend'),
  rankEmployees: () => apiClient.get('/ai/rank/all'),
  getDepartmentRecommendations: (department) =>
    apiClient.get(`/ai/department/${department}`),
  getPromotionCandidates: (minScore = 80) =>
    apiClient.get(`/ai/promotion-candidates?minScore=${minScore}`),
};

export default apiClient;
