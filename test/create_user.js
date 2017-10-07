const User = require("../src/user");
const assert = require("assert");

describe("Should create user in datatabase", () => {
  it("Save a user", done => {
    const joe = new User({ name: "joe" });

    joe.save().then(() => {
      //Code qui s'éxécute une fois le save terminé.

      assert(!joe.isNew);

      // Attendre la fin de la sauvegarde et le assert avant de passé au test suivant
      done();
    });
  });
});
