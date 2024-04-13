import { create } from 'zustand';
import { get as getFromLocalStorage, set as setOnLocalStorage, remove } from 'local-storage';
import { apiInstance, configureInterceptors } from '../api/requests/axios';
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  root: boolean;
};

type UserStore = {
    token?: string;
    decodedToken?: TokenPayload;
    isRoot: () => boolean;
    isLoggedIn: () => boolean;
    setToken: (token: string) => void;
    logout: () => void;
};

const TOKEN_KEY = 'token';

export const userStore = create<UserStore>((set, get) => {
  const loadedToken: string | undefined = getFromLocalStorage(TOKEN_KEY);
  configureInterceptors(apiInstance, loadedToken);

  return {
    token: loadedToken,
    decodedToken: undefined,
    isLoggedIn: () => !!get().token,
    setToken: (token: string): void => {
      set({ token });
      configureInterceptors(apiInstance, loadedToken);
      setOnLocalStorage(TOKEN_KEY, token);
    },
    logout: (): void => {
      set({token: undefined});
      remove(TOKEN_KEY);
    },
    isRoot: () => {
      const currentToken = get().token;
      if (!currentToken) {
        return false;
      }
      const decodedToken = get().decodedToken;
      if (decodedToken) {
        return decodedToken.root;
      }
      const decoded = jwtDecode<TokenPayload>(currentToken);
      set({decodedToken: decoded});
      return decoded.root;
    }
  };
});

export const useUserStore = () => {
  return userStore.getState();
}