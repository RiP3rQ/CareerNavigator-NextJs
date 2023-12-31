import { create } from "zustand";

type VerifyModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useVerifyModal = create<VerifyModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
