const Joi = require('joi');

const todoSchema = Joi.object().keys({
  id: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.boolean(),
  list_id: Joi.string(),
});

module.exports = todoSchema;
