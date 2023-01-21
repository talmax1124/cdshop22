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

// import ShippingRates from "../components/ShippingRates";

// import PayButton from "../components/pay";

const AdditionalDetails = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, orderNotes } = cart;

  const [line1, setLine1] = useState(shippingAddress.line1);
  const [line2, setLine2] = useState(shippingAddress.line2);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [postal_code, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const [notes, setOrderNotes] = useState(orderNotes.notes);

  // laoindg sate
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

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

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    // GET SHIPPING RATES HERE

    const payload = {
      // "address_from": "fdabf0abb93c4460b60aa596116872a7",
      // OR
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
        street1: line1,
        street_no: "",
        street2: line2,
        street3: "",
        city: city,
        state: state,
        zip: postal_code,
        country: "US",
      },

      line_items: [
        {
          quantity: 1,
          total_price: "12.00",
          currency: "USD",
          weight: "1.0",
          weight_unit: "lb",
          title: "Creative Duo LLC",
          manufacture_country: "US",
          sku: "1234567890",
        },
      ],

      parcel: {
        length: "10",
        width: "15",
        height: "10",
        distance_unit: "in",
        weight: "1",
        mass_unit: "lb",
      },
    };

    if (process.env.NODE_ENV === "production") {
      const response = await fetch(
        `https://creativeduo.net/api/rates/liverates`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await response.json();

      console.log("data", json);
      const shippinRates = [...json.results];

      setLoading(false);
      setShowButton(true);

      dispatch(
        saveShippingAddress({
          line1,
          line2,
          postal_code,
          city,
          state,
          country,
          shippinRates,
          cartItems,
        })
      );
      dispatch(saveOrderNotes(orderNotes));
      toast.success("Shipping Address and or Order Notes Saved!");
      history.push("/checkout");
    } else if (process.env.NODE_ENV === "development") {
      const response = await fetch(
        `http://localhost:7500/api/rates/liverates`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await response.json();

      console.log("data", json);
      const shippinRates = [...json.results];

      setLoading(false);
      setShowButton(true);

      dispatch(
        saveShippingAddress({
          line1,
          line2,
          postal_code,
          city,
          state,
          country,
          shippinRates,
          cartItems,
        })
      );
      dispatch(saveOrderNotes(orderNotes));
      toast.success("Shipping Address and or Order Notes Saved!");
      history.push("/checkout");
    } else {
      console.log("error");
    }
  };

  // function waitthreee() {
  //   setTimeout(() => {
  //     history.push("/checkout");
  //   }, 3000);
  // }

  return (
    <>
      <ToastContainer />
      <Row>
        <Col md={7}>
          {/* <ShippingRates /> */}
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
                      {postal_code && (
                        <Button
                          type="submit"
                          variant="primary"
                          className="bg-slate-600 hover:bg-slate-700 w-full"
                        >
                          {loading
                            ? "Saving..."
                            : "Save Address & Notes & Continue"}
                        </Button>
                      )}
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
          {/* {state.length > 0 && ( */}
        </Col>
      </Row>
    </>
  );
};

export default AdditionalDetails;
