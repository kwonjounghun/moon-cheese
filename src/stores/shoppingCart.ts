import { create } from "zustand";

interface ShoppingCartStore {
  shoppingCart: { [productId: number]: number };
  addCountByProductId: (productId: number) => void;
  minusCountByProductId: (productId: number) => void;
  getCountByProductId: (productId: number) => number;
  removeProduct: (productId: number) => void;
  addProduct: (productId: number, count: number) => void;
}

const useShoppingCartStore = create<ShoppingCartStore>((set, get) => ({
  shoppingCart: {},
  getCountByProductId: (productId) => get().shoppingCart[productId] || 0,
  addCountByProductId: (productId) => set((state) => ({ shoppingCart: { ...state.shoppingCart, [productId]: (state.shoppingCart[productId] || 0) + 1 } })),
  minusCountByProductId: (productId) => set((state) => ({ shoppingCart: { ...state.shoppingCart, [productId]: (state.shoppingCart[productId] || 0) - 1 } })),
  removeProduct: (productId) => set((state) => {
    const newShoppingCart = { ...state.shoppingCart };
    delete newShoppingCart[productId];
    return { shoppingCart: newShoppingCart };
  }),
  addProduct: (productId, count) => set((state) => ({ shoppingCart: { ...state.shoppingCart, [productId]: (state.shoppingCart[productId] || 0) + count } })),
}));

export default useShoppingCartStore;