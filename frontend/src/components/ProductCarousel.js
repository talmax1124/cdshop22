import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCarousel = ({ match, history }) => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  // eslint-disable-next-line no-unused-vars
  const [qty, setQty] = useState(1);

  const { push } = useHistory();

  const addToCartHandler = (e, id) => {
    e.preventDefault();
    push(`/cart/${id}?qty=${qty}`);
    toast("Product added to cart");
  };

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
            <React.Fragment key={product._id}>
              <div
                className="bg-slate-100 mr-2 ml-2 top-card rounded-md"
                key={product._id}
              >
                <div className="p-3" key={`${product._id}-content`}>
                  <Link
                    to={`/product/${product._id}`}
                    key={`${product._id}-link`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      key={`${product._id}-image`}
                    />
                    <span key={`${product._id}-span`}>
                      <h2
                        className="font-bold mt-3 mb-"
                        key={`${product._id}-name`}
                      >
                        {product.name}
                      </h2>
                      <h2
                        className="font-medium mt-1"
                        key={`${product._id}-price`}
                      >
                        $ {product.price}
                      </h2>
                    </span>
                  </Link>
                </div>
                <Button
                  onClick={(e) => addToCartHandler(e, product._id)}
                  disabled={product.countInStock === 0}
                  style={{ borderRadius: "0 0 1em 1em" }}
                  value={1}
                  className="w-full bg-slate-200 text-black font-medium hover:bg-slate-300 hover:text-black"
                  key={`${product._id}-button`}
                >
                  Add To Cart
                </Button>
              </div>
            </React.Fragment>
          ))}
        </div>

        <Link to="/products">
          <Button className="bg-black rounded-md mt-2">
            View All Products
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ProductCarousel;
