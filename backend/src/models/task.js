const Joi = require("joi");

const taskSchema = Joi.object().keys({
  id: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  list_id: Joi.string(),
  index: Joi.string(),
});

module.exports = taskSchema;
