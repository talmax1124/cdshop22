import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

const ProductCarousel = () => {
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
        <div className="flex justify-between top-products ">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-slate-100 mr-2 ml-2 p-3 top-card rounded-md"
            >
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <span>
                  <h2 className="font-bold mt-3 mb-">{product.name}</h2>

                  <h2 className="font-medium mt-1">$ {product.price}</h2>
                </span>
              </Link>
            </div>
          ))}
        </div>
        <Link to="/products">
          <Button className="text-black bg-slate-50   rounded-lg mb-3 mt-2 no-underline hover:no-underline">
            View All Products
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ProductCarousel;
