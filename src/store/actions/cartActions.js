const deSerializeItems = (cart) => {
  const items = [];
  if (!cart) return items;
  const citems = cart.split(",");
  citems.forEach((c) => {
    const sc = c.split(";");
    if (sc.length === 2) items.push({ id: sc[0], quantity: parseInt(sc[1]) });
  });
  return items;
};

const serializeItems = (items) => {
  var cart = [];
  items.forEach((item) => {
    cart.push(item.id + ";" + item.quantity);
  });
  return cart.join(",");
};

const removeaItem = (items, id) => {
  var idx = items.findIndex((item) => item.id === id);
  if (idx !== -1) {
    return [...items.slice(0, idx), ...items.slice(idx + 1)];
  } else return [];
};

const incrementItem = (items, id) => {
  var idx = items.findIndex((item) => item.id === id);
  if (idx !== -1) {
    var count = items[idx].quantity;
    count++;
    return [
      ...items.slice(0, idx),
      {
        id: id,
        quantity: count,
      },
      ...items.slice(idx + 1),
    ];
  } else return [];
};

const decrementItem = (items, id) => {
  var idx = items.findIndex((item) => item.id === id);
  if (idx !== -1) {
    var count = items[idx].quantity;
    count--;
    return [
      ...items.slice(0, idx),
      {
        id: id,
        quantity: count,
      },
      ...items.slice(idx + 1),
    ];
  } else return [];
};

export const addItem = (item) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState();
    const firestore = getFirestore();
    var elPos = state.cart.items.findIndex((el) => el.id === item.id);
    if (elPos !== -1) {
      var count = state.cart.items[elPos].quantity;
      count++;

      if (state.firebase.auth.uid) {
        firestore
          .collection("users")
          .doc(state.firebase.auth.uid)
          .get()
          .then((d) => {
            var doc = d.data();
            var items = deSerializeItems(doc.cart);
            var newItems = incrementItem(items, item.id);
            return serializeItems(newItems);
          })
          .then((cart) => {
            return firestore
              .collection("users")
              .doc(state.firebase.auth.uid)
              .update({ cart: cart });
          })
          .catch((e) => dispatch({ type: "ADD_NEW_ITEM_FIRESTORE_ERR", e }));
      }

      // add new count to quantity to existing object
      var payload = { id: item.id, count: count, pos: elPos };
      dispatch({ type: "INCREASE_COUNT", payload });
    } else {
      // add new object to cart items array

      if (state.firebase.auth.uid) {
        firestore
          .collection("users")
          .doc(state.firebase.auth.uid)
          .get()
          .then((d) => {
            var doc = d.data();
            var cart = doc.cart;
            if (cart === "") {
              return item.id + ";1";
            } else {
              return cart + "," + item.id + ";1";
            }
          })
          .then((cart) => {
            return firestore
              .collection("users")
              .doc(state.firebase.auth.uid)
              .update({ cart: cart });
          })
          .catch((e) => dispatch({ type: "ADD_NEW_ITEM_FIRESTORE_ERR", e }));
      }

      var payloadID = { id: item.id, item: item };
      dispatch({ type: "ADD_NEW_ITEM", payloadID });
    }
  };
};

export const removeItem = (item) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState();
    const firestore = getFirestore();
    var elPos = state.cart.items.findIndex((el) => el.id === item.id);
    if (elPos !== -1) {
      var count = state.cart.items[elPos].quantity;
      count--;
      // add new count to quantity to existing object
      var payload = { id: item.id, count: count, pos: elPos };
      if (count > 0) {
        if (state.firebase.auth.uid) {
          firestore
            .collection("users")
            .doc(state.firebase.auth.uid)
            .get()
            .then((d) => {
              var doc = d.data();
              var items = deSerializeItems(doc.cart);
              var newItems = decrementItem(items, item.id);
              return serializeItems(newItems);
            })
            .then((cart) => {
              return firestore
                .collection("users")
                .doc(state.firebase.auth.uid)
                .update({ cart: cart });
            })
            .catch((e) => dispatch({ type: "ADD_NEW_ITEM_FIRESTORE_ERR", e }));
        }
        dispatch({ type: "DECREMENT_COUNT", payload });
      } else {
        if (state.firebase.auth.uid) {
          firestore
            .collection("users")
            .doc(state.firebase.auth.uid)
            .get()
            .then((d) => {
              var doc = d.data();
              var items = deSerializeItems(doc.cart);
              var newItems = removeaItem(items, item.id);
              return serializeItems(newItems);
            })
            .then((cart) => {
              return firestore
                .collection("users")
                .doc(state.firebase.auth.uid)
                .update({ cart: cart });
            })
            .catch((e) => dispatch({ type: "ADD_NEW_ITEM_FIRESTORE_ERR", e }));
        }
        dispatch({ type: "REMOVE_ITEM", payload });
      }
    }
  };
};

export const loadCartItems = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var state = getState();
    if (state.firebase.auth.uid) {
      firestore
        .collection("users")
        .doc(state.firebase.auth.uid)
        .get()
        .then((d) => {
          var doc = d.data();
          var items = deSerializeItems(doc.cart);
          return items;
        })
        .then((items) => {
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
                dispatch({
                  type: "ITEM_NOT_LOADED",
                  productId: item.id,
                  err: err,
                });
              });
          });
        })
        .then(() => {
          dispatch({ type: "CART_LOADED" });
        })
        .catch((err) => {
          dispatch({ type: "CART_NOT_LOADED", err: err });
        });
    }
  };
};

export const syncCart = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var state = getState();
    var cart = serializeItems(state.cart.items);
    if (state.firebase.auth.uid) {
      firestore
        .collection("users")
        .doc(state.firebase.auth.uid)
        .update({ cart: cart })
        .then(() => {
          dispatch({ type: "CART_SYNCED" });
        })
        .catch((err) => {
          dispatch({ type: "CART_NOT_SYNCED", err: err });
        });
    }
  };
};

export const clearCart = () => {
  return (dispatch, getState) => {
    dispatch({ type: "CLEAR_CART" });
    dispatch(syncCart());
  };
};
