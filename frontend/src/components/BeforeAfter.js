/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const BeforeAfter = () => {
  return (
    <>
      <div className="p-5 mb-2">
        <h1 className=" text-black text-3xl font-extrabold tracking-tight leading-none  mb-2 ">
          A Sneak Peak On What We Can Do
        </h1>
        <img-comparison-slider hover="hover" tabindex="0" class="rendered">
          <img
            slot="first"
            width="100%"
            loading="lazy"
            src="https://res.cloudinary.com/cduoshop/image/upload/v1677586920/EmptyComplete_gwaen6.png"
          />
          <img
            slot="second"
            width="100%"
            loading="lazy"
            src="https://res.cloudinary.com/cduoshop/image/upload/v1677586928/Completed_m0bezd.png"
          />
        </img-comparison-slider>
      </div>
    </>
  );
};

export default BeforeAfter;
