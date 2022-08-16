import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

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
      setProfileImage(data);
      setUploadingProfilePicture(false);
    } catch (error) {
      console.log(error);
      setUploadingProfilePicture(false);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setProfileImage(user.profileImage);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
          phone,
          profileImage,
        })
      );
    }
  };

  return (
    <>
      <Row className="cta-prof-head">
        <Col
          md={3}
          className="bg-slate-900 flex justify-center items-center text-white flex-col cta-prof rounded-md"
        >
          {user.profileImage && (
            <>
              {/* <div className="dividerrrprofile"></div> */}
              <center>
                <img
                  alt={user.profileImage}
                  src={user.profileImage}
                  draggable="false"
                  width="50%"
                />
              </center>
            </>
          )}
          <br></br>
          <br />
          <h1 className="text-white font-bold text-2xl text-center">
            Hello, {userInfo.name}
          </h1>
          <h1 className="text-slate-200 font-bold text-1xl text-center">
            Have a nice day / night!
          </h1>
        </Col>

        <Col>
          <h2 className="font-light text-[1.2em] mb-1 prf-tit">
            Update your information
          </h2>
          {message && <Message variant="danger">{message}</Message>}
          {}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
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
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  label="Phone Number"
                  name="phone"
                  value={phone}
                  type="phone"
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
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Profile Image"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
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
                className="btn bg-black w-full text-white hover:bg-gray-700"
              >
                Update Profile
              </Button>
            </Form>
          )}
        </Col>
      </Row>
      <br />
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="danger">{errorOrders}</Message>
      ) : (
        <>
          <h1 className="font-light text-[1.2em] mb-1">Your Orders</h1>
          <Table striped bordered hover responsive className="table-sm mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn bg-black w-half text-white hover:bg-gray-700">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProfileScreen;
