const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
  it("Requires a user name", () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "User name is require.");
    /*
    user.valiate(validationResult=>{});
    est la version asynchrone on peut donc lui passé un callback
    */
  });

  it("Requires a user's name longer than two characters", () => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "Name must be longer than two characters.");
  });

  it("disalows invalid records from being saved", done => {
    const user = new User({ name: "Al" });
    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name;

      assert(message === "Name must be longer than two characters.");
      done();
    });
  });
});
