import { create } from "zustand";

type AuthState = {
  email: string;
  setEmail: (email: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
}));
