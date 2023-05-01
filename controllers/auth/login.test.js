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
    token: "token",
    user: {
      email: "example@mail.com",
      subscription: "pro",
    },
  };
  const next = jest.fn();

  jest.spyOn(User, "findByIdAndUpdate").mockResolvedValueOnce(); // add spy to method in User model

  const jwtSpy = jest.spyOn(jwt, "sign").mockReturnValueOnce("token"); // add spy to function in jwt

  const bcryptCompareSpy = jest
    .spyOn(bcrypt, "compare") // add spy to compare function in bcrypt
    .mockImplementationOnce((password, userPassword, callback) => {
      // add fake args to function
      callback(null, true);
    });

  login(req, res, next); // use function

  test("res.status === 200", () => {
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("In response should be token ", async () => {
    expect(res).toHaveProperty("token");
    expect(typeof res.token).toBe("string");
  });

  test(`In response should be user(object) with 2 fields: email, subscription with STRING data-type.`, async () => {
    expect(res).toHaveProperty("user");
    expect(typeof res.user).toBe("object");

    expect(res.user).toHaveProperty("email");
    expect(typeof res.user.email).toBe("string");

    expect(res.user).toHaveProperty("subscription");
    expect(typeof res.user.subscription).toBe("string");

    jwtSpy.mockRestore();
    bcryptCompareSpy.mockRestore();
    User.findByIdAndUpdate.mockRestore();
  });
});
