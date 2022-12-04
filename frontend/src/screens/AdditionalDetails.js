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
import PayButton from "../components/pay";
import { ToastContainer } from "react-toastify";
import JoditEditor from "jodit-react";
import { saveordernotes } from "../actions/cartActions";

const AdditionalDetails = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [ordernotes, setordernotes] = useState("");

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
    dispatch(saveordernotes(ordernotes));
  }, [dispatch, productId, qty, ordernotes]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveordernotes(ordernotes));
  };

  return (
    <Row>
      <Col md={8}>
        <Link to="/cart">
          <Button className="bg-slate-800 mb-3">Go Back</Button>
        </Link>
        <h1 className=" text-black text-2xl font-medium tracking-tight leading-none md:text-3xl xl:text-5xl mb-1 ">
          Final Review
        </h1>
        <p className="mt-2 font-medium">
          Before we place your order, please review your items in the cart. This
          is also the oppurtunity to write your order notes & upload any files.{" "}
        </p>
        <hr className="mb-2" />
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <>
            <ToastContainer pauseOnHover={false} />
            <ListGroup variant="flush">
              <h2 className="font-bold text-2xl">Cart:</h2>
              {cartItems.map((item) => (
                <>
                  <ListGroup.Item key={item.product}>
                    <Row className="bg-gray-100 p-2 rounded flex items-center justify-between">
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link
                          to={`/product/${item.product}`}
                          className="font-light"
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2} className="font-light">
                        ${item.price}
                      </Col>
                      <Col md={2}>QTY: {item.qty}</Col>
                    </Row>
                  </ListGroup.Item>
                </>
              ))}
              <ListGroup.Item>
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="orderNotes">
                    <Form.Label className="font-medium mb-2">
                      Requests? Notes For The Order?
                    </Form.Label>
                    <JoditEditor
                      id="description"
                      ref={editor}
                      value={ordernotes}
                      config={config}
                      tabIndex={1}
                      onBlur={(e) => setordernotes(e)}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="bg-gray-800"
                  >
                    Save Order Notes
                  </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="font-medium mb-1 text-[1.3em]">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              <p className="mt-2 text-[1.1em] font-light">
                Cart Value: $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              {userInfo ? (
                <>
                  {cartItems.length > 0 ? (
                    <PayButton cartItems={cart.cartItems} />
                  ) : (
                    <Link
                      to="/"
                      className="no-underline"
                      style={{ textDecoration: "none" }}
                    >
                      <Button className="btn btn-block bg-red-600 hover:bg-red-700 no-underline">
                        No Products Added
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="no-underline"
                  style={{ textDecoration: "none" }}
                >
                  <Button className="btn btn-block bg-red-600 hover:bg-red-700 no-underline">
                    Sign In To Proceed
                  </Button>
                </Link>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default AdditionalDetails;
