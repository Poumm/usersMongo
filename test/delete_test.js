const assert = require("assert");
const User = require("../src/user");

describe("deleting a user", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => {
      done();
    });
  });

  it("model instance remove", done => {
    //La méthode la plus pratique lorsque l'on  déjà Joe
    joe.remove().then(() => {
      User.findOne({ name: "Joe" }).then(user => {
        assert(user === null);
        done();
      });
    });
  });

  it("Class method remove", () => {});

  it("Class method findAndRemove", () => {});

  it("Class method findByIdAndRemove", () => {});
});
