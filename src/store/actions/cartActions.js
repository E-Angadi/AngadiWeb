export const addItem = (item) => {
  return (dispatch, getState) => {
    const state = getState();
    var elPos = state.cart.items.findIndex((el) => el.id === item.id);
    if (elPos !== -1) {
      var count = state.cart.items[elPos].quantity;
      count++;
      // add new count to quantity to existing object
      var payload = { id: item.id, count: count, pos: elPos };
      dispatch({ type: "INCREASE_COUNT", payload });
    } else {
      // add new object to cart items array
      var payloadID = { id: item.id, item: item };
      dispatch({ type: "ADD_NEW_ITEM", payloadID });
    }
  };
};

export const removeItem = (item) => {
  return (dispatch, getState) => {
    const state = getState();
    var elPos = state.cart.items.findIndex((el) => el.id === item.id);
    if (elPos !== -1) {
      var count = state.cart.items[elPos].quantity;
      count--;
      // add new count to quantity to existing object
      var payload = { id: item.id, count: count, pos: elPos };
      if (count > 0) {
        dispatch({ type: "DECREMENT_COUNT", payload });
      } else {
        dispatch({ type: "REMOVE_ITEM", payload });
      }
    }
  };
};

export const loadCartItems = (items) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    items.forEach((item) => {
      firestore
        .collection("products")
        .doc(item.id)
        .get()
        .then((d) => {
          dispatch({
            type: "ITEM_LOADED",
            product: d.data(),
            productId: item.id,
            quantity: item.quantity,
          });
        })
        .catch((err) => {
          dispatch({ type: "ITEM_NOT_LOADED", productId: item.id, err: err });
        });
    });
  };
};
