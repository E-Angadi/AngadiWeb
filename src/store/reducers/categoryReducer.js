const initstate = {
  snackbarStatus: false,
  message: "",
  variant: "success",
  disableSubmit: false,
};

const categoryReducer = (state = initstate, action) => {
  switch (action.type) {
    case "CREATE_CATEGORY":
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Category created successfully",
        variant: "success",
        disableSubmit: false,
      });
    case "CREATE_CATEGORY_ERR":
      console.log("Error creating category", action.err);
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Error creating category",
        variant: "error",
        disableSubmit: false,
      });
    case "UPDATE_CATEGORY_TITLE":
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Updated category title",
        variant: "success",
        disableSubmit: false,
      });
    case "UPDATE_CATEGORY_TITLE_ERR":
      console.log("Error updating category title", action.err);
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Error updating category title",
        variant: "error",
        disableSubmit: false,
      });
    case "UPDATE_CATEGORY_IMAGE":
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "updated category image",
        variant: "success",
        disableSubmit: false,
      });
    case "UPDATE_CATEGORY_IMAGE_ERR":
      console.log("Error updating category image", action.err);
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Error updating category image",
        variant: "error",
        disableSubmit: false,
      });
    case "DELETE_CATEGORY":
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Deleted category",
        variant: "success",
        disableSubmit: false,
      });
    case "DELETE_CATEGORY_ERR":
      console.log("Error deleting category", action.err);
      return Object.assign({}, state, {
        snackbarStatus: true,
        message: "Error deleting category",
        variant: "error",
        disableSubmit: false,
      });
    case "CLOSE_SNACKBAR_CATEGORY":
      return Object.assign({}, state, {
        ...state,
        snackbarStatus: false,
      });
    case "DISABLE_SUBMIT_CATEGORY":
      return Object.assign({}, state, {
        ...state,
        disableSubmit: true,
      });
    default:
      return state;
  }
};

export default categoryReducer;
