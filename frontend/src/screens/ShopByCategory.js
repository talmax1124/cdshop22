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

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1 className="font-bold text-3xl">{`Category : ${category}`}</h1>
          {products ? (
            <>
              <Link to="/products">
                <Button className="text-black bg-slate-50   rounded-lg mb-3 mt-2 no-underline hover:no-underline">
                  <i className="fas fa-arrow-left mr-1 text-[1.4em]"></i>
                  Go Back
                </Button>
              </Link>
              <br />
              <Row className="mb-3 pb-3">
                <br />
                <Col md={3} className="mb-3 mt-3">
                  <h6>Sort By:</h6>
                  <Sort products={products} />
                </Col>
              </Row>
              <Row>
                <div className="h-[3vh]"></div>
              </Row>
              <Row className="mt-3 mb-3 pt-4">
                {products.map((product) => (
                  <>
                    <Product product={product} />
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
