/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

const WhatWeDoCarousel = () => {
  return (
    <>
      <div className="wwd-card-container">
        <p className="text-[3em] font-extrabold font-sans mt-4 mb-3  uppercase">
          What We <span className="text-green-400">Do</span>
        </p>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                className="w-full"
                src="https://res.cloudinary.com/cduoshop/image/upload/v1679674426/Untitled_design-3_we7uhj.png"
                alt="Placeholder image"
              />
              <div className="p-4 bg-slate-100">
                <h3 className="text-xl font-extrabold mb-2">Physical</h3>
                <p className="text-gray-600 font-medium">
                  We can make anything plain to a customized physical reality
                  such as shirts, stickers, car magnets, and so much more.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                className="w-full"
                src="https://res.cloudinary.com/cduoshop/image/upload/v1679674426/Untitled_design-5_nr2mlp.png"
                alt="Placeholder image"
              />
              <div className="p-4 bg-slate-100">
                <h3 className="text-xl font-extrabold mb-2">Web/Tech</h3>
                <p className="text-gray-600 font-medium">
                  We can help create a online presence that can allow for a
                  better view of your brand. We also assist with any
                  technological endeavors.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                className="w-full"
                src="https://res.cloudinary.com/cduoshop/image/upload/v1679674427/Untitled_design-4_qrdm6x.png"
                alt="Placeholder image"
              />
              <div className="p-4 bg-slate-100">
                <h3 className="text-xl font-extrabold mb-2">Social Media</h3>
                <p className="text-gray-600 font-medium">
                  We can manage your social media to ensure YOU get the
                  recognition needed to grow your brand.
                  <br />
                  <br />
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                className="w-full"
                src="https://res.cloudinary.com/cduoshop/image/upload/v1679674427/Untitled_design-6_tzom1k.png"
                alt="Placeholder image"
              />
              <div className="p-4 bg-slate-100">
                <h3 className="text-xl font-extrabold mb-2">3D Printing / Laser</h3>
                <p className="text-gray-600 font-medium">
                  Need something 3D printed or laser engraved? We got you
                  covered with our high quality machines.
                  <br />
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatWeDoCarousel;
