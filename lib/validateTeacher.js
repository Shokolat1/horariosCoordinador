const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().min(3).max(80).required(),
  lastName: Joi.string().min(3).max(80).required(),
  matricula: Joi.number().min(100).max(50000).required(),
  password: Joi.string().required().alphanum(),
  especialidad: Joi.string().min(3).max(80),
});

const validateTeacher = (data) => {
  return schema.validate(data);
};

module.exports = validateTeacher;
