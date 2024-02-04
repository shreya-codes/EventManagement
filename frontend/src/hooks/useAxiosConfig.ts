import axios, { AxiosRequestConfig } from "axios";
const useAxiosConfig = (config?: AxiosRequestConfig) => {
  const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    withCredentials: true,
    ...config,
    headers: {
      "Content-type": "application/json",
      ...config?.headers,
    },
  });

  return axiosClient;
};

export default useAxiosConfig;
