const initstate = {};

const productReducer = (state = initstate, action) => {
  switch (action.type) {
    case "CREATE_PRODUCT":
      console.log("create product", action.product);
      return state;
    case "CREATE_PRODUCT_ERR":
      console.log("Error creating product", action.err);
      return state;
    case "UPDATE_PRODUCT":
      console.log("update product info", action.product);
      return state;
    case "UPDATE_PRODUCT_ERR":
      console.log("Error updating product", action.err);
      return state;
    case "UPDATE_PRODUCT_IMAGE":
      console.log("update product image", action.product);
      return state;
    case "UPDATE_PRODUCT_IMAGE_ERR":
      console.log("Error updating product image", action.err);
      return state;
    case "DELETE_PRODUCT":
      console.log("delete product", action.product);
      return state;
    case "DELETE_PRODUCT_ERR":
      console.log("Error deleting product", action.err);
      return state;
    default:
      return state;
  }
};

export default productReducer;
