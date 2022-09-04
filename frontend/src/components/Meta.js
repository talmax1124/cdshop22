import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
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
      <meta
        name="twitter:image"
        content="https://i.ibb.co/0jM83MR/Asset-5.png"
      />

      <meta property="og:url" content="https://creativeduo.net" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Creative Duo LLC" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://i.ibb.co/0jM83MR/Asset-5.png"
      ></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To Creative Duo LLC | Small Business",
  description: "We sell custom made products!",
  keywords: "custom, handmade, small business",
};

export default Meta;
