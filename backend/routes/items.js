const express = require("express");
const Item = require("../models/item.model");

const router = express.Router();

router.route("/").get((req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").get((req, res) => {
  Item.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json("Item deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      item.type = req.body.type;
      item.brand = req.body.brand;
      item.model = req.body.model;
      item.color = req.body.color;
      item.sex = req.body.sex;
      item.size = req.body.size;
      item.description = req.body.description;
      item.qty = Number(req.body.qty);
      item.buyFrom = req.body.buyFrom;
      item.buyPrice = Number(req.body.buyPrice);
      item.buyDate = Date.parse(req.body.buyDate);
      item.soldPrice = Number(req.body.soldPrice);
      item.soldDate = Date.parse(req.body.soldDate);

      item
        .save()
        .then(() => res.json("Item updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const type = req.body.type;
  const brand = req.body.brand;
  const model = req.body.model;
  const color = req.body.color;
  const sex = req.body.sex;
  const size = req.body.size;
  const description = req.body.description;
  const qty = Number(req.body.qty);
  const buyFrom = req.body.buyFrom;
  const buyPrice = Number(req.body.buyPrice);
  const buyDate = Date.parse(req.body.buyDate);
  const soldPrice = Number(req.body.soldPrice);
  const soldDate = Date.parse(req.body.soldDate);

  const newItem = new Item({
    type,
    brand,
    model,
    color,
    sex,
    size,
    description,
    qty,
    buyFrom,
    buyPrice,
    buyDate,
    soldPrice,
    soldDate,
  });

  newItem
    .save()
    .then(() => res.json("Item added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
