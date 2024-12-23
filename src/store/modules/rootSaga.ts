// Combinando sagas (middlewares) dentro de um unico modulo

import { all } from "redux-saga/effects";
import cart from "./cart/sagas";

export default function* rootSaga(): Generator {
  return yield all([cart]);
}
