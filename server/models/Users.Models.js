const DB = require("mongoose");

const userSchema = new DB.Schema({
  username: String,
  email: String,
  password: String,
});

const User = DB.model("Accounts", userSchema);

module.exports = User;
