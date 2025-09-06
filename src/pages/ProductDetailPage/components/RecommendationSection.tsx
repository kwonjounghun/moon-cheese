import { Spacing, Text } from "@/ui-lib";
import { useNavigate, useParams } from "react-router";
import { HStack, styled } from "styled-system/jsx";
import RecommendationProductItem from "./RecommendationProductItem";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productListQueryOptions, recommendProductListQueryOptions } from "@/queries/product";
import { formatPrice } from "@/utils/price";
import { useCurrencyStore } from "@/stores/currency";
import { exchangeRateQueryOptions } from "@/queries/exchangeRate";

function RecommendationSection() {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);

  const { currency } = useCurrencyStore();
  const { data: exchangeRateMap } = useSuspenseQuery(exchangeRateQueryOptions());
  const exchangeRate = exchangeRateMap[currency];

  const { data: productList } = useSuspenseQuery(productListQueryOptions());
  const { data: recommendProductList } = useSuspenseQuery(recommendProductListQueryOptions(productId));

  const recommendProducts = productList.filter((product) => recommendProductList.includes(product.id));

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <styled.section css={{ bg: "background.01_white", px: 5, pt: 5, pb: 6 }}>
      <Text variant="H2_Bold">추천 제품</Text>

      <Spacing size={4} />

      <HStack gap={1.5} overflowX="auto">
        {recommendProducts.map((product) => (
          <RecommendationProductItem.Root key={product.id} onClick={() => handleClickProduct(product.id)}>
            <RecommendationProductItem.Image
              src={product.images[0]}
              alt={product.name}
            />
            <RecommendationProductItem.Info name={product.name} rating={product.rating} />
            <RecommendationProductItem.Price>{formatPrice(product.price * exchangeRate, currency)}</RecommendationProductItem.Price>
          </RecommendationProductItem.Root>
        ))}
      </HStack>
    </styled.section>
  );
}

export default RecommendationSection;
