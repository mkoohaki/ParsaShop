const express = require("express");
const crypto = require("crypto");

const User = require("../models/user.model");

const router = express.Router();

let SALT_LENGTH = 16;

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  const type = req.body.type;
  const email = req.body.email;
  const password = req.body.password;

  if (validateEmail(email)) {
    if (validatePassword(password)) {
      let salt = crypto
        .randomBytes(Math.ceil(SALT_LENGTH / 2))
        .toString("hex")
        .slice(0, SALT_LENGTH);
      let hashedPassword = hasher(password, salt);

      const newUser = new User({ type, email, salt, hashedPassword });

      newUser
        .save()
        .then(() => res.json("User added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } else {
      res.status(400).json("Not valid password");
    }
  } else {
    res.status(400).json("Not valid email");
  }
});

function hasher(password, salt) {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  let value = hash.digest("hex");
  return value;
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password) => {
  var decimal =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  if (password.match(decimal)) {
    return password;
  }
};

module.exports = router;
