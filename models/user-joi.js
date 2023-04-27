const Joi = require("joi");
require("colors");

function joiUser(req, res, next) {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3),
    token: Joi.string(),
    subscription: Joi.string(),
  });

  const { error } = userSchema.validate(req.body);

  if (error) {
    console.error(`Joi Error: ${error}`.red);
    res.status(400).json({ message: error.message }).end();
    return;
  }

  next();
}

function joiSubscription(req, res, next) {
  const userSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });

  const { error } = userSchema.validate(req.body);

  if (error) {
    console.error(`Joi Error: ${error}`.red);
    res.status(400).json({ message: error.message }).end();
    return;
  }

  next();
}

module.exports = { joiUser, joiSubscription };
