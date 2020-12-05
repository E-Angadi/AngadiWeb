const initstate = {
  status: false,
  order_id: "",
  msg: "",
};

const paymentReducer = (state = initstate, action) => {
  switch (action.type) {
    case "ORDER_ID_GEN":
      return {
        ...state,
        order_id: action.payload.order_id,
      };
    case "ORDER_ID_NOT_GEN":
      console.log(action.err.msg);
      return {
        ...state,
        msg: "ORDER_ID_NOT_GEN",
        order_id: "",
        status: false,
      };
    case "TRANS_VERIFIED":
      return {
        ...state,
        order_id: "",
        status: false,
        msg: "SUCCESS",
      };
    case "TRANS_NOT_VERIFIED":
      console.log(action.err.msg);
      return {
        ...state,
        msg: "TRANS_NOT_VERFIED",
        order_id: "",
        status: false,
      };
    case "COD_DONE":
      return {
        ...state,
        status: false,
        msg: "SUCCESS",
        order_id: "",
      };
    case "PAYMENT_START":
      return {
        ...state,
        status: true,
      };
    case "RESET_PAY_STATE":
      return initstate;
    default:
      return state;
  }
};
export default paymentReducer;
