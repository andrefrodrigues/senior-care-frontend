import axios, { AxiosInstance } from 'axios';

export const apiInstance = axios.create({baseURL: import.meta.env.VITE_API_URL});

export const configureInterceptors = (instance: AxiosInstance, token?: string): void => {
    instance.interceptors.request.use((config) => {
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
    });
};