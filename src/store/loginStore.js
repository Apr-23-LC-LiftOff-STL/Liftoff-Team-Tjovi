import { create } from 'zustand';

export const useLoginStore = create((set) => {
  const token = localStorage.getItem("token");
  const initialState = {
    isLoggedIn: !!token,
    setIsLoggedIn: (bool) => set({ isLoggedIn: bool }),
  };

  return initialState;
});