const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
  it("Requires a user name", () => {
    const user = new User({ name: undefined });
    const ValidationResult = user.validateSync();
    const { message } = ValidationResult.errors.name;
    assert(message === "User name is require.");
    /*
    user.valiate(validationResult=>{});
    est la version asynchrone on peut donc lui passé un callback
    */
  });
  it("Requires a user name longer than 2", () => {
    //
  });
});
