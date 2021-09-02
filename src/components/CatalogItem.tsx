import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../store";
import { addProductToCartRequest } from "../store/modules/cart/actions";
import { IProduct } from "../store/modules/cart/types";

interface CatalogItemProps {
  product: IProduct;
}

export function CatalogItem({ product }: CatalogItemProps) {
  const dispatch = useDispatch();

  // Checando se o produto tem estoque disponivel
  const hasFailedStockCheck = useSelector<IState, boolean>((state) =>
    state.cart.failedStockCheck.includes(product.id)
  );

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  return (
    <article>
      <strong>{product.title}</strong> {" - "}
      <span>{product.price}</span> {" - "}
      <button type="button" onClick={handleAddProductToCart}>
        Add o cart
      </button>
      {hasFailedStockCheck && <span style={{ color: "red" }}>Sem estoque</span>}
    </article>
  );
}
