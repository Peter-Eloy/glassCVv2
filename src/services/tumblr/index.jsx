// src/services/tumblr/index.jsx
import axios from "axios";

// Create an axios instance with default config
const tumblrApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // This will be http://localhost:3000/api in dev
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Error handler helper
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new Error(error.response.data.message || "Error from server");
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error("No response from server");
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error("Error setting up request");
  }
};

// Service functions
export const tumblrService = {
  // Get all posts (with optional pagination)
  getPosts: async (page = 1, limit = 9) => {
    try {
      const response = await tumblrApi.get("/tumblr/posts", {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Get a single post by ID
  getPost: async (postId) => {
    try {
      const response = await tumblrApi.get(`/tumblr/posts/${postId}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Get latest posts
  getLatestPosts: async (limit = 9) => {
    try {
      const response = await tumblrApi.get("/tumblr/posts/latest", {
        params: {
          limit,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Search posts
  searchPosts: async (query, page = 1, limit = 9) => {
    try {
      const response = await tumblrApi.get("/tumblr/posts/search", {
        params: {
          q: query,
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// Request interceptor for logging or modifying requests
tumblrApi.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other headers here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses globally
tumblrApi.interceptors.response.use(
  (response) => {
    // You can transform the data here
    return response;
  },
  (error) => {
    // You can handle errors globally here
    return Promise.reject(error);
  }
);

export default tumblrService;
