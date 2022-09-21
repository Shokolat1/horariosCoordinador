const joi = require("joi");

const schema = joi.object({
    name: Joi.string().alphanum().min(3).max(80).required(),
    lastname:Joi.string().alphanum().min(3).max(80).required(),
    password: Joi.string().required(),
    matricula: Joi.number().integer().min(2000).max(5000).required(),
});

const validateTeacher = (data) => {
  return schema.validate(data);
};

module.exports = validateTeacher;
