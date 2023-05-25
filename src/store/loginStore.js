import { create } from 'zustand'

export const useLoginStore = create((set) => ({
    loggedIn: false,
    setLoggedIn: (bool) => set({loggedIn: bool}),
}));