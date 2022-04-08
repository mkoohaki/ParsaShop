const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    type: {
      type: String,
      reauired: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    salt: {
      type: String,
    },
    hashedPassword: {
      type: Object,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
