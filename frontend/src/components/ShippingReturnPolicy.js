import React, { useEffect } from "react";

const ShippingReturnPolicy = ({ Product }) => {
  useEffect(() => {
    const policy = document.querySelector(".shippingReturnPolicy");
    if (policy) {
      policy.innerHTML = Product.shippingReturnPolicy;
      let images = document.querySelectorAll(".shippingReturnPolicy img");
      if (images) {
        images.forEach((item) => {
          item.style.width = "100%";
        });
      }
    } else {
      console.log("Shipping Return Policy is not found");
    }
  }, [Product]);

  return <p className=" shippingReturnPolicy "></p>;
};

export default ShippingReturnPolicy;
