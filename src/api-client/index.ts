import axios from "axios";

const baseUrl = "http://localhost:8000/api/v1";

const API = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },  
});

export function setupInterceptors(
  onUnauthCallback?: (statusCode: number) => void
) {
  API.interceptors.response.use(
    (response) => {
      onUnauthCallback?.(response.status);
      return response;
    },
    (error) => {
      onUnauthCallback?.(error.response.status);
      return Promise.reject(error);
    }
  );
}

export default API;
