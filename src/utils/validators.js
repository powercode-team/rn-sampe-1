import validator from 'validator';
import PasswordValidator from 'password-validator';

const schema = new PasswordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols()
  .has()
  .not()
  .spaces();

const professionSchema = new PasswordValidator();
professionSchema
  .is()
  .min(1)
  .is()
  .max(35)
  .has()
  .letters();

const educationSchema = new PasswordValidator();
educationSchema
  .is()
  .min(1)
  .is()
  .max(35)
  .has()
  .not()
  .digits()
  .has()
  .not()
  .symbols();

const nameSchema = new PasswordValidator();
nameSchema
  .is()
  .min(1)
  .is()
  .max(35)
  .has()
  .not()
  .digits();

const messageDigSchema = new PasswordValidator();
messageDigSchema.has().digits();

const messageSymSchema = new PasswordValidator();
messageSymSchema.has().symbols();

const messageLettersSchema = new PasswordValidator();
messageLettersSchema.has().letters();

const phoneSchema = new PasswordValidator();
phoneSchema
  .is()
  .min(8)
  .is()
  .max(15)
  .has()
  .digits();

export const validateMessage = (value) => {
  const isValidDig = messageDigSchema.validate(value);
  const isValidSym = messageSymSchema.validate(value);
  const isValidLetters = messageLettersSchema.validate(value);
  return isValidDig || isValidSym || isValidLetters;
};

export const validateName = (value) => {
  const isValid = nameSchema.validate(value);
  return isValid ? undefined : 'Should not contain numbers and special symbols';
};
export const required = (value) => (value ? undefined : 'Required');
export const onlyLetters = (value) => (validator.isAlpha(value, ['en-GB']) ? undefined : 'Should contain only letters');
export const validateEmail = (value) => (validator.isEmail(value) ? undefined : 'Should be an email address');
export const lengthSize = (value, min, max) => {
  const isValid = validator.isLength(value, { min, max });
  return isValid ? undefined : `Should be in the range of ${min}-${max} characters`;
};
export const isEmpty = (value) => (validator.isEmpty(value) ? undefined : 'Should not be empty');
export const validatePassword = (value) => (schema.validate(value) ? undefined : 'Password is not valid');
export const lettersAndNumbers = (value) => {
  const isValid = validator.isAlphanumeric(value, ['en-GB']);
  return isValid ? undefined : 'Should contain only letters and numbers';
};
export const onlyNumbers = (value) => (validator.isNumeric(value) ? undefined : 'Should contain only numbers');
export const isGermanMobilePhone = (value) => {
  const isValid = validator.isMobilePhone(value, ['de-DE']);
  return isValid ? undefined : 'Should be in a 55-555-55555555 format';
};
export const validateProfession = (value) => {
  const isValid = professionSchema.validate(value);
  return isValid ? undefined : 'Should not contain only numbers';
};
export const validateEducation = (value) => {
  const isValid = educationSchema.validate(value);
  return isValid ? undefined : 'Should not contain numbers and special symbols';
};
export const validatePhoneNumber = (value) => {
  const isValid = phoneSchema.validate(value);
  return isValid ? undefined : 'Phone number should be between 8 and 15 digits.';
};
