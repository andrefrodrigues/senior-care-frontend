import { AxiosError, AxiosInstance } from "axios";
import { ApiError } from "../types";

type UserData = {
    username: string;
    name: string;
    createdAt:string;
};

export const currentUserRequest = (instance: AxiosInstance) => {
    return (): Promise<UserData> => {
        return instance.get<UserData>('/me')
        .then((response)=> {
            return response.data;
        }).catch((error: AxiosError<ApiError>) => {
            return Promise.reject(error.response?.data);
        });
    }
};