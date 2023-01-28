// Create a model with the name of the model and the schema and have it to be an array of objects so that each product can have multiple options

import mongoose from "mongoose";

const productOptionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const productOptionsModel = mongoose.model(
  "productOptions",
  productOptionsSchema
);

module.exports = productOptionsModel;
