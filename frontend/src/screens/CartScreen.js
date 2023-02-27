import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { ToastContainer } from "react-toastify";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Row>
      <Col md={8}>
        <Link to="/products">
          <Button className="text-black bg-slate-50   rounded-lg mb-3 mt-2 no-underline hover:no-underline">
            <i className="fas fa-arrow-left mr-1 text-[1.4em]"></i>
            Go Back
          </Button>
        </Link>
        <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border  rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
          <li className="flex items-center text-blue-600 ">
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
          <li className="flex items-center">
            <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              2
            </span>
            Shipping <span className="hidden sm:inline-flex sm:ml-2">Info</span>
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
          <li className="flex items-center">
            <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              3
            </span>
            Review & Pay
          </li>
        </ol>

        <hr className="mb-2" />
        {cartItems.length === 0 ? (
          <Message className="p-1">Looks like your cart is empty. </Message>
        ) : (
          <>
            <ToastContainer pauseOnHover={false} />
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className="bg-slate-100 p-2 rounded-md flex items-center justify-between">
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
                    <Col md={2} className="font-bold">
                      ${item.price}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white rounded-md text-1xl"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="font-medium mb-1 text-[1.3em]">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)} item(s) in
                your cart
              </h2>
              <p className="mt-2 text-[1.1em] font-medium">
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
                    <Link to="/additionaldetails">
                      <Button className="btn btn-block bg-gray-900 hover:bg-black no-underline">
                        Proceed to Shipping Screen
                      </Button>
                    </Link>
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

export default CartScreen;
