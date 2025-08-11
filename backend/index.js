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
  saveUninitialized: false, // Changed to false for better security
  cookie:{
    expires: Date.now() + 7* 24* 60* 60* 1000,
    maxAge: 7* 24* 60* 60* 1000,
    httpOnly: true,
    secure: false, // Set to false for localhost development
    sameSite: 'lax' // Changed from 'none' to 'lax' for localhost
  }
};
const frontend = process.env.VITE_FRONTEND_URL;
const dashboardurl = process.env.VITE_DASHBOARD_URL;

// CORS configuration with fallback for development and production
const allowedOrigins = [
  frontend,
  dashboardurl,
  'https://stockora-n8l5.vercel.app', // Current Vercel frontend/dashboard URL
  'https://stockora-t1rz.vercel.app', // Your Vercel frontend URL
  'https://stockora-9xwj.vercel.app', // Your dashboard URL
  'https://stockora.vercel.app', // Alternative Vercel URL
  'https://stockora-frontend.vercel.app', // Another possible Vercel URL
  'http://localhost:5173', // Local development
  'http://localhost:5174', // Local dashboard
  'http://localhost:3000', // Alternative local development
  'http://localhost:3001', // Another local development port
  'https://stockora-dashboard.vercel.app', // Dashboard URL
  'https://stockora-dashboard-t1rz.vercel.app', // Dashboard URL with subdomain
  // Add any additional Vercel domains that might be used
  'https://stockora-frontend-t1rz.vercel.app',
  'https://stockora-dashboard-frontend.vercel.app',
];

// Filter out undefined values
const validOrigins = allowedOrigins.filter(origin => origin);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('CORS: No origin provided, allowing request');
      return callback(null, true);
    }
    
    console.log('CORS request from origin:', origin);
    console.log('Allowed origins:', validOrigins);
    console.log('Environment variables - frontend:', frontend, 'dashboardurl:', dashboardurl);
    
    if (validOrigins.indexOf(origin) !== -1) {
      console.log('CORS allowed for origin:', origin);
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      console.log('This origin is not in the allowed list. Please add it to allowedOrigins array.');
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept']
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

// Middleware to check if user is authenticated
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Please log in first" });
  }
  next();
};

// Function to create dummy data for new users
const createDummyDataForUser = async (username) => {
    try {
        console.log(`Starting dummy data creation for user: ${username}`);
        
        // Check if user already has data
        const existingHoldings = await HoldingsModel.findOne({ username });
        if (existingHoldings) {
            console.log(`User ${username} already has data, skipping dummy data creation`);
            return;
        }
        
        // Dummy Holdings Data
        const dummyHoldings = [
            {
                name: "BHARTIARTL",
                qty: 2,
                avg: 538.05,
                price: 541.15,
                net: "+0.58%",
                day: "+2.99%",
                username: username,
            },
            {
                name: "HDFCBANK",
                qty: 2,
                avg: 1383.4,
                price: 1522.35,
                net: "+10.04%",
                day: "+0.11%",
                username: username,
            },
            {
                name: "HINDUNILVR",
                qty: 1,
                avg: 2335.85,
                price: 2417.4,
                net: "+3.49%",
                day: "+0.21%",
                username: username,
            },
            {
                name: "INFY",
                qty: 1,
                avg: 1350.5,
                price: 1555.45,
                net: "+15.18%",
                day: "-1.60%",
                isLoss: true,
                username: username,
            },
            {
                name: "ITC",
                qty: 5,
                avg: 202.0,
                price: 207.9,
                net: "+2.92%",
                day: "+0.80%",
                username: username,
            },
            {
                name: "KPITTECH",
                qty: 5,
                avg: 250.3,
                price: 266.45,
                net: "+6.45%",
                day: "+3.54%",
                username: username,
            },
            {
                name: "M&M",
                qty: 2,
                avg: 809.9,
                price: 779.8,
                net: "-3.72%",
                day: "-0.01%",
                isLoss: true,
                username: username,
            },
            {
                name: "RELIANCE",
                qty: 1,
                avg: 2193.7,
                price: 2112.4,
                net: "-3.71%",
                day: "+1.44%",
                username: username,
            },
            {
                name: "SBIN",
                qty: 4,
                avg: 324.35,
                price: 430.2,
                net: "+32.63%",
                day: "-0.34%",
                isLoss: true,
                username: username,
            },
            {
                name: "SGBMAY29",
                qty: 2,
                avg: 4727.0,
                price: 4719.0,
                net: "-0.17%",
                day: "+0.15%",
                username: username,
            },
            {
                name: "TATAPOWER",
                qty: 5,
                avg: 104.2,
                price: 124.15,
                net: "+19.15%",
                day: "-0.24%",
                isLoss: true,
                username: username,
            },
            {
                name: "TCS",
                qty: 1,
                avg: 3041.7,
                price: 3194.8,
                net: "+5.03%",
                day: "-0.25%",
                isLoss: true,
                username: username,
            },
            {
                name: "WIPRO",
                qty: 4,
                avg: 489.3,
                price: 577.75,
                net: "+18.08%",
                day: "+0.32%",
                username: username,
            },
        ];

        // Dummy Positions Data
        const dummyPositions = [
            {
                product: "CNC",
                name: "EVEREADY",
                qty: 2,
                avg: 316.27,
                price: 312.35,
                net: "+0.58%",
                day: "-1.24%",
                isLoss: true,
                username: username,
            },
            {
                product: "CNC",
                name: "JUBLFOOD",
                qty: 1,
                avg: 3124.75,
                price: 3082.65,
                net: "+10.04%",
                day: "-1.35%",
                isLoss: true,
                username: username,
            },
        ];

        // Create dummy holdings
        const createdHoldings = await HoldingsModel.insertMany(dummyHoldings);
        console.log(`Created ${createdHoldings.length} dummy holdings for user: ${username}`);

        // Create dummy positions
        const createdPositions = await PositionsModel.insertMany(dummyPositions);
        console.log(`Created ${createdPositions.length} dummy positions for user: ${username}`);

        console.log(`Successfully created all dummy data for user: ${username}`);
        
    } catch (error) {
        console.error(`Error creating dummy data for user ${username}:`, error);
        throw error; // Re-throw so registration can handle it
    }
};

