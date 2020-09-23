const initstate = {};

const categoryReducer = (state = initstate, action) => {
  switch (action.type) {
    case "CREATE_CATEGORY":
      console.log("create category", action.category);
      return state;
    case "CREATE_CATEGORY_ERR":
      console.log("Error creating category", action.err);
      return state;
    case "UPDATE_CATEGORY_TITLE":
      console.log("update category title", action.category);
      return state;
    case "UPDATE_CATEGORY_TITLE_ERR":
      console.log("Error updating category title", action.err);
      return state;
    case "UPDATE_CATEGORY_IMAGE":
      console.log("update category image", action.category);
      return state;
    case "UPDATE_CATEGORY_IMAGE_ERR":
      console.log("Error updating category image", action.err);
      return state;
    case "DELETE_CATEGORY":
      console.log("delete category", action.category);
      return state;
    case "DELETE_CATEGORY_ERR":
      console.log("Error deleting category", action.err);
      return state;
    default:
      return state;
  }
};

export default categoryReducer;
