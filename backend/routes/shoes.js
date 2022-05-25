const express = require("express");
const Shoes = require("../models/shoes.api.model");
const axios = require("axios");

const router = express.Router();

// @route   POST api/shoes/nike
// @desc    Add Nike api to shoes model
// @access  Private
router.post("/nike", async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://nike-products.p.rapidapi.com/shoes",
      headers: {
        "X-RapidAPI-Host": "nike-products.p.rapidapi.com",
        "X-RapidAPI-Key": "bd87553e08msh7ea13b53067a43bp13e387jsnab2bb69e0124",
      },
    };

    const shoes = await axios.request(options);

    // console.log(shoess);
    for (var shoe in shoes.data) {
      const brand = "Nike";
      const model = shoes.data[shoe].title;
      const img = shoes.data[shoe].img;
      const url = shoes.data[shoe].url;
      const sex = shoes.data[shoe].source;

      const newShoe = new Shoes({
        brand,
        model,
        img,
        url,
        sex,
      });
      await newShoe
        .save()
        .then(() => res.jason("Done"))
        .catch((err) => res.status(400).json({ errors: err }));
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
