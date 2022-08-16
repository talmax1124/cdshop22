import React, { useEffect } from "react";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

// import { payOrder } from "../actions/orderActions";

const StripeSuccess = ({ match, history }) => {
  const dispatch = useDispatch();
  const { session_id } = useParams();
  const cart = useSelector((state) => state.cart);
  // const orderId = match.params.id;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  useEffect(() => {
    // call the api to fetch session information and session_id with session_id
    fetchSessionInfo();
    // update the totalprice
    // call placeOrderHandler

    // placeOrderHandler();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const fetchSessionInfo = async () => {
    const { data } = await axios.get(
      `/api/stripe/getstripesession/${session_id}`
    );
    if (data.session) {
      placeOrderHandler(
        data.session.amount_total,
        data.session.customer_details.address
      );
      // placeOrderHandler(
      //   data.session.amount_total
      //   // data.session.customer_details.address.line1,
      //   // data.session.customer_details.address.line2,
      //   // data.session.customer_details.address.city,
      //   // data.session.customer_details.address.state,
      //   // data.session.customer_details.address.postal_code,
      //   // data.session.customer_details.address.country
      // );
      // console.log(
      //   data.session.customer_details.address.line1,
      //   data.session.customer_details.address.line2,
      //   data.session.customer_details.address.city,
      //   data.session.customer_details.address.state,
      //   data.session.customer_details.address.postal_code,
      //   data.session.customer_details.address.country
      // );
      // console.log(data.session.customer_details.address.line1);
      // console.log(data.session.customer_details.address.line2);
      // console.log(data.session.customer_details.address.city);
      // console.log(data.session.customer_details.address.postal_code);
      // console.log(data.session.customer_details.address.state);
      // console.log(data.session.customer_details.address.country);
    }
  };

  // const successPaymentHandler = (paymentResult) => {
  //   console.log(paymentResult);
  //   dispatch(payOrder(orderId, paymentResult));
  // };

  const placeOrderHandler = (totalAmount, Address) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: totalAmount / 100,
        shippingAddress: Address,
      })
    );
  };

  return (
    <>
      <h1 className="font-bold text-3xl">Your Purchase Has Been Completed.</h1>
      <h1 className="font-medium text-2xl">
        Please wait while we redirect you.
      </h1>
    </>
  );
};

export default StripeSuccess;
