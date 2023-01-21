//  useState, useRef } from "react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { saveShippingCost } from "../actions/cartActions";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PayButton from "../components/pay";
import ShippingRate from "../components/ShippingRate";

const CheckOut = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }

    console.log("Shipping Rates..", cart.shippingRates);
    // dispatch(saveordernotes(ordernotes));
  }, [dispatch, productId, qty, cart.shippingRates]);

  // const submitToNext = (e) => {
  //   history.push("/checkout");
  // };

  const rateSelectHandelr = (rate) => {
    console.log("rate", rate);
    setShippingPrice(rate.amount);
    // dispatch(saveShippingAddress({ rate }));
    dispatch(saveShippingCost(rate.amount));
  };
  return (
    <>
      {/* <ToastContainer /> */}
      <Row>
        <Col md={7}>
          <span className="flex items-center">
            <Link to="/cart">
              <p className="mr-1 text-[1.6em] uppercase font-medium text-gray-500">
                Cart
              </p>
            </Link>

            <p>
              <i className="fas fa-arrow-right mr-1 text-[1.4em]"></i>
            </p>

            <Link to="/additionaldetails">
              <p className="mr-1 text-[1.6em] uppercase font-medium text-gray-500">
                Final Details
              </p>
            </Link>

            <p>
              <i className="fas fa-arrow-right mr-1 text-[1.4em]"></i>
            </p>

            <p className="mr-1 text-[1.6em] uppercase font-medium text-gray-900">
              Payment
            </p>
          </span>{" "}
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
                        cart.shippingRates.map((rate) => {
                          return (
                            <ShippingRate
                              rate={rate}
                              onSelect={rateSelectHandelr}
                            />
                          );
                        })}
                    </ul>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </>
          )}
        </Col>
        <Col md={5} className="rounded-md mt-2">
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
          <Row className=" mb-3">
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
          </Row>
          <Row className="mb-2 mt-[-1em]">
            <p className="mt-2 text-[1.3em] font-medium">
              Shipping Price: ${shippingPrice}
            </p>
          </Row>

          <Link>
            <PayButton
              cartItems={cart.cartItems}
              shippingPrice={shippingPrice}
            />
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default CheckOut;
