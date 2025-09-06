import { Flex, styled } from "styled-system/jsx";
import { Spacing, Text } from "@/ui-lib";
import { recentProductsQueryOptions } from "@/queries/product";
import { useSuspenseQuery } from "@tanstack/react-query";
import { exchangeRateQueryOptions } from "@/queries/exchangeRate";
import { useCurrencyStore } from "@/stores/currency";
import { formatPrice } from "@/utils/price";



function RecentPurchaseSection() {
  const { currency } = useCurrencyStore();
  const { data: exchangeRateMap } = useSuspenseQuery(exchangeRateQueryOptions());
  const { data: recentProducts } = useSuspenseQuery(recentProductsQueryOptions());

  const exchangeRate = exchangeRateMap[currency];

  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />

      <Flex
        css={{
          bg: "background.01_white",
          px: 5,
          py: 4,
          gap: 4,
          rounded: "2xl",
        }}
        direction={"column"}
      >
        {recentProducts?.map((product) => (
          <Flex
            key={product.id}
            css={{
              gap: 4,
            }}
          >
            <styled.img
              src={product.thumbnail}
              alt="item"
              css={{
                w: "60px",
                h: "60px",
                objectFit: "cover",
                rounded: "xl",
              }}
            />
            <Flex flexDir="column" gap={1}>
              <Text variant="B2_Medium">{product.name}</Text>
              <Text variant="H1_Bold">{formatPrice(product.price * exchangeRate, currency)}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </styled.section>
  );
}

export default RecentPurchaseSection;
