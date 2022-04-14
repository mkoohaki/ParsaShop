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
    qty: {
      type: Number,
      required: true,
    },
    buyFrom: {
      type: String,
    },
    buyPrice: {
      type: Number,
      required: true,
    },
    buyDate: {
      type: Date,
      required: true,
    },
    soldPrice: {
      type: Number,
    },
    soldDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
