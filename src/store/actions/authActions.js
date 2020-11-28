export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
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
        });
      })
      .then(() => dispatch({ type: "SIGNUP_SUCCESS" }))
      .catch((err) => dispatch({ type: "SGINUP_ERR", err }));
  };
};
