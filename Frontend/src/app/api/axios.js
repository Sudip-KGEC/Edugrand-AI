import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
  timeout: 10000,
});

//  RESPONSE INTERCEPTOR ONLY
axiosInstance.interceptors.response.use(
  (response) => {
    const normalize = (data) => {
      if (!data) return data;

      if (Array.isArray(data)) {
        return data.map((item) => ({
          ...item,
          id: item._id || item.id,
        }));
      }

      if (typeof data === "object") {
        return {
          ...data,
          id: data._id || data.id,
        };
      }

      return data;
    };

    response.data = normalize(response.data);

    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    console.error("API Error:", message);

    return Promise.reject({ message, status });
  }
);

export default axiosInstance;