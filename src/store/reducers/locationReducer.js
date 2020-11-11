const initstate = {};

const locationReducer = (state = initstate, action) => {
  switch (action.type) {
    case "WRITE_LOCATIONS":
      return state;
    case "WRITE_LOCATIONS_ERR":
      return state;
    default:
      return state;
  }
};

export default locationReducer;
