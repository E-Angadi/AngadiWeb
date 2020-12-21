const initstate = {
  results: [],
  searching: false,
  err: "",
};

const searchReducer = (state = initstate, action) => {
  switch (action.type) {
    case "SEARCHING_TRUE":
      return {
        ...state,
        searching: true,
        results: [],
      };
    case "SEARCHING_FALSE":
      if (action.err) {
        return {
          ...state,
          searching: false,
          err: action.err,
          results: [],
        };
      } else {
        return {
          ...state,
          searching: false,
          err: "",
          results: action.hits,
        };
      }

    default:
      return state;
  }
};

export default searchReducer;
