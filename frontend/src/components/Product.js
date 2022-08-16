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
        <div className="flex">
          <Rating value={product.rating} />
          <p className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ">
            {product.numReviews}
          </p>
        </div>
        <p className="font-bold text-2xl mt-3">${product.price}</p>
        {/* <div className="colors">{product.colors.map((color,index)=>{
          return(
            <button
            key={index}
            style={{ background: color }}
            className="color-btn "
          >{color.name}</button>

          

          )
        })}</div> */}
      </div>
    </div>

    // <Card className='my-3 p-3 rounded'>
    //   <Link to={`/product/${product._id}`}>
    //     <Card.Img src={product.image} variant='top' />
    //   </Link>

    //   <Card.Body>
    //     <Link to={`/product/${product._id}`}>
    //       <Card.Title as='div'>
    //         <strong>{product.name}</strong>
    //       </Card.Title>
    //     </Link>

    //     <Card.Text as='div'>
    //       <Rating
    //         value={product.rating}
    //         text={`${product.numReviews} reviews`}
    //       />
    //     </Card.Text>

    //     <Card.Text as='h3'>${product.price}</Card.Text>
    //   </Card.Body>
    // </Card>
  );
};

export default Product;
