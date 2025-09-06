import { create } from "zustand";

interface ShoppingCartStore {
  shoppingCart: { [productId: number]: number };
  addCountByProductId: (productId: number) => void;
  minusCountByProductId: (productId: number) => void;
  getCountByProductId: (productId: number) => number;
  removeProduct: (productId: number) => void;
  addProduct: (productId: number, count: number) => void;
  clearShoppingCart: () => void;
}

const useShoppingCartStore = create<ShoppingCartStore>((set, get) => ({
  shoppingCart: {},
  getCountByProductId: (productId) => get().shoppingCart[productId] || 0,
  addCountByProductId: (productId) => set((state) => {
    const newShoppingCart = { ...state.shoppingCart };
    newShoppingCart[productId] = (newShoppingCart[productId] || 0) + 1;

    return { shoppingCart: newShoppingCart };
  }),
  minusCountByProductId: (productId) => set((state) => {
    const newShoppingCart = { ...state.shoppingCart };
    newShoppingCart[productId] = (newShoppingCart[productId] || 0) - 1;

    if (newShoppingCart[productId] < 1) {
      delete newShoppingCart[productId];
    }

    return { shoppingCart: newShoppingCart };
  }),
  removeProduct: (productId) => set((state) => {
    const newShoppingCart = { ...state.shoppingCart };
    delete newShoppingCart[productId];

    return { shoppingCart: newShoppingCart };
  }),
  addProduct: (productId, count) => set((state) => {
    const newShoppingCart = { ...state.shoppingCart };
    newShoppingCart[productId] = (newShoppingCart[productId] || 0) + count;

    return { shoppingCart: newShoppingCart };
  }),
  clearShoppingCart: () => set({ shoppingCart: {} }),
}));

export default useShoppingCartStore;