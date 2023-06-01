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

          console.log("getCart");
          console.log(userData.username);

          const feCart = [];

          console.log("feCart");
          console.log(feCart);

          try {
            const response = await axios.get(
              "http://localhost:8080/cart/returnAll/" + userData.username
            );
            cartData = response.data;

            const dbCart = cartData.map(({ movieId, quantity }) => ({
              id: movieId,
              count: quantity,
            }));

            console.log("dbCart");
            console.log(dbCart);

            const combinedCart = [];

            for (let i = 0; i < dbCart.length; i++) {
              for (let j = 0; j < feCart.length; j++) {
                // find and push shared ids and summed counts to new Array
                if (feCart[j].id === dbCart[i].id) {
                  let summedCount = 0;
                  summedCount = dbCart[i].count + feCart[j].count;
                  combinedCart.push({ id: dbCart[i].id, count: summedCount });
                }
              }
            }
            // if other objects in feCart do not match existing IDs in combinedCart, push those objects to combinedCart
            for (let k = 0; k < feCart.length; k++) {
              if (!combinedCart.some((obj) => obj.id === feCart[k].id)) {
                combinedCart.push(feCart[k]);
              }
            }
            // if other objects in dbCart do not match existing IDs in combinedCart, push those objects to combinedCart
            for (let l = 0; l < dbCart.length; l++) {
              if (!combinedCart.some((obj) => obj.id === dbCart[l].id)) {
                combinedCart.push(dbCart[l]);
              }
            }

            console.log("Combined Cart");
            console.log(combinedCart);

            set((state) => ({
              cart: combinedCart,
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
