import { create } from 'zustand';

interface ShoppingCartStore {
  shoppingCart: { [productId: number]: number };
  removeProduct: ({ productId }: { productId: number }) => void;
  addProduct: ({ productId, quantity }: { productId: number; quantity: number }) => void;
  incrementProduct: ({ productId }: { productId: number }) => void;
  decrementProduct: ({ productId }: { productId: number }) => void;
  clearShoppingCart: () => void;
}

const useShoppingCartStore = create<ShoppingCartStore>((set, get) => ({
  shoppingCart: {},
  incrementProduct: ({ productId }: { productId: number }) =>
    set(state => {
      const newShoppingCart = { ...state.shoppingCart };
      newShoppingCart[productId] = (newShoppingCart[productId] || 0) + 1;

      return { shoppingCart: newShoppingCart };
    }),
  decrementProduct: ({ productId }: { productId: number }) =>
    set(state => {
      const newShoppingCart = { ...state.shoppingCart };

      if (newShoppingCart[productId] && newShoppingCart[productId] === 1) {
        delete newShoppingCart[productId];

        return { shoppingCart: newShoppingCart };
      }

      newShoppingCart[productId] = (newShoppingCart[productId] || 0) - 1;

      return { shoppingCart: newShoppingCart };
    }),
  addProduct: ({ productId, quantity }: { productId: number; quantity: number }) =>
    set(state => {
      const newShoppingCart = { ...state.shoppingCart };
      newShoppingCart[productId] = (newShoppingCart[productId] || 0) + quantity || 0;

      return { shoppingCart: newShoppingCart };
    }),
  removeProduct: ({ productId }: { productId: number }) =>
    set(state => {
      const newShoppingCart = { ...state.shoppingCart };
      delete newShoppingCart[productId];

      return { shoppingCart: newShoppingCart };
    }),
  clearShoppingCart: () => set({ shoppingCart: {} }),
}));

export default useShoppingCartStore;
