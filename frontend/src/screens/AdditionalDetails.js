//  useState, useRef } from "react";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { saveShippingAddress } from "../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { saveOrderNotes } from "../actions/cartActions";

import { Shippo } from "shippo";

// import PayButton from "../components/pay";

const AdditionalDetails = ({ match, location, history }) => {
  const shippo = Shippo("shippo_test_5d0b5b5b0b5b5b5b5b5b5b5b5b5b5b5b5b5b5b5b");

  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, orderNotes } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [line1, setLine1] = useState(shippingAddress.line1);
  const [line2, setLine2] = useState(shippingAddress.line2);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [postal_code, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const [notes, setOrderNotes] = useState(orderNotes.notes);

  var addressFrom = {
    name: "Shawn Ippotle",
    street1: "215 Clayton St.",
    city: "San Francisco",
    state: "CA",
    zip: "94117",
    country: "US",
  };
  var addressTo = {
    name: userInfo.name,
    street1: line1,
    city: city,
    state: state,
    zip: postal_code,
    country: country,
  };

  var parcel = {
    length: "5",
    width: "5",
    height: "5",
    distance_unit: "in",
    weight: "2",
    mass_unit: "lb",
  };

  shippo.shipment.create(
    {
      address_from: addressFrom,
      address_to: addressTo,
      parcels: [parcel],
      async: false,
    },
    function (err, shipment) {
      // asynchronously called
      if (err) {
        console.log(err);
      } else {
        console.log(shipment);
      }
    }
  );

  const editor = useRef(null);
  const config = {
    readonly: false,
    placeholder: "Write Order Notes",
    askBeforePasteHTML: false,
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    // dispatch(saveordernotes(ordernotes));
  }, [dispatch, productId, qty]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ line1, line2, postal_code, city, state, country })
    );
    dispatch(saveOrderNotes(orderNotes));
    toast.success("Shipping Address and or Order Notes Saved!");
  };

  const submitToNext = (e) => {
    history.push("/checkout");
  };

  return (
    <>
      <ToastContainer />
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

            <p className="mr-1 text-[1.6em] uppercase font-medium text-gray-900">
              Final Details
            </p>

            <p>
              <i className="fas fa-arrow-right mr-1 text-[1.4em]"></i>
            </p>

            <p className="mr-1 text-[1.6em] uppercase font-medium text-gray-500">
              Payment
            </p>
          </span>

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
                      Shipping / Order Notes
                    </h2>
                  </ListGroup.Item>

                  <ListGroup.Item className="border-transparent">
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="line1">
                        <Form.Label className="font-medium mb-2">
                          Address Line 1
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Address Line 1"
                          value={line1}
                          required
                          onChange={(e) => setLine1(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="line2">
                        <Form.Label className="font-medium mb-2">
                          Address Line 2
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Address Line 2"
                          value={line2}
                          onChange={(e) => setLine2(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="city">
                        <Form.Label className="font-medium mb-2">
                          City
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter City"
                          value={city}
                          required
                          onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="state">
                        <Form.Label className="font-medium mb-2">
                          State
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter State"
                          value={state}
                          required
                          onChange={(e) => setState(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="postal_code">
                        <Form.Label className="font-medium mb-2">
                          Zip Code
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Zip Code"
                          value={postal_code}
                          required
                          onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="country">
                        <Form.Label className="font-medium mb-2">
                          Country
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Country"
                          value="USA"
                          disabled
                          onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                        <Form.Group controlId="orderNotes">
                          <Form.Label className="font-medium mb-2 mt-3">
                            Requests? Notes For The Order?
                          </Form.Label>
                          <JoditEditor
                            id="description"
                            ref={editor}
                            value={notes}
                            config={config}
                            tabIndex={1}
                            onBlur={(e) => setOrderNotes(e)}
                          />
                        </Form.Group>
                      </Form.Group>
                      <Button
                        type="submit"
                        variant="primary"
                        className="bg-gray-800"
                      >
                        Save Address & Notes
                      </Button>
                    </Form>
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
                <Row className="">
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
              </ListGroup.Item>
            </>
          ))}

          <Link>
            <Button
              className="btn btn-block bg-gray-700 hover:bg-black text-white"
              onClick={submitToNext}
            >
              Go To Payment Screen
            </Button>

            {/* <PayButton cartItems={cart.cartItems} /> */}
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default AdditionalDetails;
