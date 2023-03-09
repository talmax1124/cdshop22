import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_ORDERNOTES,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_SHIPPING_COST,
  CART_SAVE_SHIPPING_TITLE,
  CART_REMOVE_SHIPPING_RATES,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
      digitalLink: data.digitalLink,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingCost = (cost) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_COST,
    payload: {
      cost: cost,
    },
  });

  localStorage.setItem("cost", cost);
};

export const saveShippingTitle = (title) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_TITLE,
    payload: {
      title: title,
    },
  });

  localStorage.setItem("title", title);
};

export const saveShippingAddress = (data) => async (dispatch) => {
  localStorage.removeItem("shippingRates");
  //saveShippingAddress({ line1, line2, postal_code, city, state, country })

  // compose line_items array
  let totalWeight = 0;
  let largestItem = 0;

  let cartLineItems = [];
  data.cartItems.forEach((item) => {
    // Get the weight of each item and add it to the weight object

    let lineItem = {
      quantity: item.qty,
      total_price: item.price.toString(),
      currency: "USD",
      weight: "0.25",
      weight_unit: "lb",
      title: item.name,
      manufacture_country: "US",
      sku: item.product.toString(),
    };
    totalWeight += item.weight * item.qty;
    if (item.length > largestItem) {
      largestItem = item.length;
    }
    cartLineItems.push(lineItem);
  });

  const payload = {
    address_from: {
      name: "Carlos Diaz",
      company: "Creative Duo LLC",
      street1: "4706 Sutton Lane",
      street_no: "",
      street2: "",
      street3: "",
      city: "Kissimmee",
      state: "FL",
      zip: "34758",
      country: "US",
    },

    address_to: {
      name: "Bob Bloat",
      company: "",
      street1: data.line1,
      street_no: "",
      street2: data.line2,
      street3: "",
      city: data.city,
      state: data.state,
      zip: data.postal_code,
      country: "US",
    },

    // composing lien_items array

    line_items: cartLineItems,

    parcel: {
      length: "6.5",
      width: "4.5",
      height: "4",
      distance_unit: "in",
      weight: totalWeight.toString(),
      mass_unit: "lb",
    },
  };
  // Add the process env to the fetch url
  if (process.env.NODE_ENV === "development") {
    const response = await fetch(`http://localhost:7500/api/rates/liverates `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    console.log("data", json);

    data["shipping Rates"] = [...json.results];

    localStorage.setItem("shippingRates", JSON.stringify(data.shippingRates));
  }

  if (process.env.NODE_ENV === "production") {
    const response = await fetch(
      `https://creativeduo.net/api/rates/liverates `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    console.log(process.env.CLIENT_URL);

    const json = await response.json();

    console.log("data", json);

    data["shipping Rates"] = [...json.results];

    localStorage.setItem("shippingRates", JSON.stringify(data.shippingRates));
  }

  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const removeShipingRates = (data) => (dispatch) => {
  dispatch({
    type: CART_REMOVE_SHIPPING_RATES,
  });
  localStorage.removeItem("shipingRates");
};
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveOrderNotes = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_ORDERNOTES,
    payload: data,
  });

  localStorage.setItem("saveOrderNotes", JSON.stringify(data));
};

export const saveordernotes = (data) => async (dispatch) => {
  // get shiping rates here

  dispatch({
    type: CART_SAVE_ORDERNOTES,
    payload: data,
  });

  localStorage.setItem("ordernotes", JSON.stringify(data));
};
