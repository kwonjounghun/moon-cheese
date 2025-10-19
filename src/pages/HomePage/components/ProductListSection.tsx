import { exchangeRateQueryOptions } from '@/queries/exchangeRate';
import { isProductCheese, isProductCracker, isProductTea, productListQueryOptions } from '@/queries/product';
import { useCurrencyStore } from '@/stores/currency';
import useShoppingCartStore from '@/stores/shoppingCart';
import { SubGNB, Text } from '@/ui-lib';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Box, Grid, styled } from 'styled-system/jsx';
import ProductCheeseItem from './ProductCheeseItem';
import ProductCrackerItem from './ProductCrackerItem';
import ProductTeaItem from './ProductTeaItem';

function ProductListSection() {
  const { shoppingCart } = useShoppingCartStore();
  const { currency } = useCurrencyStore();
  const { data: exchangeRateMap } = useSuspenseQuery(exchangeRateQueryOptions());
  const { data: productList } = useSuspenseQuery(productListQueryOptions());
  const [currentTab, setCurrentTab] = useState('all');

  const filteredProductList = useMemo(() => {
    return productList.filter(product => {
      if (currentTab === 'all') return true;
      if (currentTab === 'cheese') return isProductCheese(product);
      if (currentTab === 'cracker') return isProductCracker(product);
      if (currentTab === 'tea') return isProductTea(product);
    });
  }, [productList, currentTab]);

  const exchangeRate = exchangeRateMap[currency];

  return (
    <styled.section bg="background.01_white">
      <Box css={{ px: 5, pt: 5, pb: 4 }}>
        <Text variant="H1_Bold">판매중인 상품</Text>
      </Box>
      <SubGNB.Root value={currentTab} onValueChange={details => setCurrentTab(details.value)}>
        <SubGNB.List>
          <SubGNB.Trigger value="all">전체</SubGNB.Trigger>
          <SubGNB.Trigger value="cheese">치즈</SubGNB.Trigger>
          <SubGNB.Trigger value="cracker">크래커</SubGNB.Trigger>
          <SubGNB.Trigger value="tea">티</SubGNB.Trigger>
        </SubGNB.List>
      </SubGNB.Root>
      <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
        {filteredProductList.map(product => {
          if (isProductCheese(product)) {
            return <ProductCheeseItem product={product} />;
          }
          if (isProductCracker(product)) {
            return <ProductCrackerItem product={product} />;
          }
          if (isProductTea(product)) {
            return <ProductTeaItem product={product} />;
          }
          return null;
        })}
      </Grid>
    </styled.section>
  );
}

export default ProductListSection;
