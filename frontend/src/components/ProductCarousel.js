import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
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
    <div className="flex justify-between top-products">
      {products.map((product) => (
        <div key={product._id} className="bg-slate-100 mr-2 ml-2 p-3 top-card">
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <p>
              <h2 className="font-bold mt-3 mb-">{product.name}</h2>

              <h2 className="font-medium mt-1">$ {product.price}</h2>
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductCarousel;
