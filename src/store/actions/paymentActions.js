import axios from "axios";
import { clearCart } from "./cartActions";

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
    var unit = item.unitSelect === 0 ? "kg" : "l";
    cart.push(
      item.title +
        ";" +
        item.quantity +
        ";" +
        item.totalPrice +
        ";" +
        item.unitValue +
        " " +
        unit
    );
  });
  return cart.join(",");
};

export const createOrder = (cod) => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: "PAYMENT_START" });

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
        cod: cod,
      };

      const res = await axios.post(
        "https://us-central1-angadi-6266d.cloudfunctions.net/payment/create_order",
        options
      );
      if (cod) {
        dispatch({
          type: "COD_DONE",
        });
        dispatch(clearCart());
      } else {
        dispatch({
          type: "ORDER_ID_GEN",
          payload: res.data,
        });
      }
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
      dispatch(clearCart());
    } catch (err) {
      dispatch({
        type: "TRANS_NOT_VERIFIED",
        err: err,
      });
    }
  }
};

export const resetPaymentState = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_PAY_STATE" });
  };
};
