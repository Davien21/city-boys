import { create } from "zustand";

interface MyState {
  address: string;
  setAddress: (address: string) => void;
}

export const useAddressStore = create<MyState>()((set, get) => ({
  address: "",
  setAddress: (address: string) => set({ address }),
}));
