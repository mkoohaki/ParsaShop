const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const config = require("config");
const port = config.get("PORT");

const app = express();
const PORT = port || 8000;

connectDB();
app.use(cors());
// Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/items", require("./routes/items"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
