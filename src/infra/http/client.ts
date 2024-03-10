// Core
import axios, { AxiosInstance } from 'axios';

// Interceptors
import { addRequestWithTokenInterceptor } from './interceptors/token.interceptor';

const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

addRequestWithTokenInterceptor(httpClient);

export default httpClient;
