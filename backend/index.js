const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/Usermodel.js"); 
const session = require("express-session");

const sessionOptions = {
  secret: "mysupersecretkey", // replace with a strong secret or use process.env.SESSION_SECRET
  resave: false,
  saveUninitialized: true,
  cookies:{
    expires: Date.now() + 7* 24* 60* 60* 1000,
    maxAge: 7* 24* 60* 60* 1000,
    httpOnly: true,
  }
};

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Frontend URLs
  credentials: true // Allow cookies to be sent with requests
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3002;
const URL = process.env.MONGO_URL;
const { HoldingsModel } = require("./model/HoldingsModel.js");
const { PositionsModel } = require("./model/PositionsModel.js");
const { OrdersModel } = require("./model/OrdersModel.js");
async function startServer() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB connected");

    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to DB", err);
    process.exit(1);
  }
}

startServer();
app.use(session(sessionOptions));
// Route to insert holdings
// app.get("/addholdings", async (req, res) => {
//   try {
//     const tempdata = [
//       {
//         name: "BHARTIARTL",
//         qty: 2,
//         avg: 538.05,
//         price: 541.15,
//         net: "+0.58%",
//         day: "+2.99%",
//       },
//       {
//         name: "HDFCBANK",
//         qty: 2,
//         avg: 1383.4,
//         price: 1522.35,
//         net: "+10.04%",
//         day: "+0.11%",
//       },
//       {
//         name: "HINDUNILVR",
//         qty: 1,
//         avg: 2335.85,
//         price: 2417.4,
//         net: "+3.49%",
//         day: "+0.21%",
//       },
//       {
//         name: "INFY",
//         qty: 1,
//         avg: 1350.5,
//         price: 1555.45,
//         net: "+15.18%",
//         day: "-1.60%",
//         isLoss: true,
//       },
//       {
//         name: "ITC",
//         qty: 5,
//         avg: 202.0,
//         price: 207.9,
//         net: "+2.92%",
//         day: "+0.80%",
//       },
//       {
//         name: "KPITTECH",
//         qty: 5,
//         avg: 250.3,
//         price: 266.45,
//         net: "+6.45%",
//         day: "+3.54%",
//       },
//       {
//         name: "M&M",
//         qty: 2,
//         avg: 809.9,
//         price: 779.8,
//         net: "-3.72%",
//         day: "-0.01%",
//         isLoss: true,
//       },
//       {
//         name: "RELIANCE",
//         qty: 1,
//         avg: 2193.7,
//         price: 2112.4,
//         net: "-3.71%",
//         day: "+1.44%",
//       },
//       {
//         name: "SBIN",
//         qty: 4,
//         avg: 324.35,
//         price: 430.2,
//         net: "+32.63%",
//         day: "-0.34%",
//         isLoss: true,
//       },
//       {
//         name: "SGBMAY29",
//         qty: 2,
//         avg: 4727.0,
//         price: 4719.0,
//         net: "-0.17%",
//         day: "+0.15%",
//       },
//       {
//         name: "TATAPOWER",
//         qty: 5,
//         avg: 104.2,
//         price: 124.15,
//         net: "+19.15%",
//         day: "-0.24%",
//         isLoss: true,
//       },
//       {
//         name: "TCS",
//         qty: 1,
//         avg: 3041.7,
//         price: 3194.8,
//         net: "+5.03%",
//         day: "-0.25%",
//         isLoss: true,
//       },
//       {
//         name: "WIPRO",
//         qty: 4,
//         avg: 489.3,
//         price: 577.75,
//         net: "+18.08%",
//         day: "+0.32%",
//       },
//     ];

//     await HoldingsModel.insertMany(tempdata);

//     res.send("Holdings data is saved");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error saving holdings");
//   }
// });

// app.get("/addpositions", async (req, res) => {
//   try {
//     const temppositions = [
//       {
//         product: "CNC",
//         name: "EVEREADY",
//         qty: 2,
//         avg: 316.27,
//         price: 312.35,
//         net: "+0.58%",
//         day: "-1.24%",
//         isLoss: true,
//       },
//       {
//         product: "CNC",
//         name: "JUBLFOOD",
//         qty: 1,
//         avg: 3124.75,
//         price: 3082.65,
//         net: "+10.04%",
//         day: "-1.35%",
//         isLoss: true,
//       },
//     ];
//     await PositionsModel.insertMany(temppositions);
//     res.send("psoitions data saved");
//   } catch (er) {
//     res.send(er);
//   }
// });

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/allholdings", async(req,res)=>{
    let allholdings = await HoldingsModel.find({});
    res.json(allholdings);

})
app.get("/allpositions", async(req,res)=>{
    let allpositions = await PositionsModel.find({});
    res.json(allpositions);

})
app.post('/allorders', async (req, res) => {
  try {
    console.log('Received order data:', req.body);
    
    if (!req.body.name || !req.body.qty || !req.body.price || !req.body.mode) {
      console.error('Missing required fields in request body');
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });
    
    const savedOrder = await newOrder.save();
    console.log('Order saved successfully:', savedOrder);
    res.status(201).json({ message: "Order saved successfully", order: savedOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to save order' });
  }
})

app.get("/orders",async (req,res)=>{
  let allorders = await OrdersModel.find({});
  res.json(allorders);
})

// User registration route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    
    // Auto-login after registration
    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error during login after registration" });
      }
      return res.status(201).json({ 
        message: "Registration successful", 
        user: { id: registeredUser._id, username: registeredUser.username, email: registeredUser.email }
      });
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// User login route
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ 
    message: "Login successful", 
    user: { id: req.user._id, username: req.user.username, email: req.user.email }
  });
});

// User logout route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Error during logout" });
    }
    res.json({ message: "Logout successful" });
  });
});

// Check if user is authenticated
app.get("/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ 
      isAuthenticated: true, 
      user: { id: req.user._id, username: req.user.username, email: req.user.email }
    });
  }
  res.json({ isAuthenticated: false });
});