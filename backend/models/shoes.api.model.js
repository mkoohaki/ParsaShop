const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shoesSchema = new Schema({
  brand: {
    type: String,
    require: true,
  },
  model: {
    type: String,
  },
  img: {
    type: String,
    reauired: true,
  },
  url: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
});

const Shoes = mongoose.model("Shoes", shoesSchema);

module.exports = Shoes;
