import {create} from "zustand";
import { AxiosError } from "axios";
import { TOKEN_KEY } from "@/services/api";
import { AuthState } from "@/types/auth-types";
import { signup as signupService, login as loginService, getUser as getUserService } from "@/services/auth-service";

interface AuthStore extends AuthState {
  signup: (email: string, password: string, role: string, firstName: string, lastName: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  getUser: () => Promise<void>;
  logout: () => void;
  isInitialized: boolean;
}

const savedToken = localStorage.getItem(TOKEN_KEY);

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: savedToken,
  isLoading: false,
  error: null,
  isInitialized: !savedToken,
  isAuthenticated: !!savedToken,
  signup: async (email: string, password: string, role: string, firstName: string, lastName: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await signupService({email, password, role, firstName, lastName})
      if (response.data) {
        const {user} = response.data;
      
        set({
          user,
          isLoading: false,
        });
        return true
      }
      return false;
    } catch (error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
        isAuthenticated: false,
      });
      return false
    }
  },
   login: async(email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await loginService({ email, password });
      if (response.data) {
        const { user, token } = response.data;
        localStorage.setItem(TOKEN_KEY, token);
        
        set({
          user: user,
          token: token,
          isAuthenticated: true,
          isLoading: false,
        })
      }
    } catch (error) {
      const err = error as AxiosError<{error: string}>;
      set({
        error: err.response?.data?.error,
        isLoading: false,
        isAuthenticated: false
      });
    }
  },
  getUser: async () => {
     set({
      isLoading: true,
    })
    try {
      const response = await getUserService();
      if (response.data) {
        set({
          user: response.data,
          isLoading: false,
          isInitialized: true,
          error: null,
        })
      }
    } catch (error) {
       const err = error as AxiosError<{error: string}>;
        if (err.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        set({ user: null, token: null, isAuthenticated: false, isLoading: false, error: null, isInitialized: true, });
        return;
      }
      set({ error: err.response?.data?.error, isLoading: false });
    }
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    })
  },
}))