const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// signin
const SignUpUser = async (req, res) => {
  console.log("Signup request received:", req.body);
  const { email, password } = req.body;

  try {
    console.log("Attempting to create user with email:", email);
    const user = await UserModel.signin(email, password);
    console.log("User created successfully:", user);

    const token = createToken(user._id);
    console.log("Token created successfully");

    res.status(200).json({ email, token });
  } catch (error) {
    console.error("Signup error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({
      message: "An error occurred during signup",
      details: error.message,
    });
  }
};

module.exports = { loginUser, SignUpUser };
