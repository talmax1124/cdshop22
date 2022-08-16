import React from "react";

const Map = () => {
  return (
    <>
      <div className="p-5 mb-2">
        <h1 className=" text-black text-4xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-6xl mb-1 ">
          Orders Map
        </h1>
        <p className=" text-black text-[1.3em] font-medium tracking-tight leading-none font-serif mt-2">
          We want thank you for being part of our small business. Our goal is to
          fill the map by the end of 2022.
        </p>
        <p className=" text-black text-[1.3em] font-medium tracking-tight leading-none font-serif mt-2">
          For any order from a state not with a circle, will get a free random
          gift.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <img src="https://i.ibb.co/W2myh5S/map.png" alt="Map" width="80%" />
      </div>
    </>
  );
};

export default Map;
