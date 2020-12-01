const calcTPrice = (items) => {
  if (!items && items.length === 0) return 0;
  var res = 0;
  items.forEach((item) => {
    res += item.quantity * item.totalPrice;
  });
  return res;
};

const serializeItems = (items) => {
  var cart = [];
  items.forEach((item) => {
    cart.push(item.title + ";" + item.quantity + ";" + item.totalPrice);
  });
  return cart.join(",");
};

const createOrder = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState();
    const firestore = getFirestore();
    const amount = calcTPrice(state.cart.items);
    const cart = serializeItems(state.cart.items);
    var fileID;
    firestore
      .collection("orders")
      .add({
        cart: cart,
        amount: amount,
      })
      .then((resp) => {
        fileID = resp.id;
      });
  };
};
