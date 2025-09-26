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
          console.log('Request interceptor - Adding Authorization header for:', config.url);
          console.log('Request interceptor - Token preview:', token.substring(0, 50) + '...');
        } else {
          console.warn('Request interceptor - No token found in localStorage for:', config.url);
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
      // Debug: Check token before making request
      const token = localStorage.getItem('authToken');
      console.log('CreateReport - Token exists:', !!token);
      
      // Decode token to check contents
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log('CreateReport - Sending userId to backend:', payload.userId);
          console.log('CreateReport - Sending role to backend:', payload.role);
        } catch (e) {
          console.error('CreateReport - Token decode error:', e);
        }
      }
      
      // Remove Content-Type header to let browser set it automatically for multipart/form-data
      const response = await this.api.post('/report/create', formData);
      return { success: true, ...response.data };
    } catch (error) {
      console.error('CreateReport API Error:', error.response?.data);
      console.error('CreateReport Error status:', error.response?.status);
      console.error('CreateReport Error message from backend:', error.response?.data?.message);
      
      // If 401, show exact backend error
      if (error.response?.status === 401) {
        console.error('🚨 BACKEND AUTHENTICATION ERROR:');
        console.error('Backend says:', error.response?.data?.message);
        console.error('This means your authMiddleware is not finding the user in database');
      }
      
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