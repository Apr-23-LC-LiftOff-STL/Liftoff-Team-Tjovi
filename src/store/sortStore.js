import { create } from 'zustand'

export const useSortStore = create((set) => ({
    sortOptions: ['title', 'ASC'],
    setSortOptions: (arr) => set({ sortOptions: arr }),
  }));