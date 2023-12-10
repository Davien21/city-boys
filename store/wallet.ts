import { create } from "zustand";

interface MyState {
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (isWalletModalOpen: boolean) => void;
  address: string;
  setAddress: (address: string) => void;
}

export const useWalletStore = create<MyState>()((set, get) => ({
  isWalletModalOpen: false,
  setIsWalletModalOpen: (isWalletModalOpen: boolean) => {
    set({ isWalletModalOpen });
  },
  address: "",
  setAddress: (address: string) => set({ address }),
}));
