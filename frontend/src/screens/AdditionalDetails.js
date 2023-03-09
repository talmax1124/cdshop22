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
import { saveOrderNotes, removeShipingRates } from "../actions/cartActions";

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
  //eslint-disable-next-line
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

    // remove shpping rates from global state

    dispatch(removeShipingRates());

    // GET SHIPPING RATES HERE
    let totalWeight = 0;
    // let largestItem = 0;

    let cartLineItems = [];
    cartItems.forEach((item) => {
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
        street1: line1,
        street_no: "",
        street2: line2,
        street3: "",
        city: city,
        state: state,
        zip: postal_code,
        country: "US",
      },

      line_items: cartLineItems,

      parcel: {
        length: "7",
        width: "5",
        height: "5",
        distance_unit: "in",
        weight: totalWeight.toString(),
        mass_unit: "lb",
      },
    };

    if (process.env.NODE_ENV === "production") {
      toast.success("Redirecting to Shipping Rates...");
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

      // Get an array of shipping rates
      let shippingRates = [...json.results];

      setLoading(false);
      setShowButton(true);

      // remove existing shipping rates
      localStorage.removeItem("shippingRates");

      dispatch(
        saveShippingAddress({
          line1,
          line2,
          postal_code,
          city,
          state,
          country,
          shippingRates,
          cartItems,
        })
      );
      dispatch(saveOrderNotes(orderNotes));
      history.push("/checkout");
    } else if (process.env.NODE_ENV === "development") {
      toast.success("Redirecting to Shipping Selection");
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

      toast.success("Redirecting to Shipping Rates...");

      const json = await response.json();
      console.log("data", json);

      // Get an array of shipping rates
      let shippingRates = [...json.results];

      // Use the shippinRates and loop over them to get the price and find if it equals to .31. If it equals to .31 then remove it from the array

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
          shippingRates,
          cartItems,
        })
      );
      dispatch(saveOrderNotes(orderNotes));
      history.push("/checkout");
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <ToastContainer />
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
                    strokeLineCap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  ></path>
                </svg>
              </li>
            </Link>
            <li className="flex items-center text-blue-600 ">
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
                  strokeLineCap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                ></path>
              </svg>
            </li>
            <li className="flex items-center">
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
                          type="text"
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
                        className="bg-slate-600 hover:bg-slate-700 w-full"
                      >
                        {loading ? (
                          <>
                            <div
                              role="status"
                              className="flex justify-center items-center"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-white"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span className="text-white">Loading...</span>
                            </div>
                          </>
                        ) : (
                          "Save Address, Notes, & Continue"
                        )}
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
