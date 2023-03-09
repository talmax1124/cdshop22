//  useState, useRef } from "react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { saveShippingCost, saveShippingTitle } from "../actions/cartActions";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Loader from "../components/Loader";

import PayButton from "../components/pay";
import ShippingRate, { ShippingRateSkeleton } from "../components/ShippingRate";

const CheckOut = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [shippingPrice, setShippingPrice] = useState(0);
  const [shippingTitle, setShippingTitle] = useState("");

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }

    console.log("Shipping Rates..", cart.shippingRates);
    // dispatch(saveordernotes(ordernotes));
  }, [dispatch, productId, qty, cart.shippingRates]);

  const rateSelectHandelr = (rate) => {
    console.log("rate", rate);
    setShippingPrice(rate.amount);
    setShippingTitle(rate.title);
    // dispatch(saveShippingAddress({ rate }));
    dispatch(saveShippingCost(rate.amount));
    dispatch(saveShippingTitle(rate.title));
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <Row>
        <Col md={7}>
          <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border  rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
            <Link to="/cart" className="hover:no-underline">
              <li className="flex items-center text-blue-400 ">
                <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                  1
                </span>
                Cart
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 sm:ml-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  ></path>
                </svg>
              </li>
            </Link>
            <Link to="/additionaldetails" className="hover:no-underline">
              <li className="flex items-center text-blue-400 ">
                <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  2
                </span>
                Shipping{" "}
                <span className="hidden sm:inline-flex sm:ml-2">Info</span>
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 sm:ml-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  ></path>
                </svg>
              </li>
            </Link>
            <li className="flex items-center text-blue-600 ">
              <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                3
              </span>
              Review & Pay
            </li>
          </ol>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <>
              <Card className="mt-2">
                <ListGroup variant="flush">
                  <ListGroup.Item className="border-transparent">
                    <h2 className="text-[2em] uppercase font-bold font-sans text-black">
                      Select Shipping Method
                    </h2>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-transparent">
                    {/* Remove the form and add the options below */}
                    <ul className="shippingRates">
                      {cart.shippingRates &&
                        cart.shippingRates.map((rate, index) => {
                          return (
                            <ShippingRate
                              key={index}
                              rate={rate}
                              onSelect={rateSelectHandelr}
                            />
                          );
                        })}
                      {cart.shippingRates &&
                        cart.shippingRates.length === 0 && (
                          <>
                            {/* <Loader /> */}
                            <ShippingRateSkeleton />
                            <ShippingRateSkeleton />
                            <ShippingRateSkeleton />
                            <ShippingRateSkeleton />
                            <ShippingRateSkeleton />
                          </>
                        )}
                    </ul>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </>
          )}
        </Col>
        <Col md={5} className="rounded-md mt-2 p-2">
          <h2 className="font-bold text-2xl">
            Cart (Qty: {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            ):
          </h2>
          {cartItems.map((item) => (
            <>
              <ListGroup.Item key={item.product} className="border-transparent">
                <Row className="bg-gray-100 p-2 py-4 rounded flex items-center justify-between">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.product}`}
                      className="font-medium"
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2} className="font-medium">
                    ${item.price}
                  </Col>
                  <Col md={2} className="font-medium">
                    QTY: {item.qty}
                  </Col>
                </Row>
              </ListGroup.Item>
            </>
          ))}

          <hr
            style={{ border: "1px solid black", width: "100%" }}
            className="mt-3"
          />
          <p className="mt-2 text-[1.3em] font-medium">
            Cart Value: $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </p>

          <p className="mt-2 text-[1.3em] font-medium mb-3">
            Shipping Price: ${shippingPrice}
            <br />
            Shipping Title: {shippingTitle}
          </p>

          <Link>
            <PayButton
              cartItems={cart.cartItems}
              shippingPrice={shippingPrice}
              shippingTitle={shippingTitle}
            />
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default CheckOut;
