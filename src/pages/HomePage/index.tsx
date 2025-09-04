import { exchangeRateQueryOptions } from "@/queries/exchangeRate";
import BannerSection from "./components/BannerSection";
import CurrentLevelSection from "./components/CurrentLevelSection";
import ProductListSection from "./components/ProductListSection";
import RecentPurchaseSection from "./components/RecentPurchaseSection";
import { useCurrencyStore } from "@/stores/currency";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const { currency } = useCurrencyStore();
  const { data: exchangeRate } = useQuery(exchangeRateQueryOptions());

  console.log(exchangeRate);
  return (
    <>
      <BannerSection />
      <CurrentLevelSection />
      <RecentPurchaseSection />
      <ProductListSection />
    </>
  );
}

export default HomePage;
