import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(email, password) {
    const response = await this.api.post('/user/login', { email, password });
    return response.data;
  }

  async signup(userData) {
    const response = await this.api.post('/user/signup', userData);
    return response.data;
  }

  // Reports - Based on your backend routes
  async createReport(formData) {
    try {
      // Remove Content-Type header to let browser set it automatically for multipart/form-data
      const response = await this.api.post('/report/create', formData);
      return { success: true, ...response.data };
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create report';
      return { success: false, message: errorMessage };
    }
  }

  // Add these methods based on your backend needs
  async getUserReports() {
    try {
      const response = await this.api.get('/report/user-reports');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reports');
    }
  }

  async getAllReports() {
    try {
      const response = await this.api.get('/report/allreports');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reports');
    }
  }

  // Admin specific methods
  async getAllUsers() {
    try {
      const response = await this.api.get('/alluser');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  }
}

const apiService = new ApiService();

// Named exports
export const createReport = (formData) => apiService.createReport(formData);
export const login = (email, password) => apiService.login(email, password);
export const signup = (userData) => apiService.signup(userData);
export const getUserReports = () => apiService.getUserReports();
export const getAllReports = () => apiService.getAllReports();
export const getAllUsers = () => apiService.getAllUsers();

export default apiService;