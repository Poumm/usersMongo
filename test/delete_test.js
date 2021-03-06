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

  it("Class method remove", done => {
    //Remove un ensemble de users selon certain critères
    User.remove({ name: "Joe" }).then(() => {
      User.findOne({ name: "Joe" }).then(user => {
        assert(user === null);
        done();
      });
    });
  });

  it("Class method findAndRemove", done => {
    //Remove un unique user selon certains critères
    User.findOneAndRemove({ name: "Joe" }).then(() => {
      User.findOne({ name: "Joe" }).then(user => {
        assert(user === null);
        done();
      });
    });
  });

  it("Class method findByIdAndRemove", done => {
    //Remove un unique user en fonction de son _id
    User.findByIdAndRemove(joe._id).then(() => {
      User.findOne({ name: "Joe" }).then(user => {
        assert(user === null);
        done();
      });
    });
  });
});
