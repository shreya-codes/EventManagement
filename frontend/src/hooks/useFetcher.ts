import useSwr, { SWRConfiguration } from "swr";
import { AxiosRequestHeaders } from "axios";

import useAxiosConfig from "./useAxiosConfig";

export interface IAxiosParams {
  params?: Record<string, any>;
  headers?: AxiosRequestHeaders;
  swrOptions?: SWRConfiguration;
}

const useFetcher = <T = any>(endpoint: string, options?: IAxiosParams) => {
  const axiosInstance = useAxiosConfig();

  const fetcher = async (endpoint: string) => {
    const response = await axiosInstance.get<T>(endpoint, {
      headers: { ...options?.headers },
    });
    return response.data;
  };

  const swrResponse = useSwr<T>(endpoint, fetcher, { ...options?.swrOptions });
  const refetch = () => {
    swrResponse.mutate();
  };

  return {
    data: swrResponse.data,
    error: swrResponse.error,
    isLoading: !swrResponse.error && !swrResponse.data,
    refetch,
  };
};

export default useFetcher;
