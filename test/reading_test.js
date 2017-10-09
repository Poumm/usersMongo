const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of datatabase", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("Find all users with a name of Joe", done => {
    User.find({ name: "Joe" }).then(users => {
      //Le _id n'est pas juste le string de référence mais un objet qui le contient
      //Par conséquent users[0]._id === joe._id est faux
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });
});
