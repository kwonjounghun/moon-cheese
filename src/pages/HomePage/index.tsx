import BannerSection from "./components/BannerSection";
import CurrentLevelSection from "./components/CurrentLevelSection";
import ProductListSection from "./components/ProductListSection";
import RecentPurchaseSection from "./components/RecentPurchaseSection";
import { AsyncBoundary } from "@toss/async-boundary";
import ErrorSection from "@/components/ErrorSection";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

function HomePage() {
  const { reset: resetQuery } = useQueryErrorResetBoundary();
  const handleRetry = (reset: () => void) => {
    resetQuery();
    reset();
  }

  return (
    <>
      <BannerSection />
      <AsyncBoundary pendingFallback={<div>Loading...</div>} rejectedFallback={({ reset }) => <ErrorSection onRetry={() => handleRetry(reset)} />}  >
        <CurrentLevelSection />
      </AsyncBoundary>
      <AsyncBoundary pendingFallback={<div>Loading...</div>} rejectedFallback={({ reset }) => <ErrorSection onRetry={() => handleRetry(reset)} />}  >
        <RecentPurchaseSection />
      </AsyncBoundary>
      <AsyncBoundary pendingFallback={<div>Loading...</div>} rejectedFallback={({ reset }) => <ErrorSection onRetry={() => handleRetry(reset)} />}  >
        <ProductListSection />
      </AsyncBoundary >
    </>
  );
}

export default HomePage;
