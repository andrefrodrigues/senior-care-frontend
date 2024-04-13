import { create } from 'zustand';
import { get as getFromLocalStorage, set as setOnLocalStorage, remove } from 'local-storage';
import { apiInstance, configureInterceptors } from '../api/requests/axios';

type User = {
  username: string;
  name: string;
  createdAt:string;
}

type UserStore = {
    user?: User;
    token?: string;
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
    isLoggedIn: () => !!get().token,
    setToken: (token: string): void => {
      set({ token });
      configureInterceptors(apiInstance, loadedToken);
      setOnLocalStorage(TOKEN_KEY, token);
    },
    logout: (): void => {
      set({token: undefined});
      remove(TOKEN_KEY);
    }
  };
});

export const useUserStore = () => {
  return userStore.getState();
}