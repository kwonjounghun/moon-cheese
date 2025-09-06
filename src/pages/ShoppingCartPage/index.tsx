import useShoppingCartStore from "@/stores/shoppingCart";
import CheckoutSection from "./components/CheckoutSection";
import DeliveryMethodSection from "./components/DeliveryMethodSection";
import ShoppingCartSection from "./components/ShoppingCartSection";
import EmptyCartSection from "./components/EmptyCartSection";
import { useNavigate } from "react-router";

function ShoppingCartPage() {
  const navigate = useNavigate();
  const { shoppingCart } = useShoppingCartStore();

  const hasProductsInShoppingCart = Object.keys(shoppingCart).length > 0;

  const handleClickShopping = () => {
    navigate("/");
  };

  if (!hasProductsInShoppingCart) {
    return <EmptyCartSection onClick={handleClickShopping} />;
  }

  return (
    <>
      <ShoppingCartSection />
      <DeliveryMethodSection />
      <CheckoutSection />
    </>
  );
}

export default ShoppingCartPage;
