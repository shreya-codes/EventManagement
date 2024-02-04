import { useState } from "react";
import { useToasts } from "./useToast";
import useAxiosConfig from "./useAxiosConfig";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type IAxiosResponseType = AxiosResponse | AxiosError;

interface IMutationOptions {
  options?: AxiosRequestConfig;
  onSuccess?: (data?: AxiosResponse) => void | Promise<void>;
  onError?: (error?: AxiosError) => void | Promise<void>;
  onSettled?: (data?: IAxiosResponseType) => void | Promise<void>;
  successMessage?: string;
}

const useMutation = () => {
  const axiosInstance = useAxiosConfig();
  const [isMutating, setIsMutating] = useState(false);
  const [isError, setIsError] = useState(false);
  const [responseData, setResponseData] = useState<IAxiosResponseType>();
  const { showSuccessMessage, showErrorMessage } = useToasts();

  const mutate = async ({
    options,
    onSuccess,
    onError,
    onSettled,
    successMessage,
  }: IMutationOptions): Promise<void> => {
    setIsMutating(true);

    try {
      const response = (await axiosInstance(
        options as AxiosRequestConfig
      )) as AxiosResponse;
      setIsError(false);
      setResponseData(response);
      if (successMessage) {
        showSuccessMessage(successMessage);
      }
      await onSuccess?.(response);
    } catch (error) {
      const errorResponse = error as AxiosError<{
        message: string;
        error: string;
      }>;
      await onError?.(errorResponse);
      if (axios.isAxiosError(error) && errorResponse) {
        showErrorMessage(
          errorResponse.response?.data?.error
            ? errorResponse.response.data.error
            : errorResponse.message
        );
      }
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await onSettled?.(responseData!);
      setIsMutating(false);
    }
  };

  const postRequest = (url: string, args: IMutationOptions) => {
    mutate({
      ...args,
      options: {
        url,
        method: "POST",
        ...args.options,
      },
    });
  };

  const putRequest = (url: string, args: IMutationOptions) => {
    mutate({
      ...args,
      options: {
        url,
        method: "PUT",
        ...args.options,
      },
    });
  };

  const patchRequest = (url: string, args: IMutationOptions) => {
    mutate({
      ...args,
      options: {
        url,
        method: "PATCH",
        ...args.options,
      },
    });
  };

  const deleteRequest = (url: string, args: IMutationOptions) => {
    mutate({
      ...args,
      successMessage: "deleted",
      options: {
        url,
        method: "DELETE",
        ...args.options,
      },
    });
  };

  return {
    deleteRequest,
    postRequest,
    patchRequest,
    putRequest,
    isMutating,
    isError,
    responseData,
  };
};

export default useMutation;
