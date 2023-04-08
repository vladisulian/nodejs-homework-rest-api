const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{7,14}$/)
    .required(),
});

module.exports = {
  contactsSchema,
};
