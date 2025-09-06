import { Button, Counter, RatingGroup, Spacing, Text, type CurrencyType } from "@/ui-lib";
import Tag, { type TagType } from "@/ui-lib/components/tag";
import { Box, Divider, Flex, Stack, styled } from "styled-system/jsx";
import { formatPrice } from "@/utils/price";
import { useState } from "react";
import useShoppingCartStore from "@/stores/shoppingCart";

type ProductInfoSectionProps = {
  name: string;
  category: TagType;
  rating: number;
  price: number;
  quantity: number;
  currency: CurrencyType;
  stock: number;
  id: number;
};

function ProductInfoSection({ id, name, category, rating, price, quantity, currency, stock }: ProductInfoSectionProps) {
  const { getCountByProductId, removeProduct, addProduct } = useShoppingCartStore();
  const [count, setCount] = useState(getCountByProductId(id));

  const hasProductInShoppingCart = getCountByProductId(id) > 0;

  const handleAddCount = () => {
    setCount(count + 1);
  }
  const handleRemoveCount = () => {
    setCount(count - 1);
  }

  const handleShoppingCart = () => {
    if (hasProductInShoppingCart) {
      removeProduct(id);
    } else {
      addProduct(id, count);
    }
  }


  return (
    <styled.section css={{ bg: "background.01_white", p: 5 }}>
      {/* 상품 정보 */}
      <Box>
        <Stack gap={2}>
          <Tag type={category} />
          <Text variant="B1_Bold">{name}</Text>
          <RatingGroup value={rating} readOnly label={`${rating.toFixed(1)}`} />
        </Stack>
        <Spacing size={4} />
        <Text variant="H1_Bold">{formatPrice(price, currency)}</Text>
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
          <Counter.Minus onClick={() => { handleRemoveCount() }} disabled={count === 0} />
          <Counter.Display value={count} />
          <Counter.Plus onClick={() => { handleAddCount() }} disabled={count === stock} />
        </Counter.Root>
      </Flex>

      <Spacing size={5} />

      {/* 장바구니 버튼 */}
      <Button fullWidth color="primary" size="lg" onClick={handleShoppingCart}>
        {hasProductInShoppingCart ? '장바구니에서 제거' : '장바구니 담기'}
      </Button>
    </styled.section>
  );
}

export default ProductInfoSection;
