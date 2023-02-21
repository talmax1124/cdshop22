import React from "react";
import { ToastContainer, toast } from "react-toastify";

export const ShippingRateSkeleton = () => {
  return (
    <>
      <div className="animate-pulse flex justify-between px-2 py-3 bg-slate-200 rounded-md mb-2">
        <div>
          <span className="shipping-title font-bold text-3xl"></span>
          <br />
          <span></span>
        </div>
        <div className="shippping-price font-medium text-2xl"></div>
      </div>
    </>
  );
};

const ShippingRate = ({ rate, onSelect }) => {
  return (
    <>
      <ToastContainer />
      <div
        className="flex justify-between px-2 py-3 bg-slate-200 rounded-md mb-2 hover:cursor-pointer hover:bg-slate-300 active:bg-slate-400 items-center"
        onClick={(e) => {
          onSelect(rate);
          toast.success("Shipping rate selected");
        }}
      >
        <div>
          <span className="shipping-title font-bold text-3xl">
            {rate.title}
          </span>
          <br />
          <span>{rate.description}</span>
        </div>
        <div className="shippping-price font-medium text-2xl">
          ${rate.amount}
        </div>
      </div>
    </>
  );
};

export default ShippingRate;
