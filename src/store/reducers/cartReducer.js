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
        items: [...state.items, { ...action.payloadID.item, quantity: 1 }],
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
      return {
        items: [
          ...state.items.slice(0, action.payload.pos),
          ...state.items.slice(action.payload.pos + 1),
        ],
      };
    case "ITEM_LOADED":
      var idx = state.items.findIndex((e) => e.id === action.productId);
      if (idx === -1) {
        return {
          items: [
            ...state.items,
            {
              ...action.product,
              id: action.productId,
              quantity: action.quantity,
            },
          ],
        };
      } else {
        return state;
      }

    case "ITEM_NOT_LOADED":
      console.log("Item not loaded " + action.id + " " + action.err);
      return state;
    case "CART_LOADED":
      return state;
    case "CART_NOT_LOADED":
      console.log("cart not loaded" + action.err);
      return state;
    case "CART_SYNCED":
      return state;
    case "CART_NOT_SYNCED":
      console.log("cart not synced" + action.err);
      return state;
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
