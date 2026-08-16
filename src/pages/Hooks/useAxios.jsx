import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://multi-tenant-saa-s-subscription-pla.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
