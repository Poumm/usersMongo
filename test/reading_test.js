const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of datatabase", () => {
  let joe, maria, alex, zach;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    alex = new User({ name: "Alex" });
    maria = new User({ name: "Maria" });
    zach = new User({ name: "Zach" });

    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()]).then(() =>
      done()
    );
  });

  it("Find all users with a name of Joe", done => {
    User.find({ name: "Joe" }).then(users => {
      //Le _id n'est pas juste le string de référence mais un objet qui le contient
      //Par conséquent users[0]._id === joe._id est faux
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("Find a particular user", done => {
    User.findOne({ _id: joe._id }).then(user => {
      assert(user.name === "Joe");
      done();
    });
  });

  // sort {name:1} signifie tri par nom ascnedant
  // sort {name:-1} signifie tri par nom descendant
  it("can skip and limit the result set", done => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === "Joe");
        assert(users[1].name === "Maria");
        done();
      });
  });
});
