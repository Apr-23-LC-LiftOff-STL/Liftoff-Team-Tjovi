import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist((set, get) => ({
    cart: [],
    addToCart: (id) =>
      set((state) => {
        const isPresent = state.cart.find((movies) => movies.id === id);

        if (!isPresent) {
          return {
            ...state,
            cart: [...state.cart, { id, count: 1 }],
          };
        }

        const updatedCart = state.cart.map((movies) =>
          movies.id === id ? { ...movies, count: movies.count + 1 } : movies
        );

        return {
          ...state,
          cart: updatedCart,
        };
      }),

    removeFromCart: (id) =>
      set((state) => {
        const isPresent = state.cart.findIndex((movies) => movies.id === id);

        if (isPresent === -1) {
          return {
            ...state,
          };
        }

        const updatedCart = state.cart
          .map((movies) =>
            movies.id === id
              ? { ...movies, count: Math.max(movies.count - 1, 0) }
              : movies
          )
          .filter((movies) => movies.count);

        return {
          ...state,
          cart: updatedCart,
        };
      }),

      // TODO:  need a "removeAllThisMovie" function

      emptyCart: () =>
      set((state) => {

        return {
          ...state,
          cart: [],
        };
      }),

    cartTotalItems: () => {
      console.log(`Number of unique movies in cart: ${get().cart.length}`);
    },

    fetchMovies: async () => {
      await fetch("http://localhost:8080/")
        .then((response) => response.json())
        .then((data) => set({ movies: data.results }));
    },
  }),
  {
    name: 'cart-storage', // unique name
    getStorage: () => localStorage }, // (optional) by default, 'localStorage' is used
  )
);
