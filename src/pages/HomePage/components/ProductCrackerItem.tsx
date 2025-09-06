import { Counter } from "@/ui-lib";
import ProductItem from "./ProductItem";
import type { ProductCracker } from "@/queries/product";

interface ProductCheeseItemProps {
  product: ProductCracker;
  handleClickProduct: (productId: number) => void;
  minusProduct: (productId: number) => void;
  addProduct: (productId: number) => void;
  count: number;
  price: string;
}

const ProductCheeseItem = ({ product, handleClickProduct, minusProduct, addProduct, count, price }: ProductCheeseItemProps) => {
  return <ProductItem.Root onClick={() => handleClickProduct(product.id)}>
    <ProductItem.Image src={product.images[0]} alt={product.name} />
    <ProductItem.Info
      title={product.name}
      description={product.description}
    />
    <ProductItem.Meta>
      <ProductItem.MetaLeft>
        <ProductItem.Rating rating={product.rating} />
        <ProductItem.Price>{price}</ProductItem.Price>
      </ProductItem.MetaLeft>
      {product.isGlutenFree && <ProductItem.FreeTag type="gluten" />}
    </ProductItem.Meta>
    <Counter.Root>
      <Counter.Minus onClick={() => { minusProduct(product.id) }} disabled={count === 0} />
      <Counter.Display value={count} />
      <Counter.Plus onClick={() => { addProduct(product.id) }} disabled={product.stock === count} />
    </Counter.Root>
  </ProductItem.Root>;
};

export default ProductCheeseItem;