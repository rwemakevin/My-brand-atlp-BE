import Joi from "joi";

export default class validation {
  static validateRegister(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$"
          )
        )
        .required()
        .messages({
          "string.pattern.base":
            "Minimum password length is 6, with at least one number, one uppercase letter, and one special character",
        }),
      verifyPassword: Joi.string().valid(Joi.ref("password")).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  }

  static validateLogin(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  }

  static validateEditUser(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$"
          )
        )
        .required()
        .messages({
          "string.pattern.base":
            "Minimum password length is 6, with at least one number, one uppercase letter, and one special character",
        }),
      verifyPassword: Joi.string().valid(Joi.ref("password")).required(),
      role: Joi.string()
        .valid("user", "blogger", "admin", "superadmin")
        .required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  }
}
