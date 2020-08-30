const Joi = require('joi');

const todoSchema = Joi.object().keys({
  id: Joi.string().required,
  title: Joi.string().required,
  description: Joi.string(),
  status: Joi.boolean(),
});

module.exports = todoSchema;
