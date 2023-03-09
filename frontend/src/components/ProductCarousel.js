import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

const ProductCarousel = ({ match, history }) => {
  // Push 1 item to cartConstant

  const addToCartHandler = () => {
    // history.push(`/cart/${match.params.id}?qty=1`);
    console.log("Add to cart");
  };

  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <div className="p-5">
        <span>
          <p className="text-[2.3em] font-bold font-sans mt-4 text-black uppercase">
            Top Rated Products
          </p>
          <p className="font-medium text-[1.4em] mt-[-0.4em] mb-3">this week</p>
        </span>
        <div className="flex justify-between top-products mb-2 ">
          {products.map((product) => (
            <>
              <div
                key={product._id}
                className="bg-slate-100 mr-2 ml-2 top-card rounded-md"
              >
                <div className="p-3">
                  <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    <span>
                      <h2 className="font-bold mt-3 mb-">{product.name}</h2>

                      <h2 className="font-medium mt-1">$ {product.price}</h2>
                    </span>
                  </Link>
                </div>
                {/* Add to cart the product */}
                <Button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  style={{ borderRadius: "0 0 1em 1em" }}
                  className="w-full bg-slate-200 text-black font-medium hover:bg-slate-300 hover:text-black"
                >
                  Add To Cart
                </Button>
              </div>
            </>
          ))}
        </div>

        <Link to="/products">
          <Button className="bg-black">View All Products</Button>
        </Link>
      </div>
    </>
  );
};

export default ProductCarousel;
