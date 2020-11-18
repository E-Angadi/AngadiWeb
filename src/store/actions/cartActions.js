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
      var payloadID = { id: item.id };
      dispatch({ type: "ADD_NEW_ITEM", payloadID });
    }
  };
};
