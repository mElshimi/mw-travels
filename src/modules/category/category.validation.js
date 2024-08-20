import Joi from "joi";

const addCategoryValidation = Joi.object({
  categoryName: Joi.string().min(2).max(100).required().trim(),
  description: Joi.string().min(7).max(100).required().trim(),
  image: Joi.object({
    fieldname: Joi.string().required()  ,
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    filename: Joi.string().required(),
    destination: Joi.string().required(),
    path: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg' , 'image/png').required(),
    size: Joi.number().max(5242880).required(),
  }).required(),
});
const paramsIdVAlidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateCategoryValidation = Joi.object({
  categoryName: Joi.string().min(2).max(100).required().trim(),
  id: Joi.string().hex().length(24).required(), 
   image: Joi.object({
    fieldname: Joi.string().required()  ,
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    filename: Joi.string().required(),
    destination: Joi.string().required(),
    path: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg' , 'image/png').required(),
    size: Joi.number().max(5242880).required(),
  }),
});

export { addCategoryValidation, paramsIdVAlidation, updateCategoryValidation };
