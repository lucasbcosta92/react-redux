import { ActionTypes, IProduct } from "./types";

// Validações (estoques e tals)
export function addProductToCartRequest(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartRequest,
    payload: { product },
  };
}

// Caso passe nas validações da action acima
export function addProductToCartSuccess(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartSuccess,
    payload: { product },
  };
}

// Caso falhe nas validações da action acima
export function addProductToCartFailure(productId: number) {
  return {
    type: ActionTypes.addProductToCartFailure,
    payload: { productId },
  };
}
