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
          set((state) => ({
            cartUser: userData.username,
            cart: [],
          }));

          try {
            await axios.delete(
              "http://localhost:8080/cart/deleteAll/" + userData.username
            );
          } catch (error) {
            console.error("Error emptying cart:", error);
          }
          console.log("emptyCart");
          console.log(userData.username);
        }
      },

      getCart: async () => {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = jwtDecode(token);
          const cartUser = userData.username;

          try {
            const response = await axios.get(
              "http://localhost:8080/cart/returnAll/" + cartUser
            );
            const cartData = response.data;

            const dbCart = cartData.map(({ movieId, quantity }) => ({
              id: movieId,
              count: quantity,
            }));

            let combinedCart = [...dbCart];
            combinedCart.sort((a, b) => a.id - b.id); // Sort combinedCart by id

            const { cart } = useCartStore.getState();
            const feCart = [...cart];
            feCart.sort((a, b) => a.id - b.id); // Sort feCart by id

            if (feCart.length !== 0) {
              if (combinedCart.length !== 0) {
                alert("Your cart from a previous session also held products. Now merging your cart.");
              }

              for (let i = 0; i < combinedCart.length; i++) {
                let found = false; // Flag to check if a match is found

                for (let j = 0; j < feCart.length; j++) {
                  if (combinedCart[i].id === feCart[j].id) {
                    found = true;
                    if (feCart[j.count > combinedCart[i].count]) {
                      // Update quantity in the database if count is different in frontend cart
                      await axios.put(
                        "http://localhost:8080/cart/edit/" + cartUser,
                        {
                          movieId: feCart[j].id,
                          quantity: feCart[j].count,
                        }
                      );
                    }

                    break; // Break the inner loop if a match is found
                  }
                }

                if (!found) {
                  // Add missing items from the frontend cart to the database
                  await axios.post(
                    "http://localhost:8080/cart/add/" + cartUser,
                    {
                      movieId: feCart[i].id,
                      quantity: feCart[i].count,
                    }
                  );
                }
              }
            }
          } catch (error) {
            console.error("Error getting cart:", error);
          }

          try {
            const response = await axios.get(
              "http://localhost:8080/cart/returnAll/" + cartUser
            );
            const cartData = response.data;

            const mergedCart = cartData.map(({ movieId, quantity }) => ({
              id: movieId,
              count: quantity,
            }));

            // Update the state immediately
            set({
              cart: mergedCart,
              cartUser: useCartStore.getState().cartUser,
            });
          } catch (error) {
            console.error("Error getting cart:", error);
          }
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
