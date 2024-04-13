import { apiInstance } from "./axios";
import { currentUserRequest } from "./current-user";
import { loginRequest } from './login';

export const api = {
    login: loginRequest(apiInstance),
    currentUser: currentUserRequest(apiInstance)
}