import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";

const ShippingOptionsList = () => {
  // const [rates, setRates] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("api/rates")
  //     .then((response) => {
  //       setRates(response.data.rates);
  //       console.log(response.data.rates);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <div>
      {/* {rates.map((rate) => (
        <div key={rate.id}>
          <p>Service: {rate.service}</p>
          <p>Rate: {rate.rate}</p>
          <p>Estimated Delivery Date: {rate.est_delivery_date}</p>
          <hr />
        </div>
      ))} */}
    </div>
  );
};

export default ShippingOptionsList;
