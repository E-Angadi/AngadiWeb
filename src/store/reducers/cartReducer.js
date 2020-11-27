const initstate = {
  items: [],
};

const cartReducer = (state = initstate, action) => {
  switch (action.type) {
    case "INCREASE_COUNT":
      var newItems = [
        ...state.items.slice(0, action.payload.pos),
        {
          ...state.items[action.payload.pos],
          quantity: state.items[action.payload.pos].quantity + 1,
        },
        ...state.items.slice(action.payload.pos + 1),
      ];
      return {
        items: newItems,
      };
    case "ADD_NEW_ITEM":
      return {
        items: [...state.items, { id: action.payloadID.id, quantity: 1 }],
      };
    case "DECREMENT_COUNT":
      var newItems = [
        ...state.items.slice(0, action.payload.pos),
        {
          ...state.items[action.payload.pos],
          quantity: state.items[action.payload.pos].quantity - 1,
        },
        ...state.items.slice(action.payload.pos + 1),
      ];
      return {
        items: newItems,
      };
    case "REMOVE_ITEM":
      var newItems = [
        ...state.items.slice(0, action.payload.pos),
        ...state.items.slice(action.payload.pos + 1),
      ];
      return {
        items: newItems,
      };
    default:
      return state;
  }
};

export default cartReducer;
