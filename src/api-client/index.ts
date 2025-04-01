import { Axios } from "axios";
// import { BaseUrl } from "./helpers";

const baseUrl = 'http://localhost:8000/api/v1';

const API = new Axios({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkphbWVzIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNzQzNTA1NDE0fQ.POSnqcqUBPCkAAisrTSqDp038sDC_HHWbkgxg0cFFkc",
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
