const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = require("./post");

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: "Name must be longer than two characters."
    },
    required: [true, "User name is require."]
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{ type: Schema.Types.ObjectId, ref: "blogPost" }]
});

UserSchema.virtual("postCount").get(function() {
  return this.posts.length;
});

const user = mongoose.model("user", UserSchema);

module.exports = user;
