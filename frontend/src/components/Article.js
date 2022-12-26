import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const Article = ({ article }) => {
  return (
    <div className="Product-Card rounded-md bg-slate-50 flex">
      <Link to={`/article/${article._id}`}>
        <Image src={article.image} fluid />
      </Link>
      <div className="Product-Card-Body">
        <Link to={`/article/${article._id}`}>
          <p className="font-bold text-[1.7em] font-sans uppercase mb-[.5em]">
            {article.name}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Article;
