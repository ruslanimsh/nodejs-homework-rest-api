const Joi = require("joi");

const bodySchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});


module.exports = {
  bodySchema,
};
