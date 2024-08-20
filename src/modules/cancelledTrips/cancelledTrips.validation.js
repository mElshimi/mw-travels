import Joi from "joi";

const 
cancelTripVal = Joi.object({
  trip: Joi.string().hex().length(24),
});

export { cancelTripVal };
