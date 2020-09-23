import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
