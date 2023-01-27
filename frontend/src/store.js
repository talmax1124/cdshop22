import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productReviewDeleteReducer,
  productTopRatedReducer,
  productCategoryReducer,
  productLatestReducer,
} from "./reducers/productReducers";
import {
  articleListReducer,
  articleDetailsReducer,
  articleDeleteReducer,
  articleCreateReducer,
  articleUpdateReducer,
} from "./reducers/articleReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userVerificationReducer,
  userPasswordResetReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderDeliverReducer,
  orderStatusReducer,
  orderListMyReducer,
  orderListReducer,
  orderPackedReducer,
  orderDispatchedReducer,
  orderCancelReducer,
  // orderShipmentLinkReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productCategory: productCategoryReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productReviewDelete: productReviewDeleteReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  productLatest: productLatestReducer,
  userLogin: userLoginReducer,
  userVerification: userVerificationReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userPasswordReset: userPasswordResetReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliverReducer,
  // orderShipmentPaymentLink: orderShipmentLinkReducer,
  orderStatus: orderStatusReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderPack: orderPackedReducer,
  orderDispatch: orderDispatchedReducer,
  orderCancel: orderCancelReducer,
  articleList: articleListReducer,
  articleDetails: articleDetailsReducer,
  articleDelete: articleDeleteReducer,
  articleCreate: articleCreateReducer,
  articleUpdate: articleUpdateReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const shippingCostFromStorage = localStorage.getItem("cost")
  ? localStorage.getItem("cost")
  : 0;

const shippingTitleFromStorage = localStorage.getItem("title")
  ? localStorage.getItem("title")
  : "";

const shippingRatesFromStorage = localStorage.getItem("shippingRates")
  ? JSON.parse(localStorage.getItem("shippingRates"))
  : {};

const orderNotesFromStorage = localStorage.getItem("orderNotes")
  ? JSON.parse(localStorage.getItem("orderNotes"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    shippingRates: shippingRatesFromStorage,
    shippingCost: shippingCostFromStorage,
    shippingTitle: shippingTitleFromStorage,
    orderNotes: orderNotesFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
