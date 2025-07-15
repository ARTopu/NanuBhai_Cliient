import axios from 'axios';

// API base URL for authentication
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/user`;

// Interface for API response
interface ApiResponse {
  success: boolean;
  message: string;
  user?: any;
  access_token?: string;
  errors?: string[];
}

// Interface for login data
interface LoginData {
  email: string;
  password: string;
}

// Interface for register data
interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  profileImage?: string;
}

// Interface for user profile
interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  image?: string;
  profileImage?: string;
  status: 'active' | 'inactive';
  role: 'admin' | 'customer';
  provider: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth service object
export const authService = {
  // Login user
  async login(loginData: LoginData) {
    console.log('Logging in with:', { email: loginData.email });

    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/login`, loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Important for cookies
      });

      console.log('Login response:', response.data);

      if (response.data.success && response.data.access_token) {
        // Store the access token in localStorage
        localStorage.setItem('access_token', response.data.access_token);
        
        // Store user data
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }

      return response;
    } catch (error: unknown) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error;
    }
  },

  // Register user
  async register(registerData: RegisterData) {
    console.log('Registering user:', { name: registerData.name, email: registerData.email, phone: registerData.phone });

    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/register`, registerData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Register response:', response.data);
      return response;
    } catch (error: unknown) {
      console.error('Register error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error;
    }
  },

  // Logout user
  async logout() {
    console.log('Logging out user');

    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/logout`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      // Clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');

      console.log('Logout response:', response.data);
      return response;
    } catch (error: unknown) {
      console.error('Logout error:', error);
      // Clear local storage even if API call fails
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      throw error;
    }
  },

  // Get current user profile
  async getCurrentUser() {
    console.log('Getting current user profile');

    try {
      const response = await axios.get<ApiResponse>(`${API_BASE_URL}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
        withCredentials: true,
      });

      console.log('Get current user response:', response.data);
      return response;
    } catch (error: unknown) {
      console.error('Get current user error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error;
    }
  },

  // Update user profile
  async updateProfile(profileData: Partial<UserProfile> & { profileImageFile?: File }) {
    try {
      let data: any = profileData;
      let headers: any = {
        'Authorization': `Bearer ${this.getAccessToken()}`,
      };
      if (profileData.profileImageFile) {
        data = new FormData();
        if (profileData.name) data.append('name', profileData.name);
        if (profileData.phone) data.append('phone', profileData.phone);
        if (profileData.address) data.append('address', JSON.stringify(profileData.address));
        data.append('profileImage', profileData.profileImageFile);
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        headers['Content-Type'] = 'application/json';
      }
      const response = await axios.put<ApiResponse>(`${API_BASE_URL}/update-profile`, data, {
        headers,
        withCredentials: true,
      });
      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Update profile error:', error.response.data);
      }
      throw error;
    }
  },

  // Update user password
  async updatePassword(passwordData: { currentPassword: string; newPassword: string }) {
    console.log('Updating user password');

    try {
      const response = await axios.put<ApiResponse>(`${API_BASE_URL}/update-password`, passwordData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
        withCredentials: true,
      });

      console.log('Update password response:', response.data);
      return response;
    } catch (error: unknown) {
      console.error('Update password error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error;
    }
  },

  // Forgot password
  async forgotPassword(email: string) {
    console.log('Requesting password reset for:', email);

    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/forget-password`, { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Forgot password response:', response.data);
      return response;
    } catch (error: unknown) {
      console.error('Forgot password error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error;
    }
  },

  // Reset password
  async resetPassword(token: string, newPassword: string) {
    console.log('Resetting password with token');

    try {
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/reset-password/${token}`, { 
        password: newPassword 
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Reset password response:', response.data);
      return response;
    } catch (error: unknown) {
      console.error('Reset password error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error;
    }
  },

  // Utility functions
  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  },

  getUser(): UserProfile | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },

  isCustomer(): boolean {
    const user = this.getUser();
    return user?.role === 'customer';
  },

  // Create axios instance with auth headers
  createAuthInstance() {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
      withCredentials: true,
    });

    // Add auth token to requests
    instance.interceptors.request.use((config) => {
      const token = this.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle token refresh on 401 errors
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }
};

export default authService; 