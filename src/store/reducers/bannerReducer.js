const initstate = {};

const bannerReducer = (state = initstate, action) => {
  switch (action.type) {
    case "CREATE_BANNER":
      console.log("create banner", action.imageData);
      return state;
    case "CREATE_BANNER_ERR":
      console.log("Error creating banner", action.err);
      return state;
    case "DELETE_BANNER":
      console.log("delete banner", action.image);
      return state;
    case "DELETE_BANNER_ERR":
      console.log("Error deleting banner", action.err);
      return state;
    default:
      return state;
  }
};

export default bannerReducer;
