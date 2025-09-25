import axios from 'axios';

// Create an instance of axios with default configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  withCredentials: true, // This ensures cookies are included in requests and responses
  headers: {
    'Content-Type': 'application/json',
  },
  // Set timeout to handle potential network issues
  timeout: 10000,
});

// Request interceptor to add credentials to every request
apiClient.interceptors.request.use(
  (config) => {
    // Log the request in development mode to debug issues
    if (process.env.NODE_ENV !== 'production') {
      console.log('Making request to:', config.baseURL + config.url, 'with config:', config);
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally if needed
apiClient.interceptors.response.use(
  (response) => {
    // Log the response in development mode to debug issues
    if (process.env.NODE_ENV !== 'production') {
      console.log('Response received:', response);
    }
    return response;
  },
  (error) => {
    // Handle global error responses here if needed
    console.error('API Error:', error.response || error.message || error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to extract JWT from cookies and store in localStorage if needed
// This is for demonstration purposes; in production, httpOnly cookies are more secure
apiClient.interceptors.response.use(
  (response) => {
    // Note: JavaScript cannot directly read httpOnly cookies
    // So we cannot extract them from the response here
    // The httpOnly cookies are managed automatically by the browser
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;