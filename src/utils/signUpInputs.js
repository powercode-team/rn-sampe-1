import { required } from './validators';

const arrayOfInputs = [
  {
    name: 'firstName',
    placeholder: 'First name',
    label: 'First name',
    validate: [required],
  },
  {
    name: 'lastName',
    placeholder: 'Last name',
    label: 'Last name',
    validate: [required],
  },
  {
    name: 'email',
    placeholder: 'E-Mail',
    label: 'E-Mail',
    isLowerCase: true,
    validate: [required],
  },
  {
    name: 'password',
    placeholder: 'Password',
    label: 'Password',
    validate: [required],
  },
  {
    name: 'passwordCheck',
    placeholder: 'Repeat password',
    label: 'Repeat password',
    validate: [required],
  },
];

export default arrayOfInputs;
