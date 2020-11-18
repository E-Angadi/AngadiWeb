const initstate = {
  items: [],
};

const cartReducer = (state = initstate, action) => {
  var newState = state;
  switch (action.type) {
    case "INCREASE_COUNT":
      newState.items[action.payload.pos].quantity = action.payload.count;
      console.log(newState);
      return newState;
    case "ADD_NEW_ITEM":
      newState.items.push({ id: action.payload.id, quantity: 1 });
      console.log(newState);
      return newState;
    default:
      return state;
  }
};

export default cartReducer;
