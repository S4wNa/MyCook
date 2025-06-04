const UserModel = require("../models/UserModel");
const loginUser = async (req, res) => {};

const SignInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.signin(email, password);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { loginUser, SignInUser };
