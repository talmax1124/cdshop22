import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner, Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { verify } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [profileImage, setprofileImage] = useState("");
  const [uploadingProfilePicture, setUploadingProfilePicture] = useState(false);

  const uploadFileHandlerone = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploadingProfilePicture(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/uploadprofilepicture",
        formData,
        config
      );
      setprofileImage(data);
      setUploadingProfilePicture(false);
    } catch (error) {
      console.log(error);
      setUploadingProfilePicture(false);
    }
  };

  const dispatch = useDispatch();

  const userVerification = useSelector((state) => state.userVerification);

  const { verification, loading, error } = userVerification;

  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: loadingRegister,
    error: errorRegister,
    userInfo,
  } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(verify(name, email, password, phone, profileImage));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="profileImage">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            label="Profile Image URL"
            name="profileImage"
            value={profileImage}
            onChange={(e) => setprofileImage(e.target.value)}
            disabled
          ></Form.Control>
          <Form.File
            label="Choose File"
            custom
            onChange={uploadFileHandlerone}
            className="mb-1 mt-1"
          ></Form.File>
          {uploadingProfilePicture && <Loader />}
        </Form.Group>

        <Button
          type="submit"
          className="btn-block btn bg-black hover:bg-gray-800"
          variant="primary"
        >
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Alread Have An Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
      {loading && (
        <Spinner
          animation="border"
          role="status"
          variant="danger"
          style={{
            width: "100px",
            margin: "auto",
            height: "100px",
            display: "block",
          }}
        />
      )}
      {verification && (
        <Message variant="success">{verification.response}</Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {errorRegister && <Message variant="danger">{errorRegister}</Message>}
      {loadingRegister && <Loader />}
    </FormContainer>
  );
};

export default RegisterScreen;
