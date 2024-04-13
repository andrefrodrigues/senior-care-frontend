import { useMutation } from "react-query";
import { api } from "../requests";
import { LoginData, LoginResponse } from "../requests/login";
import { useUserStore } from "../../store/user-store";
import { ApiError } from "../types";

export const useLogin = () => {
    const userStore = useUserStore();
    return useMutation<LoginResponse, ApiError, LoginData>({ mutationFn: (data: LoginData) => api.login(data), onSuccess: ({ token }: LoginResponse) => {
        userStore.setToken(token);
    } });
};