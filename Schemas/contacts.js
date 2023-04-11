const Joi = require("joi");

function joiValidate(req, res, next) {
  const contactsSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\+?[0-9]{7,14}$/),
  });

  const { error } = contactsSchema.validate(req.body);
  if (error) {
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
