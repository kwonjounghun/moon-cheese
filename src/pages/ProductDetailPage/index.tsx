import { Spacing } from "@/ui-lib";
import ProductDetailSection from "./components/ProductDetailSection";
import ProductInfoSection from "./components/ProductInfoSection";
import RecommendationSection from "./components/RecommendationSection";
import ThumbnailSection from "./components/ThumbnailSection";
import { useCurrencyStore } from "@/stores/currency";
import { exchangeRateQueryOptions } from "@/queries/exchangeRate";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productDetailQueryOptions } from "@/queries/product";
import { useParams } from "react-router";
import { capitalize } from 'es-toolkit'
import { type TagType } from "@/ui-lib/components/tag";

function ProductDetailPage() {
  const { id } = useParams();
  const { currency } = useCurrencyStore();
  const { data: exchangeRateMap } = useSuspenseQuery(exchangeRateQueryOptions());
  const exchangeRate = exchangeRateMap[currency];
  const { data: product } = useSuspenseQuery(productDetailQueryOptions(Number(id)));

  return (
    <>
      <ThumbnailSection
        images={product.images}
      />
      <ProductInfoSection
        name={product.name}
        category={capitalize(product.category) as TagType}
        rating={product.rating}
        price={product.price * exchangeRate}
        quantity={product.stock}
        currency={currency}
        id={product.id}
        stock={product.stock}
      />

      <Spacing size={2.5} />

      <ProductDetailSection
        description={
          product.detailDescription
        }
      />

      <Spacing size={2.5} />

      <RecommendationSection />
    </>
  );
}

export default ProductDetailPage;
