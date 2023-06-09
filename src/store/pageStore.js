import { create } from 'zustand'

export const usePageStore = create((set) => ({
  pageNumberMemory: 0,
  setPageNumberMemory: (int) => set({ pageNumberMemory: int }),
}));