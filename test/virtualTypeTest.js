const assert = require("assert");
const User = require("../src/user");

describe("Virtual types", () => {
  it("make sure that postCount return the number of posts", done => {
    const Jojo = new User({ name: "Jojo", posts: [{ title: "adventure" }] });
    Jojo.save()
      .then(() => User.findOne({ name: "Jojo" }))
      .then(user => {
        assert(user.postCount === 1);
        done();
      });
  });
});
