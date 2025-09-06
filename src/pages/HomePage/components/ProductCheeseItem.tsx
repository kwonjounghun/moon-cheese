import { Counter } from "@/ui-lib";
import ProductItem from "./ProductItem";
import type { ProductCheese } from "@/queries/product";



interface ProductCheeseItemProps {
  product: ProductCheese;
  handleClickProduct: (productId: number) => void;
  removeFromShoppingCart: (productId: number) => void;
  addToShoppingCart: (productId: number) => void;
  shoppingCart: { [productId: number]: number };
  price: string;
}

const ProductCheeseItem = ({ product, handleClickProduct, removeFromShoppingCart, addToShoppingCart, shoppingCart, price }: ProductCheeseItemProps) => {
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
    </ProductItem.Meta>
    <Counter.Root>
      <Counter.Minus onClick={() => { removeFromShoppingCart(product.id) }} disabled={shoppingCart[product.id] === 0} />
      <Counter.Display value={shoppingCart[product.id] || 0} />
      <Counter.Plus onClick={() => { addToShoppingCart(product.id) }} disabled={product.stock === shoppingCart[product.id]} />
    </Counter.Root>
  </ProductItem.Root>;
};

export default ProductCheeseItem;