import { create } from "zustand";
import { persist } from "zustand/middleware";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      cartUser: null,

      setCartUser: (user) => {
        set({ cartUser: user });
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
              cart: updatedCart,
              cartUser: cartUser,
            };

            if (cartUser !== null)
            { 
              axios
              .post("your-api-post-endpoint", cartData)
              .then(() => {
                // TODO:  need POST endpoint for CART table
                axios
                  .get("your-api-get-endpoint")
                  .then((response) => {
                    // TODO:  need GET endpoint for CART table
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
            }
            // Return updated state
            console.log(cartUser);
            updatedCart.map((obj, i) => {
              console.log(obj)
            })
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
                movies.id === id ? { ...movies, count: movies.count - 1 } : movies
              )
            : [...state.cart, { id, count: 0 }];
      
          const cartUser = state.cartUser;
      
          try {
            const cartData = {
              cart: updatedCart,
              cartUser: cartUser,
            };
      
            if (cartUser !== null) {
              // TODO: need POST endpoint for CART table
              axios
                .post("your-api-post-endpoint", cartData)
                .then(() => {
                  // TODO: need GET endpoint for CART table
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
            }
      
            // Return updated state
            console.log(cartUser);
            updatedCart.map((obj, i) => {
              console.log(obj)
            })
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

      removeAllThisItem: async (id) => {
        set((state) => {
          const isPresent = state.cart.find((movies) => movies.id === id);
          const updatedCart = isPresent
            ? state.cart
                .map((movies) =>
                  movies.id === id
                    ? { ...movies, count: Math.max(movies.count - movies.count, 0) }
                    : movies
                )
                .filter((movies) => movies.count)
            : state.cart;
      
          const cartUser = state.cartUser;
      
          try {
            const cartData = {
              cart: updatedCart,
              cartUser: cartUser,
            };
      
            if (cartUser !== null) {
              // TODO: need POST endpoint for CART table
              axios
                .post("your-api-post-endpoint", cartData)
                .then(() => {
                  // TODO: need GET endpoint for CART table
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
            }
      
            // Return updated state
            console.log(cartUser);
            updatedCart.map((obj, i) => {
              console.log(obj)
            })
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
          set((state) => {
            const updatedCart = [];
            const cartUser = null;
        
            try {
              const cartData = {
                cart: updatedCart,
                cartUser: cartUser,
              };
        
              if (cartUser !== null) {
                // TODO: need POST endpoint for CART table
                axios
                  .post("your-api-post-endpoint", cartData)
                  .then(() => {
                    // TODO: need GET endpoint from CART table
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
              }
        
              // Return updated state
              console.log(cartUser);
              console.log(updatedCart);
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

      initialize: () => {
        const token = localStorage.getItem("token");
        if (token) {
          const userData = jwtDecode(token);
          set({ cartUser: userData.username });
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