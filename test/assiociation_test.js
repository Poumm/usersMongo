const mongoose = require("mongoose");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Association", () => {
  let jojo, blogPost, comment;
  beforeEach(done => {
    jojo = new User({ name: "Jojo" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Because, that's all."
    });
    comment = new Comment({ content: "Are you kidding me ?!" });

    jojo.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = jojo;

    Promise.all([jojo.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it("save a relation between a user and a blogpost", done => {
    User.findOne({ name: "Jojo" }).then(user => {
      console.log(user);
      done();
    });
  });
});
