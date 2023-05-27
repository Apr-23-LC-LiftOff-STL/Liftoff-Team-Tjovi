import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      cartUser: null,

      incrementCartItem: async (id) => {
        set((state) => {
          const isPresent = state.cart.find((movies) => movies.id === id);
          const updatedCart = isPresent
            ? state.cart.map((movies) =>
                movies.id === id
                  ? { ...movies, count: movies.count + 1 }
                  : movies
              )
            : [...state.cart, { id, count: 1 }];

          const cartUser = state.cartUser; // IS THIS CORRECT ??

          try {
            const cartData = {
              cart: updatedCart,
              cartUser: cartUser,
            };

            // TODO - need API post endpoint for cart + user
            axios
              .post("your-api-post-endpoint", cartData)
              .then(() => {
                // TODO - need API get endpoint for cart + user
                axios
                  .get("your-api-get-endpoint")
                  .then((response) => {
                    // Update cart state with the data from the API response
                    set({
                      ...state,
                      cart: response.data.cart,
                      cartUser: response.data.cartUser,
                    });
                  })
                  .catch((error) => {
                    console.error("Error getting cart:", error);
                  });
              })
              .catch((error) => {
                console.error("Error updating cart:", error);
              });

            // Return updated state
            return {
              ...state,
              cart: updatedCart,
              cartUser: cartUser,
            };
          } catch (error) {
            console.error("Error updating cart:", error);
            return state;
          }
        });
      },

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
