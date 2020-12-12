import { clearCart, syncCart, loadCartItems } from "./cartActions";

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
        dispatch(clearCart());
        dispatch(loadCartItems());
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
        dispatch(clearCart());
      });
  };
};

export const signUp = (user) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const email = user.email;
    const password = user.password;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        console.log(resp.user.uid);
        return firestore.collection("users").doc(resp.user.uid).set({
          name: user.username,
          delivery: user.main,
          pincode: user.pincode,
          pNum: user.phoneNum,
          isAdmin: false,
          cart: "",
        });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
        dispatch(syncCart());
      })
      .catch((err) => dispatch({ type: "SGINUP_ERR", err }));
  };
};

export const anonymousSignup = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .signInAnonymously()
      .then((resp) => {
        console.log(resp.user.uid);
        return firestore.collection("users").doc(resp.user.uid).set({
          name: resp.user.uid,
          delivery: "",
          pincode: "",
          pNum: "",
          isAdmin: false,
          isGuest: true,
          cart: "",
        });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
        dispatch(syncCart());
      })
      .catch((err) => dispatch({ type: "SGINUP_ERR", err }));
  };
};

export const updateUserInfo = (userID, userInfo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .doc(userID)
      .update({
        name: userInfo.name,
        delivery: userInfo.main,
        pincode: userInfo.pincode,
        pNum: userInfo.phoneNum,
      })
      .then(() => dispatch({ type: "USER_UPDATE_SUCCESS" }))
      .catch((err) => dispatch({ type: "USER_UPDATE_FAILURE", err }));
  };
};
