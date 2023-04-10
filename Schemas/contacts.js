const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+?[0-9]{7,14}$/),
});

module.exports = {
  contactsSchema,
};
