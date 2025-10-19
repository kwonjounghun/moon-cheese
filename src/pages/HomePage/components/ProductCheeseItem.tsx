import { exchangeRateQueryOptions } from '@/queries/exchangeRate';
import type { ProductCheese } from '@/queries/product';
import { useCurrencyStore } from '@/stores/currency';
import useShoppingCartStore from '@/stores/shoppingCart';
import { Counter } from '@/ui-lib';
import { formatPrice } from '@/utils/price';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import ProductItem from './ProductItem';

interface ProductCheeseItemProps {
  product: ProductCheese;
}

const ProductCheeseItem = ({ product }: ProductCheeseItemProps) => {
  const navigate = useNavigate();

  const shoppingCart = useShoppingCartStore(state => state.shoppingCart);
  const decrementProduct = useShoppingCartStore(state => state.decrementProduct);
  const incrementProduct = useShoppingCartStore(state => state.incrementProduct);
  const quantity = shoppingCart[product.id] || 0;

  const { currency } = useCurrencyStore();
  const { data: exchangeRateMap } = useSuspenseQuery(exchangeRateQueryOptions());
  const exchangeRate = exchangeRateMap[currency];

  return (
    <ProductItem.Root onClick={() => navigate(`/product/${product.id}`)}>
      <ProductItem.Image src={product.images[0]} alt={product.name} />
      <ProductItem.Info title={product.name} description={product.description} />
      <ProductItem.Meta>
        <ProductItem.MetaLeft>
          <ProductItem.Rating rating={product.rating} />
          <ProductItem.Price>{formatPrice(exchangeRate * product.price, currency)}</ProductItem.Price>
        </ProductItem.MetaLeft>
      </ProductItem.Meta>
      <Counter.Root>
        <Counter.Minus
          onClick={() => {
            decrementProduct({ productId: product.id });
          }}
          disabled={quantity === 0}
        />
        <Counter.Display value={quantity} />
        <Counter.Plus
          onClick={() => {
            incrementProduct({ productId: product.id });
          }}
          disabled={product.stock === quantity}
        />
      </Counter.Root>
    </ProductItem.Root>
  );
};

export default ProductCheeseItem;
