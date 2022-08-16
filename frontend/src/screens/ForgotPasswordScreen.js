import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { forgotPassword } from "../actions/userActions";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const userPasswordReset = useSelector((state) => state.userPasswordReset);
  const { loading, success, message, error } = userPasswordReset;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <FormContainer>
      <h1 className="text-2xl mb-2">Forgot Password?</h1>
      {error && <Message variant="danger">{error}</Message>}
      {success && message && <Message variant="success">{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label className="text-1xl">Enter Registered Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <p>
          You will receive instructions to reset your password in your email.
        </p>
        <Button
          type="submit"
          variant="primary"
          className="btn bg-black hover:bg-gray-800 mt-2 w-full"
        >
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ForgotPasswordScreen;
