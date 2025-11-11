import { productDetailQueryOptions } from '@/queries/product';
import { Spacing, Text } from '@/ui-lib';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { styled } from 'styled-system/jsx';

function ProductDetailSection() {
  const { id } = useParams();
  const productId = Number(id);
  const { data: product } = useSuspenseQuery(productDetailQueryOptions(productId));
  return (
    <styled.section css={{ bg: 'background.01_white', px: 5, pt: 5, pb: 6 }}>
      <Text variant="H2_Bold">상세 정보</Text>

      <Spacing size={4} />

      <Text variant="B2_Regular" color="neutral.02_gray">
        {product.detailDescription}
      </Text>
    </styled.section>
  );
}

export default ProductDetailSection;
