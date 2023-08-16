import joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
const singUpBodyValidation = (body) => {
  const schema = joi.object({
    userName: joi.string().required().label('User Name'),
    email: joi.string().required().label('email'),
    password: joi.passwordComplexity().required().label('password'),
  });
  return schema.valid(body);
};

export default singUpBodyValidation;
