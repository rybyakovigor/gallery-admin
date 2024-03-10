// Core
import { AxiosInstance } from 'axios';

export const addRequestWithTokenInterceptor = (httpClient: AxiosInstance): number => {
  return httpClient.interceptors.request.use(function (config) {
    const key = localStorage.getItem('auth');
    if (key) {
      config.headers.auth = `${key}`;
    }

    return config;
  });
};
