/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login, getGoogleUserInfo } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(getGoogleUserInfo());
    }
    // eslint-disable-next-line
  }, []);

  const signInWithGoogleHandler = (e) => {
    e.preventDefault();
    const googleSignInEndPoint =
      process.env.NODE_ENV === "development"
        ? `http://localhost:7500/api/auth/google?redirect=${redirect}`
        : `/api/auth/google?redirect=${redirect}`;
    window.location.href = googleSignInEndPoint;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <div className="login-screen">
        <div className="login-screen-left">
          <img
            src="https://images.pexels.com/photos/3585089/pexels-photo-3585089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Login-Alt-Image"
          />
        </div>

        <div className="login-screen-right">
          <h1 className="text-3xl font-bold">Sign In</h1>

          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label className="text-medium text-1xl font-medium mt-2">
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                className="login-input w-full"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label className="text-medium text-1xl font-medium">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                className="login-input w-full"
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              className="bg-black hover:bg-slate-800 w-full"
            >
              Sign In
            </Button>
          </Form>

          <div class="flex justify-center items-center mt-4">
            <button
              onClick={signInWithGoogleHandler}
              className=" bg-slate-200 rounded-full w-1/2 flex justify-center items-center p-1 hover:bg-slate-300"
            >
              <img
                src="https://img.icons8.com/fluent/48/000000/google-logo.png"
                alt=""
                className="mr-2 h-10 w-10"
              />
              Sign In With Google
            </button>
          </div>

          <Row className="py-3 mt-4">
            <Col className="flex justify-between">
              <div>
                <p className="font-medium mr-2">New Customer?</p>{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="underline"
                >
                  Register
                </Link>
              </div>
              <div>
                <p className="font-medium mr-2">New Forgot Your Password?</p>{" "}
                <Link
                  to="/forgot-password"
                  className="underline"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
