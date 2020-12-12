const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERR":
      console.log("LOGIN_ERR");
      return {
        ...state,
        authError: "Login Failed",
      };
    case "LOGIN_SUCCESS":
      console.log("LOGIN_SUCCESS");
      return {
        ...state,
        authError: null,
      };
    case "SIGNOUT_SUCCESS":
      return state;
    case "SIGNUP_SUCCESS":
      console.log("SIGNUP_SUCCESS");
      return {
        ...state,
        authError: null,
      };
    case "SGINUP_ERR":
      return {
        ...state,
        authError: action.err.message,
      };
    case "USER_UPDATE_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "USER_UPDATE_FAILURE":
      console.log("SIGNUP_ERR - " + action.err);
      return {
        ...state,
        authError: "SIGNUP_ERR",
      };
    case "RESET_AUTH_ERR":
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
};
export default authReducer;
