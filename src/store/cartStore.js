import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      incrementCartItem: (id) =>
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

      decrementCartItem: (id) =>
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

      removeAllThisItem: (id) =>
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
                ? { ...movies, count: Math.max(movies.count - movies.count, 0) }
                : movies
            )
            .filter((movies) => movies.count);

          return {
            ...state,
            cart: updatedCart,
          };
        }),

      changeItemCount: (id, num) =>
        set((state) => {
          const isPresent = state.cart.findIndex((movies) => movies.id === id);

          const updatedCart = state.cart
            .map((movies) =>
              movies.id === id ? { ...movies, count: Math.max(num, 0) } : movies
            )
            .filter((movies) => movies.count);

          return {
            ...state,
            cart: updatedCart,
          };
        }),

      emptyCart: () =>
        set((state) => {
          return {
            ...state,
            cart: [],
          };
        }),

      fetchMovies: async () => {
        await fetch("http://localhost:8080/")
          .then((response) => response.json())
          .then((data) => set({ movies: data.results }));
      },
    }),
    {
      name: "cart-storage", // unique name
      getStorage: () => localStorage,
    } // (optional) by default, 'localStorage' is used
  )
);
