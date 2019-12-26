import Joi from "@hapi/joi";

export const validateObject = (body, type) => {
  const validationSchema = {};
  if (type === "login") {
    validationSchema = Joi.object({
      email: Joi.string()
        .min(5)
        .required()
        .email(),
      password: Joi.string()
        .min(8)
        .required()
    });
  } else if (type === "signup") {
    validationSchema = Joi.object({
      name: Joi.string()
        .min(5)
        .required(),
      email: Joi.string()
        .min(5)
        .required()
        .email(),
      password: Joi.string()
        .min(8)
        .required()
    });
  }

  const validationResult = validationSchema.validate(body);
  const { error } = validationResult;
  return error;
};
