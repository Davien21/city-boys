import { create } from "zustand";

interface MyState {
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (isWalletModalOpen: boolean) => void;
  isLogoutModalOpen: boolean;
  setIsLogoutModalOpen: (isLogoutModalOpen: boolean) => void;
  address: string;
  setAddress: (address: string) => void;
}

export const useWalletStore = create<MyState>()((set, get) => ({
  isWalletModalOpen: false,
  setIsWalletModalOpen: (isWalletModalOpen: boolean) => {
    set({ isWalletModalOpen });
  },
  isLogoutModalOpen: false,
  setIsLogoutModalOpen: (isLogoutModalOpen: boolean) => {
    set({ isLogoutModalOpen });
  },
  address: "sads324rda3243rd31243rds312453refs32435ref",
  setAddress: (address: string) => set({ address }),
}));
