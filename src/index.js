import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "./store/reducers/RootReducer";
import { createStore, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import {PayPalScriptProvider} from "@paypal/react-paypal-js"
import AlertTemplate from 'react-alert-template-basic';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import {
  reduxFirestore,
  getFirestore,
  createFirestoreInstance,
} from "redux-firestore";
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from "react-redux-firebase";
import firebase, { firebaseConfig } from "./config/firebaseConfig";
import { composeWithDevTools } from "redux-devtools-extension";
import Loading from "./components/frontend/Loading";
import { configs } from "./config/configs";

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, firebaseConfig)
  )
);



function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <Loading />;
  return children;
}

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  firebaseConfig,
  dispatch: store.dispatch,
  attachAuthIsReady: true,
  createFirestoreInstance,
};

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider options={{"client-id":configs.paypal.client_id}}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <AuthIsLoaded>
            <AlertProvider template={AlertTemplate}{...options}>
            <App />
            </AlertProvider>
          </AuthIsLoaded>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
