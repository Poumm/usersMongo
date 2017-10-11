const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "User name is require."]
  },
  postCount: Number
});

const user = mongoose.model("user", UserSchema);

module.exports = user;
