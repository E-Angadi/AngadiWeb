const initstate = {
  status: false,
  order_id: "",
  err_msg: "",
};

const paymentReducer = (state = initstate, action) => {
  switch (action.type) {
    case "ORDER_ID_GEN":
      return {
        ...state,
        status: true,
        order_id: action.payload.order_id,
      };
    case "ORDER_ID_NOT_GEN":
      console.log(action.err.msg);
      return {
        ...state,
        status: false,
        err_msg: action.err.msg,
        order_id: "",
      };
    case "TRANS_VERIFIED":
      return {
        ...state,
        status: false,
        order_id: "",
      };
    case "TRANS_NOT_VERIFIED":
      console.log(action.err.msg);
      return {
        ...state,
        status: false,
        err_msg: action.err.msg,
        order_id: "",
      };
    default:
      return state;
  }
};
export default paymentReducer;
