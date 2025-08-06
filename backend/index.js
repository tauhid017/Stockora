const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// MIDDLEWARE FIRST
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3002;
const URL = process.env.MONGO_URL;
const { HoldingsModel } = require("./model/HoldingsModel.js");
const { PositionsModel } = require("./model/PositionsModel.js");
const { OrdersModel } = require("./model/OrdersModel.js");

async function startServer() {
  try {
    await mongoose.connect(URL);
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to DB", err);
    process.exit(1);
  }
}

startServer();

// IMPORT AND USE ROUTES AFTER MIDDLEWARE
const authRoute = require("./Routes/AuthRoute");
app.use("/", authRoute);

app.get("/allholdings", async (req, res) => {
    let allholdings = await HoldingsModel.find({});
    res.json(allholdings);
});

app.get("/allpositions", async (req, res) => {
    let allpositions = await PositionsModel.find({});
    res.json(allpositions);
});

app.post("/newOrder", async (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json({ error: "Missing required data" });
  }
  
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  await newOrder.save();
  res.json({ message: "Order saved!" });
});

app.get("/allorders", async (req, res) => {
    let orders = await OrdersModel.find({});
    res.json(orders);
});