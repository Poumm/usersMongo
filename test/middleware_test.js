const mongoose = require("mongoose");
const assert = require("assert");

const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
  let jojo, blogPost;
  beforeEach(done => {
    jojo = new User({ name: "Jojo" });
    blogPost = new BlogPost({
      title: "Great",
      content: "Ora ora ora ora ora"
    });

    jojo.blogPosts.push(blogPost);

    Promise.all([jojo.save(), blogPost.save()]).then(() => done());
  });

  it("user clean up dangling blogposts on remove", done => {
    BlogPost.count().then(count => {
      assert(count === 1);
      jojo
        .remove()
        .then(() => {
          BlogPost.count();
        })
        .then(count => {
          //Ici on test undefined car lorsqu'il y a 0 élément la base surpime carrément la collection
          assert(!count);
          done();
        });
    });
  });
});
