// Core
import { AxiosInstance } from 'axios';

// Stores
import authStore from '~/domain/auth/auth.store';

export const addRequestWithTokenInterceptor = (httpClient: AxiosInstance): number => {
  return httpClient.interceptors.request.use(function (config) {
    const key = authStore.getApiKey();
    if (key) {
      config.headers.auth = `${key}`;
    }

    return config;
  });
};
