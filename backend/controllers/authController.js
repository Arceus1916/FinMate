const User = require("../models/User");
const jwt = require("jsonwebtoken"); // fixed: incorrect import

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // fixed: "expireesIn" -> "expiresIn"
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" }); // fixed: "feilds" -> "fields"
  }

  try {
    const existingUser = await User.findOne({ email }); // fixed: FindOne -> findOne
    if (existingUser) {
      return res.status(401).json({ message: "Email already in use" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id), // fixed: generationToken -> generateToken
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email }); // fixed: FindOne -> findOne
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id), // fixed: tokens -> token
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in user", error: err.message }); // clarified error message
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // fixed: missing response
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message }); // clarified error message
  }
};
