import { showNotification } from "@mantine/notifications";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "./getCookies.service";

const client = axios.create({ baseURL: 'http://localhost:4000/' });

export const request = async (options: AxiosRequestConfig<any>) => {
  const token = getCookie("_auth");
  client.defaults.headers.common.authorization = `Bearer ${token}`;
  const onSuccess = (response: AxiosResponse) => response.data;
  const onError = (error: any) => {
    if (error.response.status >= 500) {
      showNotification({
        title: error.response?.data?.title,
        message: error.response?.data?.message,
        color: "red",
      });
    }
    return error.response;
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
