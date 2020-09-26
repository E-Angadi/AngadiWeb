const initstate = {
  snackbarStatus: false,
  message: "",
  variant: "success",
};

const bannerReducer = (state = initstate, action) => {
  switch (action.type) {
    case "CREATE_BANNER":
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Banner added successfully",
        variant: "success",
      });
    case "CREATE_BANNER_ERR":
      console.log("Error creating banner", action.err);
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Error adding banner",
        variant: "error",
      });
    case "DELETE_BANNER":
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Banner deleted successfully",
        variant: "success",
      });
    case "DELETE_BANNER_ERR":
      console.log("Error deleting banner", action.err);
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Error deleting banner",
        variant: "error",
      });
    case "CLOSE_SNACKBAR_BANNER":
      return Object.assign({}, state, {
        ...state,
        snackbarStatus: false,
      });
    default:
      return state;
  }
};

export default bannerReducer;
