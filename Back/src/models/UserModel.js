const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");
const User = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

User.statics.signin = async function (email, password) {
  if (!email || !password) {
    throw Error("all field must be fille");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};
const UserModel = mongoose.model("User", User);
module.exports = UserModel;
