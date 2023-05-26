import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwtDecode from "jwt-decode";

export const useCartStore = create(
  
  persist(
    (set) => ({
      cart: [],
      cartUser: null,

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
            cartUser: null,
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
            cartUser: null,
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
            cartUser: null,
          };
        }),

/*       changeItemCount: (id, num) =>
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
        }), */

      emptyCart: () =>
        set((state) => {
          return {
            ...state,
            cart: [],
            cartUser: null,
          };
        }),

        initialize: () => {
          const token = localStorage.getItem("token");
          if (token) {
            const userData = jwtDecode(token);
            set({ cartUser: userData.username });
          }
        },

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
