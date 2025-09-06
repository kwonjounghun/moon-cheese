import { Button, Counter, Spacing, Text } from "@/ui-lib";
import { Divider, Flex, Stack, styled } from "styled-system/jsx";
import ShoppingCartItem from "./ShoppingCartItem";
import useShoppingCartStore from "@/stores/shoppingCart";
import { productListQueryOptions } from "@/queries/product";
import { useCurrencyStore } from "@/stores/currency";
import { useSuspenseQuery } from "@tanstack/react-query";
import { exchangeRateQueryOptions } from "@/queries/exchangeRate";
import { formatPrice } from "@/utils/price";
import { type TagType } from "@/ui-lib/components/tag";

function ShoppingCartSection() {
  const {
    shoppingCart,
    removeProduct,
    addCountByProductId,
    minusCountByProductId,
    getCountByProductId,
    clearShoppingCart
  } = useShoppingCartStore();

  const { currency } = useCurrencyStore();
  const { data: exchangeRateMap } = useSuspenseQuery(exchangeRateQueryOptions());
  const exchangeRate = exchangeRateMap[currency];

  const { data: productList } = useSuspenseQuery(productListQueryOptions());

  const filteredProductList = productList.filter((product) => shoppingCart[product.id]);

  return (
    <styled.section css={{ p: 5, bgColor: "background.01_white" }}>
      <Flex justify="space-between">
        <Text variant="H2_Bold">장바구니</Text>
        <Button color={"neutral"} size="sm" onClick={clearShoppingCart}>
          전체삭제
        </Button>
      </Flex>
      <Spacing size={4} />
      <Stack
        gap={5}
        css={{
          p: 5,
          border: "1px solid",
          borderColor: "border.01_gray",
          rounded: "2xl",
        }}
      >
        {filteredProductList.map((product, index) => {
          const count = getCountByProductId(product.id);

          return (
            <>
              {index !== 0 && <Divider color="border.01_gray" />}
              <ShoppingCartItem.Root>
                <ShoppingCartItem.Image
                  src={product.images[0]}
                  alt={product.name}
                />
                <ShoppingCartItem.Content>
                  <ShoppingCartItem.Info
                    type={product.category.toLowerCase() as TagType}
                    title={product.name}
                    description={product.description}
                    onDelete={() => { removeProduct(product.id) }}
                  />
                  <ShoppingCartItem.Footer>
                    <ShoppingCartItem.Price>{formatPrice(product.price * exchangeRate, currency)}</ShoppingCartItem.Price>
                    <Counter.Root>
                      <Counter.Minus onClick={() => { minusCountByProductId(product.id) }} disabled={count === 0} />
                      <Counter.Display value={count} />
                      <Counter.Plus onClick={() => { addCountByProductId(product.id) }} disabled={count === product.stock} />
                    </Counter.Root>
                  </ShoppingCartItem.Footer>
                </ShoppingCartItem.Content>
              </ShoppingCartItem.Root>
            </>
          )
        })}

      </Stack>
    </styled.section >
  );
}

export default ShoppingCartSection;
