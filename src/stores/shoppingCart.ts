import { create } from "zustand";

interface ShoppingCartStore {
  shoppingCart: { [productId: number]: number };
  addToShoppingCart: (productId: number) => void;
  removeFromShoppingCart: (productId: number) => void;
}

const useShoppingCartStore = create<ShoppingCartStore>((set) => ({
  shoppingCart: [],
  addToShoppingCart: (productId) => set((state) => ({ shoppingCart: { ...state.shoppingCart, [productId]: (state.shoppingCart[productId] || 0) + 1 } })),
  removeFromShoppingCart: (productId) => set((state) => ({ shoppingCart: { ...state.shoppingCart, [productId]: (state.shoppingCart[productId] || 0) - 1 } })),
}));

export default useShoppingCartStore;