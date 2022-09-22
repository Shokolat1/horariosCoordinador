const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().min(3).max(80).required(),
  lastName: Joi.string().min(3).max(80).required(),
  matricula: Joi.number().min(20000).max(50000).required(),
  password: Joi.string().alphanum().required(),
  ing: Joi.string().min(3).max(80),
  semestre: Joi.string().min(1).max(8),
});

const validateStudent = (data) => {
  return schema.validate(data);
};

module.exports = validateStudent;
