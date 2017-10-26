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
//Utiliser le nom function et non une flèche obèse pour avoir le this à l'intérieur de la fonction
UserSchema.virtual("postCount").get(function() {
  return this.posts.length;
});

//Tous les middleware sont appelé avec une fonction next() qui fonctionne basiquement comme done()
UserSchema.pre("remove", function(next) {
  //charger blogpost de cette manière permet de ne le faire que l'orsque la méthode est appelée.
  //de cette manière on évite les problème de chargements cycliques.
  const BlogPost = mongoose.model("blogPost");

  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => {
    next();
  });
});

//Le nom de model utiliser pour être chargé dans un autre model (comme blogpost plus haut) ou dans les requête de populate
const user = mongoose.model("user", UserSchema);

module.exports = user;
