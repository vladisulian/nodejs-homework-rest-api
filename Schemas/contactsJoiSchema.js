const Joi = require("joi");
require("colors");

function joiValidate(req, res, next) {
  const contactsSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\+?[0-9]{7,14}$/),

    favorite: Joi.boolean(),
  });

  const { error } = contactsSchema.validate(req.body);
  if (error) {
    console.error(`Error: ${error.message}`.red);
    res
      .status(400)
      .json({ message: `Missing fields: ${error.details[0].path[0]}` })
      .end();
    return;
  }

  next();
}

module.exports = {
  joiValidate,
};
