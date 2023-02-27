import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords, thumbnail }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
      <meta name="twitter:site" content="@creativeduo2020" />
      <meta name="twitter:creator" content="@creativeduo2020" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={thumbnail} />

      <meta property="og:url" content="https://creativeduo.net" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Creative Duo LLC" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Get product image and display it as the thumbnail preview when sending the link to a person via messages  */}

      <meta property="og:image" content={thumbnail} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To Creative Duo LLC | Small Business",
  description: "We sell custom made products!",
  keywords: "custom, handmade, small business, physical products",
  thumbnail:
    "https://i.etsystatic.com/isbl/a8336d/55684927/isbl_3360x840.55684927_jdhese5b.jpg?version=0",
};

export default Meta;
