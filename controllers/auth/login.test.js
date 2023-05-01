const { login } = require("./auth");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

describe("login", () => {
  const req = {
    body: { password: "password" },
    user: { password: "password", _id: "123" },
  };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();

  test("res.status === 200", async () => {
    jest.spyOn(User, "findByIdAndUpdate").mockResolvedValueOnce();

    const jwtSpy = jest.spyOn(jwt, "sign").mockReturnValueOnce("token");

    const bcryptCompareSpy = jest
      .spyOn(bcrypt, "compare")
      .mockImplementationOnce((password, userPassword, callback) => {
        callback(null, true);
      });

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);

    jwtSpy.mockRestore();
    bcryptCompareSpy.mockRestore();
    User.findByIdAndUpdate.mockRestore();
  });
  //   test("In response should be token and object(user) with 2 fields: email, subscription with STRING data-type.", () => {});
  //   test("", () => {});
});
