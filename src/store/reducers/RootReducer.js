import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import bannerReducer from "./bannerReducer";
import cartReducer from "./cartReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  banner: bannerReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  cart: cartReducer,
});

export default rootReducer;
