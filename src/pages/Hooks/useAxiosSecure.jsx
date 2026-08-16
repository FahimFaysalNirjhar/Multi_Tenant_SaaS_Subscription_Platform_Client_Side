import axios from "axios";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "https://multi-tenant-saa-s-subscription-pla.vercel.app",
  });

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");

      console.log("Access token:", token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });
      }

      return Promise.reject(error);
    },
  );

  return axiosSecure;
};

export default useAxiosSecure;
