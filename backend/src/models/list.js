const Joi = require('joi');

const listSchema = Joi.object().keys({
  id: Joi.string(),
  label: Joi.string(),
  index: Joi.string(),
});

module.exports = listSchema;
