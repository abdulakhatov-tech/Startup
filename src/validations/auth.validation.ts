import * as Yup from 'yup';

export const AuthValidation = {
  register() {
    return Yup.object({
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password should be min 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Password doesn't same")
        .required('Confirm password is required'),
    });
  },
  login() {
    return Yup.object({
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password should be min 6 characters')
        .required('Password is required'),
    });
  },
};
