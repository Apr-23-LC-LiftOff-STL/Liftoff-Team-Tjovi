import { create } from 'zustand'

export const useGenreStore = create((set) => ({
    selectedGenres: '',
    setSelectedGenres: (str) => set({selectedGenres: str}),
}));