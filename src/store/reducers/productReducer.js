const initstate = {};

const productReducer = (state = initstate, action) => {
  switch (action.type) {
    case "CREATE_PRODUCT":
      console.log("create product", action.product);
      return state;
    case "CREATE_PRODUCT_ERR":
      console.log("Error creating product", action.err);
      return state;
    default:
      return state;
  }
};

export default productReducer;
