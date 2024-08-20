import Joi from "joi";

const addUserValidation = Joi.object({
    name:Joi.string().min(2).max(12).required(),
    phone:Joi.string().pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/).required(),
    Repassword:Joi.valid(Joi.ref('password')).required(),
});
const paramsIdVAlidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateUserValidation = Joi.object({
    name:Joi.string().min(2).max(12),
    role:Joi.string().optional().valid('user' , 'admin'),
    email:Joi.string().email(),
    phone:Joi.string(),
    password:Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/),
    Repassword:Joi.valid(Joi.ref('password')),
  id: Joi.string().hex().length(24),
});

export { addUserValidation, paramsIdVAlidation, updateUserValidation };
