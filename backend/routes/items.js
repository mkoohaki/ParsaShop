const express = require("express");
const Item = require("../models/item.model");

const router = express.Router();

// @route   GET api/items
// @desc    Return all items
// @access  public
router.route("/").get((req, res) => {
  try {
    Item.find()
      .then((items) => res.json(items))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/items/item_id
// @desc    Return an item
// @access  public
router.route("/:id").get((req, res) => {
  try {
    Item.findById(req.params.id)
      .then((item) => res.json(item))
      .catch((err) => res.json({ msg: "There is no item for this id" }));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/items/item_id
// @desc    Delete an item
// @access  public
router.route("/:id").delete((req, res) => {
  try {
    Item.findByIdAndDelete(req.params.id)
      .then(() => res.json({ msg: "Item deleted!" }))
      .catch((err) => res.json({ msg: "There is no item for this id" }));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/items/item_id
// @desc    Update an item
// @access  public
router.route("/:id").put((req, res) => {
  try {
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
      .catch((err) => res.json({ msg: "There is no item for this id" }));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/items/
// @desc    Create a new item
// @access  public
router.route("/").post((req, res) => {
  try {
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
      .then(() => res.json({ msg: "Item added!" }))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
