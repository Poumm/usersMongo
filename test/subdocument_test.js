const User = require("../src/user");
const assert = require("assert");

describe("Subdocuments", () => {
  it("Can create a document", done => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "post title" }, { title: "post title 2 is back" }]
    });
    joe.save().then(user => {
      assert(user.posts.length === 2);
      assert(user.posts[0].title === "post title");
      done();
    });
  });

  it("Can add subdocuments to an existing record", done => {
    const joe = new User({ name: "Joe" });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        user.posts.push({ title: "New post" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then(userWithPost => {
        assert(userWithPost.posts[0].title === "New post");
        done();
      });
  });

  it("Can remove an existing subdocument", done => {
    const joe = new User({ name: "Joe", posts: [{ title: "new title" }] });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
