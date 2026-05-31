import {create} from "zustand";
import { AxiosError } from "axios";
import { TOKEY_KEY } from "@/services/api";
import { AuthState } from "@/types/auth-types";
import { signup as signupService } from "@/services/auth-service";

interface AuthStore extends AuthState {
  signup: (email: string, password: string, role: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem(TOKEY_KEY) || null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
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
  logout: () => {
    localStorage.removeItem(TOKEY_KEY)
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    })
  },
}))