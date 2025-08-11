// Temporary registration endpoint without dummy data
app.post("/register-simple", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    console.log('Simple registration attempt:', { username, email });
    
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
    
    console.log('User registered successfully (no dummy data):', registeredUser.username);
    
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
    console.error("Simple registration error:", error);
    res.status(500).json({ error: "Registration failed: " + error.message });
  }
});
