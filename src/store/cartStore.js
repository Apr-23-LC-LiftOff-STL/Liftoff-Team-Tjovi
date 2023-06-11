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

      logoutCart: async () => {
        set({ cart: [], cartUser: null });
        // add a final save of cart to DB?
      },

      emptyCartStateOnly: async () => {
        set({ cart: [] });
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
            try {
              axios.post();
            } catch (error) {
              console.error("Error merging cart in DB:", error);
            }
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
          const cartUser = userData.username;

          try {
            await axios.delete(
              "http://localhost:8080/cart/deleteAll/" + cartUser
            );
            console.log("emptyCart");
            console.log(userData.username);

          } catch (error) {
            console.error("Error emptying cart:", error);
            throw error;
          }
        }
        set({ cart: [] });
      },

      getAndMergeCart: async () => {
        const { cart } = useCartStore.getState();
        const feCart = [...cart];

        const token = localStorage.getItem("token");
        const userData = token ? jwtDecode(token) : null;
        const cartUser = userData?.username || useCartStore.getState().cartUser;

        let combinedCart = [];

        if (feCart.length > 0) {
          combinedCart = feCart;

          try {
            // Repopulate the cart in the database
            await useCartStore.getState().emptyCart(); // Call emptyCart and wait for it to finish
            await Promise.all(
              combinedCart.map(async (cartItem) => {
                try {
                  await axios.post(
                    "http://localhost:8080/cart/add/" + cartUser,
                    { movieId: cartItem.id, quantity: cartItem.count }
                  );
                  console.log(cartItem.id);
                  console.log(cartItem.count);
                } catch (error) {
                  console.error("Error posting cart item:", error);
                }
              })
            );
          } catch (error) {
            console.error("Error getting cart:", error);
          }
        }

        // Get the updated cart from the database
        try {
          const response = await axios.get(
            "http://localhost:8080/cart/returnAll/" + cartUser
          );
          const cartData = response.data;

          const updatedCart = cartData.map(({ movieId, quantity }) => ({
            id: movieId,
            count: quantity,
          }));

          console.log(JSON.stringify(updatedCart));

          // Update the state immediately
          set({
            cart: updatedCart,
            cartUser: useCartStore.getState().cartUser,
          });
        } catch (error) {
          console.error("Error setting cart state:", error);
        }
      },
    }),

    /*       fetchMovies: async () => {
        await fetch("http://localhost:8080/")
          .then((response) => response.json())
          .then((data) => set({ movies: data.results }));
      }, */
    {
      name: "cart-storage", // unique name
      getStorage: () => localStorage,
    } // (optional) by default, 'localStorage' is used
  )
);
