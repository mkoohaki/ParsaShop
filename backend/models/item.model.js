const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    type: {
      type: String,
      reauired: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    color: {
      type: String,
    },
    sex: {
      type: String,
      required: true,
    },
    size: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
    },
    year: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    // date: {
    //   type: Date,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
