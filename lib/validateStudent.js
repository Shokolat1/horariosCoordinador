const joi = require("joi");

const schema = joi.object({
    firstName: Joi.string().alphanum().min(3).max(80).required(),
    lastName:Joi.string().alphanum().min(3).max(80).required(),
    password: Joi.string().required(),
    matricula: Joi.number().integer().min(2000).max(5000).required(),
    carrera:Joi.string().alphanum().min(3).max(80).required(),
    semestre:Joi.number().integer().min(1).max(8).required(),
});

const validateStudent = (data) => {
  return schema.validate(data);
};

module.exports = validateStudent;
