import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
// import LatestProducts from "../components/LatestProducts";
import ShopByCat from "../components/ShopByCategory";
// import ShopByBrand from "../components/ShopByBrand";
import Sort from "../components/Sort";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Products = ({ match, history, location }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      <span id="prod"></span>
      <main className="py-3">
        <Container>
          {/* <ShopByCategory products={products} /> */}
          <h1 className="text-[2em] font-bold font-sans mt-4 mb-4">
            Product Ready To Be{" "}
            <span className="text-green-600 font-extrabold">Customized</span>{" "}
            ...
          </h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {/* Show this only if page 1 or in /products page */}

              {page === 1 && !keyword && (
                <div className="mt-4 mb-4 ">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 cat-cards-cont">
                    <div class="text-white bg-gray-800 p-8 rounded-lg shadow-lg cat-cards-1">
                      <h1 class="font-medium mb-1">Laser</h1>
                      <p class="text-base">
                        Accessories for your xTool & Monport Machine
                      </p>
                      <Link to="/category/Laser">
                        <Button className="btn bg-blue-600 hover:bg-blue-500">
                          Browse This Category
                        </Button>
                      </Link>
                    </div>
                    <div class="text-white bg-gray-800 p-8 rounded-lg shadow-lg cat-cards-2">
                      <h1 class="font-medium mb-1">Smart</h1>
                      <p class="text-base">
                        Products for Business & Social
                      </p>
                      <Link to="/category/Smart">
                        <Button className="btn bg-blue-600 hover:bg-blue-500">
                          Browse This Category
                        </Button>
                      </Link>
                    </div>
                    <div class="bg-gray-800 text-white p-8 rounded-lg shadow-lg cat-cards-3">
                      <h1 class="font-medium mb-1">3D</h1>
                      <p class="text-base">Modeled & Printed with precision</p>
                      <Link to="/category/3D">
                        <Button className="btn bg-blue-600 hover:bg-blue-500">
                          Browse This Category
                        </Button>
                      </Link>
                    </div>
                    <div class="bg-gray-800 text-white p-8 rounded-lg shadow-lg cat-cards-4">
                      <h1 class="font-medium mb-1">Other</h1>
                      <p class="text-base">
                        Amazing things that can be customized
                      </p>
                      <Link to="/category/Other">
                        <Button className="btn bg-blue-600 hover:bg-blue-500">Browse This Category</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <ShopByCat />
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
      </main>
    </>
  );
};

export default Products;
