const express = require("express");
const Item = require("../models/item.model");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// @route   GET api/items
// @desc    Return all items
// @access  public
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    if (items.length > 0) {
      res.json(items);
    } else {
      res.json({ msg: "No items found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/items/item_id
// @desc    Return an item
// @access  public
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.json({ msg: "No item found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/items/item_id
// @desc    Delete an item
// @access  public
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findByIdAndDelete(id);
    res.json({ msg: "Item deleted", data: item });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/items/item_id
// @desc    Update an item
// @access  public
router.put(
  "/:id",
  [
    check("type", "Type is required").not().isEmpty(),
    check("brand", "Brand is required").not().isEmpty(),
    check("model", "Model is required").not().isEmpty(),
    check("size", "Size is required").not().isEmpty(),
    check("qty", "Qty is required").not().isEmpty(),
    check("buyPrice", "Buy Price is required").not().isEmpty(),
    check("buyDate", "Buy date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const item = await Item.findById(req.params.id)
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
  }
);

// @route   POST api/items/
// @desc    Create a new item
// @access  public
router.post(
  "/",
  [
    check("type", "Type is required").not().isEmpty(),
    check("brand", "Brand is required").not().isEmpty(),
    check("model", "Model is required").not().isEmpty(),
    check("size", "Size is required").not().isEmpty(),
    check("qty", "Qty is required").not().isEmpty(),
    check("buyPrice", "Buy Price is required").not().isEmpty(),
    check("buyDate", "Buy date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
  }
);

module.exports = router;
