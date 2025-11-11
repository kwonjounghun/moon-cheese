import ErrorSection from '@/components/ErrorSection';
import { Spacing } from '@/ui-lib';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { AsyncBoundary } from '@toss/async-boundary';
import ProductDetailSection from './components/ProductDetailSection';
import ProductInfoSection from './components/ProductInfoSection';
import RecommendationSection from './components/RecommendationSection';
import ThumbnailSection from './components/ThumbnailSection';

function ProductDetailPage() {
  const { reset: resetQuery } = useQueryErrorResetBoundary();
  const handleRetry = (reset: () => void) => {
    resetQuery();
    reset();
  };

  return (
    <>
      <ThumbnailSection />
      <ProductInfoSection />

      <Spacing size={2.5} />

      <ProductDetailSection />

      <Spacing size={2.5} />

      <AsyncBoundary
        pendingFallback={<div>Loading...</div>}
        rejectedFallback={({ reset }) => (
          <ErrorSection
            onRetry={() => {
              handleRetry(reset);
            }}
          />
        )}
      >
        <RecommendationSection />
      </AsyncBoundary>
    </>
  );
}

export default ProductDetailPage;
