const initstate = {
  snackbarStatus: false,
  message: "",
  variant: "success",
  disableSubmit: false,
  specials: [],
};

const productReducer = (state = initstate, action) => {
  switch (action.type) {
    case "CREATE_PRODUCT":
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Product created successfully",
        variant: "success",
        disableSubmit: false,
      });
    case "CREATE_PRODUCT_ERR":
      console.log("Error creating product", action.err);
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Error creating product",
        variant: "error",
        disableSubmit: false,
      });
    case "UPDATE_PRODUCT":
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Updated product info",
        variant: "success",
        disableSubmit: false,
      });
    case "UPDATE_PRODUCT_ERR":
      console.log("Error updating product info", action.err);
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Error updating product info",
        variant: "error",
        disableSubmit: false,
      });
    case "UPDATE_PRODUCT_IMAGE":
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Updated product image",
        variant: "success",
        disableSubmit: false,
      });
    case "UPDATE_PRODUCT_IMAGE_ERR":
      console.log("Error updating product image", action.err);
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Error updating product image",
        variant: "error",
        disableSubmit: false,
      });
    case "DELETE_PRODUCT":
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Deleted product",
        variant: "success",
        disableSubmit: false,
      });
    case "DELETE_PRODUCT_ERR":
      console.log("Error deleting product", action.err);
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Error deleting product",
        variant: "error",
        disableSubmit: false,
      });
    case "CLOSE_SNACKBAR_PRODUCT":
      return Object.assign({}, state, {
        ...state,
        snackbarStatus: false,
      });
    case "DISABLE_SUBMIT_PRODUCT":
      return Object.assign({}, state, {
        ...state,
        disableSubmit: true,
      });
    case "LOAD_SPECIALS":
      var newState = state;
      newState.specials = action.specials;
      return newState;
    default:
      return state;
  }
};

export default productReducer;
