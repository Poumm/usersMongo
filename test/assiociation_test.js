const mongoose = require("mongoose");
const assert = require("assert");

const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Association", () => {
  let jojo, blogPost, comment;
  beforeEach(done => {
    jojo = new User({ name: "Jojo" });
    blogPost = new BlogPost({
      title: "Great",
      content: "Ora ora ora ora ora"
    });
    comment = new Comment({ content: "Nani ?!" });

    jojo.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = jojo;

    Promise.all([jojo.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it("save a relation between a user and a blogpost", done => {
    //Blogpost doit être éxactement le même nom que celui utilisé dans le user schéma
    User.findOne({ name: "Jojo" })
      .populate("blogPosts")
      .then(user => {
        assert(user.blogPosts[0].title === "Great");
        done();
      });
  });

  it("Save a full relation tree", done => {
    //le path correspond au nom tel qu'il est ecrit dans le schéma parent (comments: cf BlogPostSchema dans blogpost.js)
    //le model correspond au nom tel qu'il est écrit dans l'export du schéma lui même (comment:cf export dans comment.js)
    User.findOne({ name: "Jojo" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: { path: "user", model: "user" }
        }
      })
      .then(user => {
        assert(user.name === "Jojo");
        assert(user.blogPosts[0].title === "Great");
        assert(user.blogPosts[0].comments[0].content === "Nani ?!");
        assert(user.blogPosts[0].comments[0].user.name === "Jojo");
        done();
      });
  });
});
