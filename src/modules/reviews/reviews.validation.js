
import Joi from "joi";

const addReviewValidation = Joi.object({
    text: Joi.string().min(1).max(300).required().trim(),
    rate:Joi.number().min(0).max(5).required(),
    product: Joi.string().hex().length(24).required(),
});
const paramsIdVAlidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateReviewValidation = Joi.object({
    text: Joi.string().min(1).max(300).trim(),
    rate:Joi.number().min(0).max(5),
    product: Joi.string().hex().length(24),
  id: Joi.string().hex().length(24).required(),
});

export { addReviewValidation, paramsIdVAlidation, updateReviewValidation };