// Updated routes with user-based filtering
app.get("/allholdings", isLoggedIn, async(req, res) => {
    try {
        const username = req.user.username;
        let allholdings = await HoldingsModel.find({ username });
        res.json(allholdings);
    } catch (error) {
        console.error("Error fetching holdings:", error);
        res.status(500).json({ error: "Failed to fetch holdings" });
    }
});

app.get("/allpositions", isLoggedIn, async(req, res) => {
    try {
        const username = req.user.username;
        let allpositions = await PositionsModel.find({ username });
        res.json(allpositions);
    } catch (error) {
        console.error("Error fetching positions:", error);
        res.status(500).json({ error: "Failed to fetch positions" });
    }
});

// Updated order creation to include username
app.post('/allorders', isLoggedIn, async (req, res) => {
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
            username: req.user.username // Add username to the order
        });
        
        const savedOrder = await newOrder.save();
        console.log('Order saved successfully:', savedOrder);
        res.status(201).json({ message: "Order saved successfully", order: savedOrder });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Failed to save order' });
    }
});

app.get("/orders", isLoggedIn, async (req, res) => {
    try {
        const username = req.user.username;
        let allorders = await OrdersModel.find({ username });
        res.json(allorders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// User registration route - updated to create dummy data
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    console.log('Registration attempt:', { username, email });
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already taken" });
    }
    
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    
    console.log('User registered successfully:', registeredUser.username);
    
    // Create dummy data for the new user
    try {
      await createDummyDataForUser(username);
      console.log('Dummy data created successfully for:', username);
    } catch (dummyError) {
      console.error('Error creating dummy data (non-critical):', dummyError);
      // Continue with registration even if dummy data fails
    }
    
    // Auto-login after registration
    req.login(registeredUser, (err) => {
      if (err) {
        console.error('Error during auto-login:', err);
        return res.status(500).json({ error: "Error during login after registration" });
      }
      return res.status(201).json({ 
        message: "Registration successful", 
        user: { id: registeredUser._id, username: registeredUser.username, email: registeredUser.email }
      });
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed: " + error.message });
  }
});

// User login route
app.post("/login", (req, res, next) => {
  console.log('Login attempt received:', {
    username: req.body.username,
    email: req.body.email,
    hasPassword: !!req.body.password,
    body: req.body
  });
  
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error('Passport authentication error:', err);
      return res.status(500).json({ error: "Authentication error: " + err.message });
    }
    
    if (!user) {
      console.log('Login failed - no user found or invalid credentials. Info:', info);
      return res.status(401).json({ error: "Invalid username or password" });
    }
    
    req.logIn(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: "Login error: " + err.message });
      }
      
      console.log('Login successful for user:', user.username);
      res.json({ 
        message: "Login successful", 
        user: { id: user._id, username: user.username, email: user.email }
      });
    });
  })(req, res, next);
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

// Test route to check CORS
app.get("/test-cors", (req, res) => {
  res.json({ 
    message: "CORS test successful",
    timestamp: new Date().toISOString(),
    origin: req.headers.origin,
    allowedOrigins: validOrigins
  });
});

// Debug route to check server status
app.get("/health", (req, res) => {
  res.json({ 
    status: "Server is running",
    timestamp: new Date().toISOString(),
    cors: {
      allowedOrigins: validOrigins,
      frontend: frontend,
      dashboardurl: dashboardurl
    }
  });
});

// Debug route to check users in database
app.get("/debug/users", async (req, res) => {
  try {
    const users = await User.find({}, { username: 1, email: 1, _id: 1 });
    res.json({ 
      userCount: users.length,
      users: users.map(u => ({ id: u._id, username: u.username, email: u.email }))
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
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