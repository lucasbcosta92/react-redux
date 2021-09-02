// Configurações do saga a respeito do cart

import { all, takeLatest } from "redux-saga/effects";

function checkProductStock() {
  console.log("adicionado ao carrinho");
}

export default all([
  // action, e qual função será disparada quando a action definida for disparada
  takeLatest("ADD_PRODUCT_TO_CART", checkProductStock),
]);
