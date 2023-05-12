import { create } from 'zustand'

export const useSearchStore = create((set) => ({
    searchTerm: '',
    setSearchTerm: (str) => set({searchTerm: str}),
}));