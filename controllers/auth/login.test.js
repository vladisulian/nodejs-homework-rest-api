const { login } = require("./auth");

describe("login", () => {
  test("Status-code should be 200. ", async () => {
    const req = {
      body: { password: "password" },
      user: { password: "password" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn(); // ? заглушка

    await login(req, res, next);

    expect(res.status).toBe(200);
  });

  test("In response should be token and object(user) with 2 fields: email, subscription with STRING data-type.", () => {});
  test("", () => {});
});
