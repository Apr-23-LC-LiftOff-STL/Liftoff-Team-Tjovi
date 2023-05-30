import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwtDecode from "jwt-decode";
import axios from "axios";

const apiPostEndpoint = "http://localhost:8080/cartUser";
const apiGetEndpoint = "http://localhost:8080/cartUser";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      cartUser: null,

      setCartUser: (user) => {
        set({ cartUser: user });
      },

      getCart: async () => {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = jwtDecode(token);
          set({ cartUser: userData.username });

          let cartData = [];

          try {
            const response = await axios.get(
              "http://localhost:8080/cart/returnAll/" + userData.username
            );
            cartData = response.data;
            console.log("getCart");
            console.log(userData.username);

            const cart = cartData.map(({ movieId, quantity }) => ({
              id: movieId,
              count: quantity
            }));

            console.log(cart);

            set((state) => ({
              cart: cart,
              cartUser: state.cartUser, // Preserve the existing value of cartUser
            }));
          } catch (error) {
            console.error("Error getting cart:", error);
          }
        }
      },

      logoutCart: async () => {
        set({ cart: [], cartUser: null });
        // add a final save of cart to DB?
      },

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

          const cartUser = state.cartUser;

          try {
            const cartData = {
              movieId: id,
              quantity: isPresent
                ? updatedCart.find((movies) => movies.id === id).count
                : 1,
            };

            if (cartUser !== null && !isPresent) {
              console.log("incrementCartItem");
              console.log(cartUser);
              console.log(cartData);
              axios
                .post("http://localhost:8080/cart/add/" + cartUser, cartData)
                .catch((error) => {
                  console.error("Error updating cart (inc POST req):", error);
                });
            } else if (cartUser !== null && isPresent) {
              console.log("incrementCartItem");
              console.log("user: " + cartUser);
              console.log(cartData);
              axios
                .put("http://localhost:8080/cart/edit/" + cartUser, cartData)
                .catch((error) => {
                  console.error("Error updating cart (inc PUT req):", error);
                });
            }
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

      decrementCartItem: async (id) => {
        set((state) => {
          const isPresent = state.cart.find((movies) => movies.id === id);
          const updatedCart = isPresent
            ? state.cart.map((movies) =>
                movies.id === id
                  ? { ...movies, count: movies.count - 1 }
                  : movies
              )
            : [...state.cart, { id, count: 0 }];

          const cartUser = state.cartUser;

          try {
            const cartData = {
              movieId: id,
              quantity: isPresent
                ? updatedCart.find((movies) => movies.id === id).count
                : 0, // Since it's a decrement operation, set count to 0 if not present
            };

            if (cartUser !== null && isPresent) {
              console.log("decrementCartItem");
              console.log(cartUser);
              console.log(cartData);
              axios
                .put("http://localhost:8080/cart/edit/" + cartUser, cartData)
                .catch((error) => {
                  console.error("Error updating cart (dec PUT req):", error);
                });
            }

            // Return updated state
            return {
              ...state,
              cart: updatedCart,
              cartUser: cartUser,
            };
          } catch (error) {
            console.error("Error updating cart state (incItem):", error);
            return state;
          }
        });
      },

      removeAllThisItem: async (id) => {
        set((state) => {
          const updatedCart = state.cart.filter((movies) => movies.id !== id);
          const cartUser = state.cartUser;

          try {
            const cartData = {
              movieId: id,
              quantity: 0,
            };

            if (cartUser !== null) {
              console.log("removeAllThisItem");
              console.log(cartUser);
              console.log(cartData);
              axios
                .delete("http://localhost:8080/cart/delete/" + cartUser, {
                  data: cartData, // Use 'data' property to send data in the request body
                })
                .catch((error) => {
                  console.error(
                    "Error updating cart (removeAllThisItem DEL req):",
                    error
                  );
                });
            }

            // Return updated state
            return {
              ...state,
              cart: updatedCart,
              cartUser: cartUser,
            };
          } catch (error) {
            console.error("Error updating cart state (decItem):", error);
            return state;
          }
        });
      },

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

      emptyCart: async () => {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = jwtDecode(token);
          set({ cartUser: userData.username });

          try {
            await axios.delete(
              "http://localhost:8080/cart/deleteAll/" + userData.username
            );
            set({ cart: [] });
          } catch (error) {
            console.error("Error emptying cart:", error);
          }
          console.log("emptyCart");
          console.log(userData.username);
        }
      },

      /*       fetchMovies: async () => {
        await fetch("http://localhost:8080/")
          .then((response) => response.json())
          .then((data) => set({ movies: data.results }));
      }, */
    }),
    {
      name: "cart-storage", // unique name
      getStorage: () => localStorage,
    } // (optional) by default, 'localStorage' is used
  )
);
