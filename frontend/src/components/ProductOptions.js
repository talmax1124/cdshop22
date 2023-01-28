import React, { useState } from "react";

const ProductOptions = ({ onOptions,options }) => {
//   const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const optionHandler = (e) => {
    e.preventDefault();
    // setOptions([...options, option]);
    setOption("");
    onOptions([...options, option]);
  };
  // Let me knnow when you are back
  return (
    <div>
      <h4>Product Optoins</h4>

      <div className="action mb-2 flex justify-between">
        <input
          type="text"
          value={option}
          className="px-5 py-1 rounded-md block bg-slate-100 placeholder:text-black "
          placeholder="optoin  here"
          onChange={(e) => setOption(e.target.value)}
        />
        <button onClick={optionHandler} className="p-3 bg-slate-300">
          Add
        </button>
      </div>
      <ul className="options" style={{ listStyle: "none" }}>
        {options.map((option, index) => {
          return <li>{option}</li>;
        })}
      </ul>
    </div>
  );
};

export default ProductOptions;
