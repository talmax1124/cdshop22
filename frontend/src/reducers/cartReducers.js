import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_SHIPPING_COST,
  CART_SAVE_ORDERNOTES,
  CART_CLEAR_ITEMS,
  CART_SAVE_SHIPPING_TITLE,
  CART_REMOVE_SHIPPING_RATES,
} from "../constants/cartConstants";

export const cartReducer = (
  state = {
    cartItems: [],
    shippingAddress: {},
    orderNotes: "",
    cdnURL: "",
    shippingCost: "",
    shippingTitle: "",
    shippingRates: [],
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_SAVE_ORDERNOTES:
      return {
        ...state,
        orderNotes: action.payload,
      };

    case CART_REMOVE_SHIPPING_RATES:
      return {
        ...state,
        shippingRates: [],
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      const shippingRates =
        action.payload && action.payload.shippingRates
          ? [...action.payload.shippingRates]
          : [];
      return {
        ...state,
        shippingAddress: action.payload,
        shippingRates,
      };

    case CART_SAVE_SHIPPING_COST:
      return {
        ...state,
        shippingCost: action.payload.shippingCost,
      };
    case CART_SAVE_SHIPPING_TITLE:
      return {
        ...state,
        shippingTitle: action.payload.shippingTitle,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
