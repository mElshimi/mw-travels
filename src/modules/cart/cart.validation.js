import Joi from "joi";

const 
addToCartVal = Joi.object({
  trip: Joi.string().hex().length(24),
});
const paramsIdVAlidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateQTYVal = Joi.object({
  id: Joi.string().hex().length(24),
});

export { addToCartVal, paramsIdVAlidation, updateQTYVal };
