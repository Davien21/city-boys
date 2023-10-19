import { createStore } from "zustand/vanilla";

type AuthState = {
  email: string;
  setEmail: (email: string) => void;
};

export const useAuthStore = createStore<AuthState>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
}));
