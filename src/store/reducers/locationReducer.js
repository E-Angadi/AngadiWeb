const initstate = {
  openCheck: false,
};

const locationReducer = (state = initstate, action) => {
  switch (action.type) {
    case "WRITE_LOCATIONS":
      return state;
    case "WRITE_LOCATIONS_ERR":
      return state;
    case "OPEN_PINCODE_DIALOG":
      return {
        ...state,
        openCheck: true,
      };
    case "CLOSE_PINCODE_DIALOG":
      return {
        ...state,
        openCheck: false,
      };
    default:
      return state;
  }
};

export default locationReducer;
