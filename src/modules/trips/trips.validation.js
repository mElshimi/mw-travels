import Joi from "joi";

const addTripValidation = Joi.object({
  tripName: Joi.string().min(2).max(300).required().trim(),
  description: Joi.string().min(10).max(1500).required().trim(),
  price: Joi.number().min(0).required(),
  category: Joi.string().hex().length(24),
  imgCover:Joi.array().items(Joi.object({
      fieldname: Joi.string().required()  ,
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      filename: Joi.string().required(),
      destination: Joi.string().required(),
      path: Joi.string().required(),
      mimetype: Joi.string().valid('image/jpeg' , 'image/png').required(),
      size: Joi.number().max(5242880),
  })).required(),
  images:Joi.array().items(Joi.object({
    fieldname: Joi.string().required()  ,
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    filename: Joi.string().required(),
    destination: Joi.string().required(),
    path: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg' , 'image/png').required(),
    size: Joi.number().max(5242880),
})).required()
  
});
const paramsIdVAlidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateTripValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
  tripName: Joi.string().min(2).max(300).required().trim(),
  description: Joi.string().min(10).max(1500).required().trim(),
  price: Joi.number().min(0).required(),
  category: Joi.string().hex().length(24),
  imgCover:Joi.array().items(Joi.object({
    fieldname: Joi.string().required()  ,
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    filename: Joi.string().required(),
    destination: Joi.string().required(),
    path: Joi.string().required(),
    mimetype: Joi.string().valid('image/jpeg' , 'image/png').required(),
    size: Joi.number().max(5242880),
})),
images:Joi.array().items(Joi.object({
  fieldname: Joi.string().required()  ,
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  filename: Joi.string().required(),
  destination: Joi.string().required(),
  path: Joi.string().required(),
  mimetype: Joi.string().valid('image/jpeg' , 'image/png').required(),
  size: Joi.number().max(5242880),
}))
});

export { addTripValidation, paramsIdVAlidation, updateTripValidation };
