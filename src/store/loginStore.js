import { create } from 'zustand'

export const useLoginStore = create((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (bool) => set({ isLoggedIn: bool }),
  }));