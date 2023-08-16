import joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const loginValidation = (body) => {
  const schema = joi.object({
    email: joi.string().required().label('email'),
    password: joi.passwordComplexity().required().label('password'),
  });
  return schema.validate(body);
};
