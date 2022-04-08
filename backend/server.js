const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;
const uri = process.env.URI;

app.use(cors());
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const userRouter = require("./routes/users");
const itemRouter = require("./routes/items");

app.use("/users", userRouter);
app.use("/items", itemRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
