/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import Testimonials from "../components/Testimonials";
import Hero from "../components/Hero";
import Map from "../components/Map";
// import About from "../components/About";
import WhatWeDoCarousel from "../components/WhatWeDoCarousel";
// import LatestProducts from "../components/LatestProducts";
// import ShopByCategory from "../components/ShopByCategory";
// import ShopByBrand from "../components/ShopByBrand";
import Sort from "../components/Sort";
import { Container } from "react-bootstrap";

const HomeScreen = ({ match, history, location }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // const now = new Date()
  //   .toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   })
  //   .toLowerCase();
  // console.log(now);

  return (
    <>
      <Meta />
      <Hero />
      {/* <ShopByCategory /> */}
      <span id="prod"></span>
      <WhatWeDoCarousel />
      <main className="py-3">
        <Container>
          {!keyword && pageNumber === 1 ? (
            <>
              <span>
                <p className="text-[2.3em] font-bold font-sans mt-4 text-black uppercase">
                  Top Rated Products
                </p>
                <p className="font-medium text-[1.4em] mt-[-0.4em] mb-3">
                  this week
                </p>
              </span>

              <ProductCarousel />
            </>
          ) : (
            <Link
              to="/"
              className="btn bg-black w-full text-white hover:bg-gray-700"
            >
              Go Back
            </Link>
          )}
          {/* <ShopByCategory products={products} /> */}
          <h1 className="text-[2em] font-bold font-sans mt-4 mb-4">
            Ready To Be <span className="text-green-600 font-extrabold">Customized</span> ...
          </h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Row>
                <Col md={3} className="mb-2">
                  <h6>Sort By:</h6>
                  <Sort products={products} pages={pages} page={page} />
                </Col>
              </Row>
              {products.map((product) => (
                <Row key={product._id} className="items-center justify-center">
                  <Product product={product} className="self-stretch mb-3" />
                </Row>
              ))}
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
              {/* <ShopByBrand products={products} /> */}
            </>
          )}
        </Container>
        {!keyword && pageNumber === 1 ? (
          <>
            <Map />
            {/* <About /> */}
            <Testimonials />
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default HomeScreen;
