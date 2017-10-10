const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  postCount: Number
});

const user = mongoose.model("user", UserSchema);

module.exports = user;
