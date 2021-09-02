// Configurações do saga a respeito do cart -> Middleware

import { AxiosResponse } from "axios";
import { all, select, takeLatest, call, put } from "redux-saga/effects";
import { IState } from "../..";
import api from "../../../services/api";
import {
  addProductToCartRequest,
  addProductToCartSuccess,
  addProductToCartFailure,
} from "./actions";
import { ActionTypes } from "./types";

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  // Qual o produto que está sendo adicionado ao carrinho
  const { product } = payload;

  // Buscando a quantidade que já está no carrinho (caso o produto já esteja adicionado)
  const currentQuantityInCart: number = yield select((state: IState) => {
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });

  /*
    call é preciso parar fazer um fetch dentro do redux-saga
    Nele definimos o metodo e qual o endpoid como params diferents
  */

  const avaliableStockResponse: AxiosResponse<IStockResponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  if (avaliableStockResponse.data.quantity > currentQuantityInCart) {
    // PUT -> Dispara uma action
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  // action, e qual função será disparada quando a action definida for disparada
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
