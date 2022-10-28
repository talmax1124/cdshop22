import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="Product-Card rounded-md bg-slate-50 flex">
      <Link to={`/product/${product._id}`}>
        <Image src={product.image} fluid />
      </Link>
      <div className="Product-Card-Body">
        <Link to={`/product/${product._id}`}>
          <p className="font-bold text-[1.7em] font-sans uppercase mb-[.5em]">
            {product.name}
          </p>
        </Link>
        {product.onSalePrice > 0 ? (
          <p className="bg-emerald-100 text-emerald-800 text-md font-semibold px-2.5 py-0.5 mb-2 rounded  w-fit ">
            On-Sale
          </p>
        ) : (
          <></>
        )}
        <div className="flex">
          <Rating value={product.rating} />
          <p className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
            {product.numReviews}
          </p>
        </div>
        {product.onSalePrice > 0.25 ? (
          <>
            <div className="flex">
              <p className="font-bold text-[2em] mt-3 mr-3">${product.price}</p>
              <p className="font-bold text-[1.9em] mt-3 line-through text-red-500 opacity-[50%]">
                ${product.onSalePrice}
              </p>
            </div>
          </>
        ) : (
          <p className="font-bold text-[2em] mt-3">${product.price}</p>
        )}
      </div>
    </div>
  );
};

export default Product;
