import { create } from "zustand";

type LoginModalStore = {
  data: {
    title: string;
    description: string;
  };
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  action: () => void;
};

export const useLoginModal = create<LoginModalStore>((set) => ({
  data: {
    title: "",
    description: "",
  },
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, data: { title: "", description: "" } }),
  action: () => {},
}));
