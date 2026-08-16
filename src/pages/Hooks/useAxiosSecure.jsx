import { useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
  const navigate = useNavigate();

  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: "https://multi-tenant-saa-s-subscription-pla.vercel.app",
    });

    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
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

    return instance;
  }, [navigate]); // ✅ satisfies the lint rule, still stable

  return axiosSecure;
};

export default useAxiosSecure;
