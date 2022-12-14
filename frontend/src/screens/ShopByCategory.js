import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Sort from "../components/Sort";

import { listProductByCategory } from "../actions/productActions";

/* /api/products/category/${cat} */

const HomeScreen = ({ match }) => {
  const category = match.params.category || "";

  const dispatch = useDispatch();

  const productCategory = useSelector((state) => state.productCategory);
  const { loading, error, products } = productCategory;

  useEffect(() => {
    dispatch(listProductByCategory(category));
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <Meta />
      <h1>{`Category : ${category}`}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products ? (
            <>
              <Link to="/">
                <Button className="btn btn-dark">
                  <i className="fas fa-arrow-left"></i> Go Back
                </Button>
                <br />
              </Link>
              <br />
              <Row>
                <br />
                <Col md={3}>
                  <h6>Sort By:</h6>
                  <Sort products={products} />
                </Col>
              </Row>
              <Row>
                {products.map((product) => (
                  <>
                    <Product product={product} />
                    <h1>p</h1>
                  </>
                ))}
              </Row>
            </>
          ) : (
            <h2>No products Found</h2>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
