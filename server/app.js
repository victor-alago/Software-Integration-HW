const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const itemRoutes = require("./routes/item.route"); // Ensure the route paths are correct

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/items', itemRoutes);

module.exports = app;