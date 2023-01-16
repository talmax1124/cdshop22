import React from "react";
import { ToastContainer, toast } from "react-toastify";

const ShippingRate = ({ rate, onSelect }) => {
  return (
    <>
      <ToastContainer />
      <div
        className="flex justify-between px-2 py-3 bg-slate-200 rounded-md mb-2 hover:cursor-pointer hover:bg-slate-300 active:bg-slate-600"
        onClick={(e) => {
          onSelect(rate);
          toast.success("Shipping rate selected");
        }}
      >
        <div className="shipping-title font-bold text-3xl">{rate.title}</div>
        <div className="shippping-price font-medium text-2xl">
          ${rate.amount}
        </div>
      </div>
    </>
  );
};

export default ShippingRate;
