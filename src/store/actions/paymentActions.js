import axios from "axios";

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

export const createOrder = () => async (dispatch, getState) => {
  const state = getState();
  var amount = calcTPrice(state.cart.items);
  var cartData = serializeItems(state.cart.items);
  if (state.firebase.auth.uid) {
    try {
      const options = {
        amount: amount,
        order_data: cartData,
        user_id: state.firebase.auth.uid,
        user_name: state.firebase.profile.name,
        delivery: state.firebase.profile.delivery,
        pincode: state.firebase.profile.pincode,
        pnum: state.firebase.profile.pNum,
      };
      const res = await axios.post(
        "https://us-central1-angadi-6266d.cloudfunctions.net/payment/create_order",
        options
      );
      dispatch({
        type: "ORDER_ID_GEN",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "ORDER_ID_NOT_GEN",
        err: err,
      });
    }
  }
};

export const verifyOrder = (
  razorpay_signature,
  razorpay_order_id,
  razorpay_payment_id
) => async (dispatch, getState) => {
  const state = getState();
  if (state.firebase.auth.uid) {
    try {
      const options = {
        razorpay_signature,
        razorpay_order_id,
        razorpay_payment_id,
      };
      const res = await axios.post(
        "https://us-central1-angadi-6266d.cloudfunctions.net/payment/verify_order",
        options
      );
      dispatch({
        type: "TRANS_VERIFIED",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANS_NOT_VERIFIED",
        err: err,
      });
    }
  }
};
