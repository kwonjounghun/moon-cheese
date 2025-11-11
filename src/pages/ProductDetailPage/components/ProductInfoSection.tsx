import { productDetailQueryOptions } from '@/queries/product';
import { useCurrencyStore } from '@/stores/currency';
import useShoppingCartStore from '@/stores/shoppingCart';
import { Button, Counter, RatingGroup, Spacing, Text } from '@/ui-lib';
import Tag, { type TagType } from '@/ui-lib/components/tag';
import { formatPrice } from '@/utils/price';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Box, Divider, Flex, Stack, styled } from 'styled-system/jsx';

function ProductInfoSection() {
  const { id } = useParams();
  const productId = Number(id);

  const shoppingCart = useShoppingCartStore(state => state.shoppingCart);
  const removeProduct = useShoppingCartStore(state => state.removeProduct);
  const addProduct = useShoppingCartStore(state => state.addProduct);

  const currency = useCurrencyStore(state => state.currency);
  const exchangeRate = useCurrencyStore(state => state.exchangeRate[currency]);

  const { data: product } = useSuspenseQuery(productDetailQueryOptions(productId));

  const hasProductInShoppingCart = shoppingCart[productId] !== undefined;

  const [quantity, setQuantity] = useState(shoppingCart[productId] || 0);

  return (
    <styled.section css={{ bg: 'background.01_white', p: 5 }}>
      {/* 상품 정보 */}
      <Box>
        <Stack gap={2}>
          <Tag type={product.category.toLowerCase() as TagType} />
          <Text variant="B1_Bold">{product.name}</Text>
          <RatingGroup value={product.rating} readOnly label={`${product.rating.toFixed(1)}`} />
        </Stack>
        <Spacing size={4} />
        <Text variant="H1_Bold">{formatPrice(product.price * exchangeRate, { currency })}</Text>
      </Box>

      <Spacing size={5} />

      {/* 재고 및 수량 조절 */}
      <Flex justify="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <Text variant="C1_Medium">재고</Text>
          <Divider orientation="vertical" color="border.01_gray" h={4} />
          <Text variant="C1_Medium" color="secondary.02_orange">
            {quantity}EA
          </Text>
        </Flex>
        <Counter.Root>
          <Counter.Minus
            onClick={() => {
              setQuantity(quantity - 1);
            }}
            disabled={quantity === 0}
          />
          <Counter.Display value={quantity} />
          <Counter.Plus
            onClick={() => {
              setQuantity(quantity + 1);
            }}
            disabled={quantity === product.stock}
          />
        </Counter.Root>
      </Flex>

      <Spacing size={5} />

      {/* 장바구니 버튼 */}
      <Button
        fullWidth
        color="primary"
        size="lg"
        onClick={() => {
          if (hasProductInShoppingCart) {
            removeProduct({ productId });
          } else {
            addProduct({ productId, quantity });
          }
        }}
      >
        {hasProductInShoppingCart ? '장바구니에서 제거' : '장바구니 담기'}
      </Button>
    </styled.section>
  );
}

export default ProductInfoSection;
