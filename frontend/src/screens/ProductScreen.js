import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
// import moment from "moment";
import ProductDescription from "../components/ProductDescription";
import ProductInformation from "../components/ProductInformation";
import ShippingReturnPolicy from "../components/ShippingReturnPolicy";

import ProductImageCarousel from "../components/ProductImageCarousel";

import {
  listProductDetails,
  createProductReview,
  // deleteProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

import { deleteProduct } from "../actions/productActions";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  // const productId = match.params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const productReviewDelete = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReviewDelete,
    loading: loadingProductReviewDelete,
    error: errorProductReviewDelete,
  } = productReviewDelete;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }

    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview, product]);

  useEffect(() => {
    if (successProductReviewDelete) {
      setRating(0);
      setComment("");
    }
  }, [successProductReviewDelete]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
    LoadOnce();
  };

  // const deleteReviewHandler = (reviewId) => (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     deleteProductReview(match.params.id, {
  //       rating,
  //       comment,
  //       reviewId,
  //     })
  //   );
  //   LoadOnce();
  // };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteProduct(id));
      goBackToHomeAfterDelete();
    }
  };

  // This is a function that makes the deletehandler reload the page once on the homescreen
  function goBackToHomeAfterDelete() {
    history.push("/");
    LoadOnce();
    alert("Product Has Been Deleted.");
  }

  // Line Below Reloads Page
  function LoadOnce() {
    window.location.reload();
  }

  // state that holds dynamic data from backend (optionsState)
  // function optionsChangeHandler

  // // const options = ["all", "users", "managers", "administrators"];
  // // const selectOptions = options.map((option) => option);

  // // <select onChange={optionChangeHandler}>
  // //     {selectOptions.map((address, key) => (
  // //       <option key={key} value={address}>
  // //         {address}
  // //       </option>
  // //     ))}
  // //   </select>

  // const productOptions = productOptions.map((state) => state)
  /*

  for (productOptions) {
    {mainOptions => options.option (
      
    )}
    {}
  }

  */

  // What fragments do: A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

  return (
    <>
      <Meta title={product.name} thumbnail={product.image} />
      <React.Fragment>
        <div className="flex justify-between">
          <Link to="/products">
            <Button className="text-black bg-slate-50   rounded-lg mb-3 mt-2 no-underline hover:no-underline">
              <i className="fas fa-arrow-left mr-1 text-[1.4em]"></i>
              Go Back
            </Button>
          </Link>

          {userInfo && userInfo.isAdmin && (
            <>
              <div>
                <Link to={`/admin/product/${product._id}/edit`}>
                  <Button className="text-black bg-green-100 hover:bg-red-500   rounded-lg mb-3 mt-2 no-underline hover:no-underline mr-2">
                    <i className="fas fa-pencil mr-1 text-[1.4em]"></i>
                    Edit
                  </Button>
                </Link>
                <Button
                  className="text-black bg-red-100 hover:bg-red-500   rounded-lg mb-3 mt-2 no-underline hover:no-underline"
                  onClick={() => deleteHandler(product._id)}
                >
                  <i className="fas fa-trash mr-1 text-[1.4em]"></i>
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              <Col md={6}>
                {product.additionalimageone ||
                product.additionalimagetwo ||
                product.additionalimagethree ? (
                  <ProductImageCarousel match={match} variant="dark" />
                ) : (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fluid
                    style={{
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                )}
              </Col>
              <Col md={5} className="product-info">
                <div className="flex justify-between items-center mt-3 mb-3">
                  {product.countInStock > 0 ? (
                    <div className="flex justify-center items-center p-2 bg-teal-300 rounded  stock-button">
                      <span className="font-medium">In stock</span>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center p-2 bg-red-300 rounded  stock-button">
                      <span className="font-medium text-xs ">Out of Stock</span>
                    </div>
                  )}
                  <Rating
                    value={product.rating}
                    text={
                      product.numReviews > 1
                        ? `${product.numReviews} review(s)`
                        : `${product.numReviews} review`
                    }
                  />
                </div>
                <h1>{product.name}</h1>
                {product.price > 0 && (
                  <>
                    {product.onSalePrice > 0 ? (
                      <>
                        <div className="flex">
                          <h4 className="font-bold text-[1.2em] mt-3 mr-3">
                            ${product.price}
                          </h4>
                          <p className="font-bold mt-3 text-[1.2em] line-through text-red-500 opacity-[50%]">
                            ${product.onSalePrice}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="font-bold text-[1.2em] mt-3 mr-3">
                          ${product.price}
                        </h4>
                      </>
                    )}
                  </>
                )}
                {/* {product.productOptions && (
                <>
                  <div className="flex justify-between items-center mt-3 mb-3">
                    {product.productOptions.map((option) => {
                      return (
                        <>
                          <p className="text-1xl px-3 py-1 bg-slate-100 hover:bg-slate-300 cursor-pointer rounded-md">
                            {option}
                          </p>
                        </>
                      );
                    })}
                  </div>
                </>
              )} */}

                {product.countInStock > 0 && (
                  <Row className="flex items-center mt-3 mb-3">
                    Qty
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="ml-2 w-1/2"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Row>
                )}
                <Button
                  onClick={addToCartHandler}
                  className="bg-black w-full hover:bg-slate-700"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </Col>
            </Row>

            <div className="flow-root mt-3 mb-3">
              <div className="-my-8 divide-y divide-gray-100 mt-2 mb-2">
                <details className="group py-8 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer">
                    <h2 className="text-lg font-medium text-gray-900">
                      Product Information & Details
                    </h2>

                    <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ListGroup.Item>
                    <span className="font-medium uppercase">Brand:</span>{" "}
                    <span className="font-light">{product.brand}</span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <span className="font-medium uppercase">Category:</span>{" "}
                    <span className="font-light">{product.category}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="font-medium uppercase">Product Type:</span>{" "}
                    <span className="font-light">{product.type}</span>
                  </ListGroup.Item>

                  <ListGroup
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",

                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <ListGroup.Item style={{ minWidth: "100%" }}>
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        <h3 className="font-medium mb-3 text-[1.15em]">
                          Description
                        </h3>
                      </Row>
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        <Col md={6}>
                          <ProductDescription Product={product} />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </details>

                <details className="group py-8 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer">
                    <h2 className="text-lg font-medium text-gray-900">
                      Shipping & Returns
                    </h2>

                    <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </summary>
                  {!product.shippingReturnPolicy ? (
                    <h1 className="text-1xl mt-3 font-medium">
                      No Information On This At The Moment
                    </h1>
                  ) : (
                    <ListGroup.Item style={{ minWidth: "100%" }}>
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        <h3 className="font-medium mb-3 text-[1.15em]">
                          Shipping & Returns
                        </h3>
                      </Row>
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        <Col md={6}>
                          <ShippingReturnPolicy Product={product} />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                </details>

                <details className="group py-8 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer">
                    <h2 className="text-lg font-medium text-gray-900">
                      Additional Details
                    </h2>

                    <span className="relative ml-1.5 h-5 w-5 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </summary>

                  {!product.productImportantInformation ? (
                    <h1 className="text-1xl mt-3 font-medium">
                      No Important Product Information Available At The Moment
                    </h1>
                  ) : (
                    <>
                      <h6 className="mb-3 font-medium mt-2">
                        Product Important Information:
                      </h6>
                      <ProductInformation Product={product} />
                    </>
                  )}

                  {!product.productVideo ? (
                    <h1 className="text-1xl mt-3 mb-3 font-medium">
                      No Product Video Available At The Moment
                    </h1>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        onClick={handleShow}
                        className="btn btn-block bg-black hover:bg-gray-800 mt-2 mb-2"
                      >
                        Open Product Video
                      </Button>

                      <Modal
                        show={show}
                        onHide={handleClose}
                        keyboard={false}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Product Video</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <iframe
                            width="100%"
                            height="250px"
                            src={product.productVideo}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="primary"
                            className="btn btn-block bg-black hover:bg-gray-800 mt-2 mb-2"
                            onClick={handleClose}
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  )}

                  {!product.productTutorial ? (
                    <h1 className="text-1xl mt-3 mb-3 font-medium">
                      No Important Product Tutorial Available At The Moment
                    </h1>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        onClick={handleShow}
                        className="btn btn-block bg-black hover:bg-gray-800 mt-2 mb-2"
                      >
                        Open Product Tutorial
                      </Button>

                      <Modal
                        show={show}
                        onHide={handleClose}
                        keyboard={false}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Product Tutorial</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <iframe
                            width="100%"
                            height="250px"
                            src={product.productTutorial}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="primary"
                            className="btn btn-block bg-black hover:bg-gray-800 mt-2 mb-2"
                            onClick={handleClose}
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  )}
                </details>
              </div>
            </div>

            <Row
              className="
          mt-3 bg-slate-50 rounded-md p-3"
            >
              <Col md={6}>
                <h2 className="font-medium font-sans text-[2em] mt-2">
                  Reviews
                </h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <div className="flex mt-3 reviews">
                  <div className="left-rev">
                    <h2 className="font-semibold mb-3">
                      Write a Product Review
                    </h2>
                    {loadingProductReview && <Loader />}
                    {loadingProductReviewDelete && <Loader />}
                    {errorProductReview && (
                      <>
                        <Message variant="danger">{errorProductReview}</Message>
                        <Message variant="danger">
                          {errorProductReviewDelete}
                        </Message>
                      </>
                    )}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - ⭐️ Poorly </option>
                            <option value="2">2 - ⭐️⭐️ Fair </option>
                            <option value="3">3 - ⭐️⭐️⭐️ Good </option>
                            <option value="4">
                              4 - ⭐️⭐️⭐️⭐️ Very Good{" "}
                            </option>
                            <option value="5">
                              5 - ⭐️⭐️⭐️⭐️⭐️ Excellent{" "}
                            </option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingProductReview}
                          type="submit"
                          className="bg-black w-full hover:bg-slate-700"
                        >
                          Submit Your Review
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review{" "}
                      </Message>
                    )}
                  </div>
                  <div className="right-rev">
                    {product.reviews.map((review) => (
                      <>
                        <div
                          key={review._id}
                          className="w-full revcard bg-slate-200 p-4 rounded rev-item"
                        >
                          {review.profileImage && (
                            <div className="left-rev-item">
                              <img
                                src={review.profileImage}
                                className="card-img-top"
                                alt="..."
                              />
                            </div>
                          )}
                          <div className="right-rev-item">
                            <strong className="font-bold mb-1 text-[1.1em]">
                              {review.name}
                            </strong>
                            <Rating value={review.rating} className="mb-1" />
                            <p className="mb-1">
                              {review.createdAt.substring(0, 10)}
                            </p>
                            <p className="mt-2 mb-1 font-medium text-[1.15em]">
                              {review.comment}
                            </p>
                            {/* {userInfo.isAdmin === true(
                            <Button
                              className="btn w-full bg-red-800 btn-block"
                              onClick={deleteReviewHandler(review._id)}
                              variant="danger"
                            >
                              <i className="fas fa-trash"></i> Delete Comment
                            </Button>
                          )} */}
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </React.Fragment>
    </>
  );
};

export default ProductScreen;
