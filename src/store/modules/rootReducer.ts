// Combinando reducers dentro de um unico estado/modulo

import { combineReducers } from "redux";
import cart from "./cart/reducer";

export default combineReducers({
  cart,
});
