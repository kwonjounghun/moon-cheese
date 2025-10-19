import { productListQueryOptions } from '@/queries/product';
import { useCurrencyStore } from '@/stores/currency';
import useShoppingCartStore from '@/stores/shoppingCart';
import { Button, Counter, Spacing, Text } from '@/ui-lib';
import { type TagType } from '@/ui-lib/components/tag';
import { formatPrice } from '@/utils/price';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Divider, Flex, Stack, styled } from 'styled-system/jsx';
import ShoppingCartItem from './ShoppingCartItem';

function ShoppingCartSection() {
  const shoppingCart = useShoppingCartStore(state => state.shoppingCart);
  const removeProduct = useShoppingCartStore(state => state.removeProduct);
  const incrementProduct = useShoppingCartStore(state => state.incrementProduct);
  const decrementProduct = useShoppingCartStore(state => state.decrementProduct);
  const clearShoppingCart = useShoppingCartStore(state => state.clearShoppingCart);

  const { currency } = useCurrencyStore();
  const exchangeRate = useCurrencyStore(state => state.exchangeRate[currency]);

  const { data: productList } = useSuspenseQuery(productListQueryOptions());

  const filteredProductList = productList.filter(product => shoppingCart[product.id]);

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Flex justify="space-between">
        <Text variant="H2_Bold">장바구니</Text>
        <Button color={'neutral'} size="sm" onClick={clearShoppingCart}>
          전체삭제
        </Button>
      </Flex>
      <Spacing size={4} />
      <Stack
        gap={5}
        css={{
          p: 5,
          border: '1px solid',
          borderColor: 'border.01_gray',
          rounded: '2xl',
        }}
      >
        {filteredProductList.map((product, index) => {
          const quantity = shoppingCart[product.id];

          return (
            <>
              {index !== 0 && <Divider color="border.01_gray" />}
              <ShoppingCartItem.Root>
                <ShoppingCartItem.Image src={product.images[0]} alt={product.name} />
                <ShoppingCartItem.Content>
                  <ShoppingCartItem.Info
                    type={product.category.toLowerCase() as TagType}
                    title={product.name}
                    description={product.description}
                    onDelete={() => {
                      removeProduct({ productId: product.id });
                    }}
                  />
                  <ShoppingCartItem.Footer>
                    <ShoppingCartItem.Price>
                      {formatPrice(product.price * exchangeRate, { currency })}
                    </ShoppingCartItem.Price>
                    <Counter.Root>
                      <Counter.Minus
                        onClick={() => {
                          decrementProduct({ productId: product.id });
                        }}
                        disabled={quantity === 0}
                      />
                      <Counter.Display value={quantity} />
                      <Counter.Plus
                        onClick={() => {
                          incrementProduct({ productId: product.id });
                        }}
                        disabled={quantity === product.stock}
                      />
                    </Counter.Root>
                  </ShoppingCartItem.Footer>
                </ShoppingCartItem.Content>
              </ShoppingCartItem.Root>
            </>
          );
        })}
      </Stack>
    </styled.section>
  );
}

export default ShoppingCartSection;
