const Joi = require('joi');

const listSchema = Joi.object().keys({
  id: Joi.string(),
  label: Joi.string(),
  owner: Joi.string(),
});

module.exports = listSchema;
