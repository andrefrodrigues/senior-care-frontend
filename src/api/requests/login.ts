import { AxiosError, AxiosInstance } from "axios";
import { ApiError } from "../types";

export type LoginData = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

export const loginRequest = (instance: AxiosInstance) => {
    return (data: LoginData): Promise<LoginResponse> => {
        return instance.post<LoginResponse>('/login', data)
        .then((response) => {
            return response.data as LoginResponse;
        }).catch((error: AxiosError<ApiError>) => {
            return Promise.reject(error.response?.data);
        });
    }
};