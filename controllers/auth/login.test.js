const { login } = require("./auth");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

describe("login", () => {
  const req = {
    body: { password: "password" },
    user: { password: "password", _id: "123" },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    token: jest.fn().mockReturnThis(),
    user: {
      email: "example@mail.com",
      subscription: "pro",
    },
  };
  const next = jest.fn();

  jest.spyOn(User, "findByIdAndUpdate").mockResolvedValueOnce();

  const jwtSpy = jest.spyOn(jwt, "sign").mockReturnValueOnce("token");

  const bcryptCompareSpy = jest
    .spyOn(bcrypt, "compare")
    .mockImplementationOnce((password, userPassword, callback) => {
      callback(null, true);
    });

  login(req, res, next);

  test("res.status === 200", () => {
    expect(res.status).toHaveBeenCalledWith(200);

    jwtSpy.mockRestore();
    bcryptCompareSpy.mockRestore();
    User.findByIdAndUpdate.mockRestore();
  });

  test("In response should be token ", async () => {
    expect(res).toHaveProperty("token");
  });
  test(`In response should be user(object) with 2 fields: email, subscription with STRING data-type.`, async () => {
    expect(res).toHaveProperty("user");
    expect(typeof res.user).toBe("object");

    expect(res.user).toHaveProperty("email");
    expect(typeof res.user.email).toBe("string");

    expect(res.user).toHaveProperty("subscription");
    expect(typeof res.user.subscription).toBe("string");
  });
});
