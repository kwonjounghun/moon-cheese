import useShoppingCartStore from "@/stores/shoppingCart";
import CheckoutSection from "./components/CheckoutSection";
import DeliveryMethodSection from "./components/DeliveryMethodSection";
import ShoppingCartSection from "./components/ShoppingCartSection";
import EmptyCartSection from "./components/EmptyCartSection";
import { useNavigate } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { productListQueryOptions } from "@/queries/product";
import { type DeliveryType } from "@/types/types";

function ShoppingCartPage() {
  const navigate = useNavigate();
  const [shippingFee, setShippingFee] = useState(0);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("EXPRESS");

  const { shoppingCart } = useShoppingCartStore();
  const { data: productList } = useSuspenseQuery(productListQueryOptions());

  const hasProductsInShoppingCart = Object.keys(shoppingCart).length > 0;

  const totalPrice = useMemo(() => {
    return Number(productList.reduce((acc, product) => {
      if (shoppingCart[product.id]) {
        return acc + Number((product.price * shoppingCart[product.id]));
      }
      return acc;
    }, 0).toFixed(2));
  }, [shoppingCart, productList]);

  const handleClickShopping = () => {
    navigate("/");
  };

  if (!hasProductsInShoppingCart) {
    return <EmptyCartSection onClick={handleClickShopping} />;
  }

  return (
    <>
      <ShoppingCartSection />
      <DeliveryMethodSection totalPrice={totalPrice} onChangeShippingFee={setShippingFee} onChangeDeliveryType={setDeliveryType} />
      <CheckoutSection totalPrice={totalPrice} shippingFee={shippingFee} deliveryType={deliveryType} />
    </>
  );
}

export default ShoppingCartPage;
