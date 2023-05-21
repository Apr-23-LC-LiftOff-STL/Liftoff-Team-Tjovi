import { create } from 'zustand'

export const useGenreStore = create((set) => ({
  selectedGenres: [], // Initialize as an empty array
  setSelectedGenres: (selectedGenres) => set({ selectedGenres }), // Update with an array value
}));