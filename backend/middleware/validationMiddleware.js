const Joi = require('joi');

const validateEmployee = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email().required(),
    department: Joi.string()
      .valid('Development', 'HR', 'Sales', 'Marketing', 'Operations', 'Finance')
      .required(),
    skills: Joi.array().items(Joi.string().trim()).required(),
    performanceScore: Joi.number().min(0).max(100).required(),
    experience: Joi.number().min(0).required(),
    status: Joi.string().valid('active', 'inactive', 'on-leave'),
  });

  return schema.validate(data);
};

const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'hr', 'manager').default('hr'),
  });

  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    req.body = value;
    next();
  };
};

module.exports = {
  validateEmployee,
  validateUser,
  validateLogin,
  validationMiddleware,
};
