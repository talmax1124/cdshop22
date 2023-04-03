import React, { useEffect } from "react";
// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  // Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

// import OrderNotesJoditOrder from "../components/OrderNotesJoditOrder";

import { Widget } from "@uploadcare/react-widget";

import {
  getOrderDetails,
  deliverOrder,
  orderPacked,
  orderDispatched,
  orderCancelled,
  // orderShipmentPaymentLink,
  // orderStatus,
} from "../actions/orderActions";
import {
  ORDER_DELIVER_RESET,
  // ORDER_SHIPMENTPAYMENT_RESET,
  ORDER_STATUS_RESET,
  ORDER_PACKED_RESET,
  ORDER_DISPATCHED_RESET,
  ORDER_CANCEL_RESET,
} from "../constants/orderConstants";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  // const shipmentPayment = useSelector((state) => state.shipmentPayment);
  // const {
  //   loading: loadingShipmentPayment,
  //   success: successShipmentPayment,
  // } = shipmentPayment;

  // const [link, setLink] = useState("");

  const orderPack = useSelector((state) => state.orderPack);
  const { success: successPack, loading: loadingPack } = orderPack;

  const orderDispatch = useSelector((state) => state.orderDispatch);
  const { success: successDispatch, loading: loadingDispatch } = orderDispatch;

  const orderCancel = useSelector((state) => state.orderCancel);
  const { success: successOrderCancel, loading: loadingOrderCancel } =
    orderCancel;

  // const orderStatus = useSelector((state) => state.orderStatus);
  // const { loading: loadingStatus, success: successStatus } = orderStatus;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let tax = 0;
  let discount = 0;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + item.price * item.qty,

        0
      )
    );

    const tax_percent = 7;
    let subtotal = order.itemsPrice;
    tax = Math.round(subtotal * (tax_percent / 100));

    discount = order.totalPrice - order.itemsPrice - order.shippingCost - tax;
  }

  useEffect(() => {
    //REDIRECTS TO LOGIN PAGE WHEN TRYING TO ACCESS ORDER PAGE WITHOUT LOGGED IN
    if (!userInfo) {
      history.push("/login");
    }

    //REDIRECTS TO HOME PAGE WHEN TRYING TO ACCESS OTHER'S ORDER PAGE IF NOT ADMIN
    if (order && userInfo) {
      if (!userInfo.isAdmin && order.user._id !== userInfo._id) {
        history.push("/");
      }
    }

    if (
      !order ||
      successDeliver ||
      // successShipmentPayment ||
      successPack ||
      successDispatch ||
      successOrderCancel ||
      // successStatus ||
      order._id !== orderId
    ) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_STATUS_RESET });
      dispatch({ type: ORDER_PACKED_RESET });
      dispatch({ type: ORDER_CANCEL_RESET });
      dispatch({ type: ORDER_DISPATCHED_RESET });
      // dispatch({ type: ORDER_SHIPMENTPAYMENT_RESET });
      dispatch(getOrderDetails(orderId));
    } else {
      //
    }
  }, [
    dispatch,
    orderId,
    successDeliver,
    // successShipmentPayment,
    order,
    successPack,
    successDispatch,
    successOrderCancel,
    history,
    userInfo,
  ]);

  // const paidMark = () => {
  //   dispatch(payOrder(orderId));
  // };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  // const shipmentPaymentHandler = () => {
  //   dispatch(orderShipmentPaymentLink(order));
  // };

  //MARK AS PACKED HANDLER
  const orderPackedHandler = () => {
    if (window.confirm("Press ok to mark this packed")) {
      dispatch(orderPacked(order));
      LoadOnce();
    }
  };

  //MARK AS DISPATCHED
  const orderDispatchedHandler = () => {
    if (window.confirm("Press ok to mark this dispatched")) {
      dispatch(orderDispatched(order));
      LoadOnce();
    }
  };

  //CANCEL ORDER
  const cancelHandler = () => {
    if (window.confirm("Are You Sure ?")) {
      dispatch(orderCancelled(order));
      LoadOnce();
    }
  };

  function LoadOnce() {
    window.location.reload();
  }

  // Check for the remaining amount that is left after shipping & tax

  // const statusHandler = () => {
  //   dispatch(orderStatus(order));
  // };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row>
        <Col md={8}>
          <ListGroup className="orderid" variant="flush">
            <ListGroup.Item>
              <h1 className="text-3xl font-light font-sans mb-2">
                Hello, {order.user.name}!
              </h1>
              <p className="mb-2">
                Thank your for supporting our small business. It means the world
                to us! Below, you can find your order information.
              </p>
              <p className="text-red-900 font-medium">
                Note: As the selection of shipping selected was manual, you may
                be asked to pay an additional amount for shipping, if needed.
                Thank you for your understanding.
              </p>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            {/* <ListGroup.Item>
              <Form onSubmit={shipmentPaymentHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Payment Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-block bg-black hover:bg-gray-800"
                >
                  Set Link
                </Button>
              </Form>
            </ListGroup.Item> */}
            <ListGroup.Item>
              <h2 className="font-bold mb-2 text-[1.2em]">
                Shipping & Order Information
              </h2>
              <p>
                <strong className="text-[1.2em]">Name: </strong>{" "}
                {order.user.name}
              </p>
              <p>
                <strong className="text-[1.2em]">Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`} className="mb-2">
                  {order.user.email}
                </a>
              </p>

              <p>
                <strong className="text-[1.2em]"> Shipping Address: </strong>
              </p>

              <div className="font-light mb-3">
                <p>{order.shippingAddress.line1}</p>
                <p>{order.shippingAddress.line2}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <p>
                  {order.shippingAddress.postal_code},{" "}
                  {order.shippingAddress.country}
                </p>
              </div>

              <p>
                <strong className="text-[1.2em]"> Shipping Cost: </strong>
                <strong>{order.shippingCost}</strong>
              </p>
              <p>
                <strong className="text-[1.2em]"> Shipping Cost: </strong>
                <strong>{order.shippingTitle}</strong>
              </p>

              {order.isCancelled && (
                <Message variant="danger" className="mt-2 mb-2">
                  Order is Cancelled
                </Message>
              )}

              {order.isPacked ? (
                <Message variant="success" className="mt-2 mb-2">
                  Packed On {order.packedAt.substring(0, 10)}
                </Message>
              ) : (
                !order.isCancelled && (
                  <Message variant="danger" className="mt-2 mb-2">
                    Order is Not Packed Yet
                  </Message>
                )
              )}

              {order.isDispatched ? (
                <Message variant="success" className="mt-2 mb-2">
                  Order Has Been Dispatched To The Courier
                </Message>
              ) : (
                !order.isCancelled && (
                  <Message variant="danger" className="mt-2 mb-2">
                    Order Has Not Dispatched Yet
                  </Message>
                )
              )}

              {order.isDelivered ? (
                <Message variant="success" className="mt-2 mb-2">
                  Delivered/Shipped on {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                !order.isCancelled && (
                  <Message variant="danger" className="mt-2 mb-2">
                    Order Has Not Been Delivered Yet
                  </Message>
                )
                // <Message variant="danger">Not Delivered/Shipped </Message>
              )}
            </ListGroup.Item>

            {/* <ListGroup.Item>
              <h2 className="font-medium mb-2 text-[1.1em]">Order Notes:</h2>
              <p>
                <OrderNotesJoditOrder order={order} />
              </p>
            </ListGroup.Item> */}

            <ListGroup.Item>
              <h2 className="font-medium mb-2 text-[1.1em]">Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <>
                  <ListGroup variant="flush" className="order-item-lg">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row className="bg-slate-200 p-2 rounded-md">
                          <div className="mb-2 mt-2 p-2 flex align-middle  items-center">
                            <div className="flex align-middle items-center">
                              {" "}
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                                width="15%"
                              />
                              <Link to={`/product/${item.product}`}>
                                <span className="font-medium text-[1.1em] ml-3 align-middle  items-center">
                                  {item.name}
                                </span>
                              </Link>
                            </div>
                            {/*  Small: {item.qty1} Medium: {item.qty2}{" "}
                          Large: {item.qty3} X-Large {item.qty4} XX-Large
                          {item.qty5}
                           */}
                            <Col md={5} className="font-medium">
                              {item.qty} (qty) x{" "}
                              {item.price > 0 && <>${item.price} (each)</>} {""}
                              {""} = ${item.qty * item.price} (total)
                            </Col>
                          </div>
                          {/* <Col md={2}>
                            <Col>
                              {" "}
                              Digital Link: <p> {item.digitalLink}</p>
                            </Col>
                          </Col> */}
                          <Row>
                            {item.digitalLink && (
                              <Col md={12}>
                                <Col>
                                  <div className="mt-2">
                                    <p className="font-medium text-[1.1em]">
                                      Digital Link:{" "}
                                    </p>
                                    <a
                                      href={item.digitalLink}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <p className="font-light text-[1.1em]">
                                        {item.digitalLink}
                                      </p>
                                    </a>
                                  </div>
                                </Col>
                              </Col>
                            )}
                          </Row>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <ListGroup variant="flush" className="order-item-sm">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row className="bg-slate-200 p-2 rounded-md">
                          <div className="mb-2 mt-2 flex-col align-middle items-center">
                            <div className="flex-col align-middle items-center">
                              {" "}
                              <Image
                                src={item.image}
                                alt={item.name}
                                rounded
                                width="100%"
                              />
                              <div className="mt-2">
                                <Link to={`/product/${item.product}`}>
                                  <span className="font-medium text-[1.3em] ">
                                    {item.name}
                                  </span>
                                </Link>
                              </div>
                              {item.qty} (qty) x{" "}
                              {item.price > 0 && <>${item.price} (each)</>} {""}
                              {""} = ${item.qty * item.price} (total)
                            </div>
                          </div>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="font-bold">Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="font-medium">Order ID:</Col>
                  <Col>{order._id}</Col>
                </Row>
                <Row>
                  <Col className="font-medium">Items Total:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col className="font-medium">Shipping Cost:</Col>
                  <Col>${order.shippingCost}</Col>
                </Row>
                <Row>
                  <Col className="font-medium">Tax:</Col>
                  <Col>${tax}</Col>
                </Row>
                <Row>
                  <Col className="font-medium">Discount:</Col>
                  <Col>{discount} off</Col>
                </Row>
                <hr />
                <Row>
                  <Col className="font-medium">Order Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {loadingDeliver && <Loader />}
              {/* {loadingShipmentPayment && <Loader />} */}
              {/* {loadingStatus && <Loader />} */}

              {!userInfo && (
                <ListGroup.Item>
                  <Widget
                    publicKey="ea2d5f102203c327acc8"
                    onChange={(info) => {
                      console.log(info.cdnUrl);
                      alert(
                        "Your File URL is: " +
                          info.cdnUrl +
                          " Screenshot it and send it to the message chat or to sales@creativeduo.net with your Order ID."
                      );
                    }}
                    previewStep="true"
                    // role="uploadcare-uploader"
                    data-multiple="true"
                    data-multiple-min="1"
                    id="file"
                    disabled="true"
                  />
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                {userInfo &&
                  userInfo.isAdmin &&
                  !order.isCancelled &&
                  !order.isDelivered && (
                    <Button
                      type="button"
                      className="btn btn-block bg-black hover:bg-gray-800"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered/Shipped
                    </Button>
                  )}
              </ListGroup.Item>

              {loadingPack && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                !order.isCancelled &&
                !order.isPacked && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block bg-black hover:bg-gray-800"
                      onClick={orderPackedHandler}
                    >
                      Mark As Packed
                    </Button>
                  </ListGroup.Item>
                )}

              {loadingDispatch && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                !order.isCancelled &&
                !order.isDispatched && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block bg-black hover:bg-gray-800"
                      onClick={orderDispatchedHandler}
                    >
                      Mark As Dispatched
                    </Button>
                  </ListGroup.Item>
                )}

              {/* 
              {userInfo && userInfo.isAdmin && (
                <Button type="button" onClick={statusHandler}>
                  Submit Order Status
                </Button>
              )} */}

              {loadingOrderCancel && <Loader />}
              {userInfo &&
                (order.user._id === userInfo._id || userInfo.isAdmin) &&
                !order.isCancelled &&
                !order.isDelivered &&
                !order.isDispatched && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block bg-red-900 hover:bg-red-800"
                      onClick={cancelHandler}
                      // disabled
                    >
                      Cancel Order
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
