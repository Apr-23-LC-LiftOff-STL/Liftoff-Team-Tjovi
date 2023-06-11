import { create } from "zustand";

export const useMovieCountStore = create((set) => ({
  movieCountGlobal: null,
  moviesPerPageGlobal: 30,
  setMovieCountGlobal: (int) => set({ movieCountGlobal: int }),
  setMoviesPerPageGlobal: (int) => set({ moviesPerPageGlobal: int }),
}));
