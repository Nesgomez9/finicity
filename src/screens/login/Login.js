import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setLoad, setUserInformation } from '../../store/actions';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { HttpProvider } from 'providers';
import './login.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import * as yup from 'yup';
import { AuthService, finicityService } from '../../services';
import Swal from 'sweetalert2';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-./()]).{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
    .required('Password is required'),
});
const validationSchemaForgotPassword = yup.object({
  recoverEmail: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

const Login = ({ setLoad, setUserInformation }) => {
  const [seePassword, setSeePassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const history = useHistory();
  const routeChange = (path) => {
    history.push(`/${path}`);
  };
  const loginFetch = async (values) => {
    try {
      setLoad(true);
      const response = await AuthService.login(values.email, values.password);
      HttpProvider.setHeaderToken(response.id_token);
      try {
        await finicityService.singUp(values.email, values.password);
      } catch (error) {}
      const responseFinicity = await finicityService.login(
        values.email,
        values.password
      );
      setUserInformation(responseFinicity);
      console.log(responseFinicity);
      localStorage.setItem('url', responseFinicity.link);
      routeChange('accounts');
    } catch (error) {
      Swal.fire({
        text: 'Please check your user credentials',
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false,
      });
    }
    setLoad(false);
  };
  const forgotPasswordFetch = async (values) => {
    try {
      setLoad(true);
      const response = await AuthService.forgotPassword(values.recoverEmail);
    } catch (error) {
      Swal.fire({
        text: 'User email not found',
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false,
      });
    }
    setLoad(false);
  };
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      email: '',
      password: '',
      recoverEmail: '',
    },
    onSubmit: async (values) => {
      if (forgotPassword) {
        forgotPasswordFetch(values);
      } else {
        loginFetch(values);
      }
    },
    validationSchema: forgotPassword
      ? validationSchemaForgotPassword
      : validationSchema,
  });

  return (
    <div className="flex center h80">
      <div className="">
        <div className="titles">
          {forgotPassword ? 'Forgot Password' : 'Login'}
        </div>
        <div className="login-form color-white">
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <div className="mt-3">
              <label>{forgotPassword ? 'Email' : 'User'}</label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                name={forgotPassword ? 'recoverEmail' : 'email'}
                className="format-input w100 login-form__input"
                onChange={formik.handleChange}
                value={
                  forgotPassword
                    ? formik.values.recoverEmail
                    : formik.values.email
                }
              />

              {forgotPassword ? (
                formik.errors.recoverEmail ? (
                  <div className="mt-1 error-text">
                    {formik.errors.recoverEmail}
                  </div>
                ) : null
              ) : formik.errors.email ? (
                <div className="mt-1 error-text">{formik.errors.email}</div>
              ) : null}
            </div>
            <div
              className={`mt-5 pt-3 ${forgotPassword ? 'display-none' : null}`}
            >
              <label>Password</label>

              <div className="flex-row center-vertical login-form__input">
                <input
                  type={seePassword === true ? 'input' : 'password'}
                  name="password"
                  autoComplete="new-password"
                  className="format-input w100"
                  onChange={formik.handleChange}
                  color={formik.values.password ? 'red' : 'lightBlue'}
                  value={formik.values.password}
                />
                <div className="">
                  {seePassword === true ? (
                    <AiOutlineEyeInvisible
                      color="black"
                      size="20"
                      onClick={() => setSeePassword(!seePassword)}
                    />
                  ) : (
                    <AiOutlineEye
                      color="black"
                      size="20"
                      onClick={() => setSeePassword(!seePassword)}
                    />
                  )}
                </div>
              </div>
              {formik.errors.password ? (
                <div className="mt-1 error-text">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="w100 text-right mt-2">
              <span
                className={`text-underline cursor-pointer ${
                  forgotPassword ? 'display-none' : null
                }`}
                onClick={() => setForgotPassword(true)}
              >
                Forgot password?
              </span>
            </div>
            <div className="flex center w100">
              <button className="login-form__submit-button" type="submit">
                {forgotPassword ? 'Recover password' : 'Login'}
              </button>
            </div>
            <div className="w100 text-center mt-4 mb-4">
              <span>
                {forgotPassword ? null : 'Not a member yet?'} {'  '}
                {forgotPassword ? (
                  <span
                    className="text-underline cursor-pointer"
                    onClick={() => setForgotPassword(false)}
                  >
                    Cancel
                  </span>
                ) : (
                  <span
                    className="text-underline cursor-pointer"
                    onClick={() => routeChange('singup')}
                  >
                    Join QuickPenny
                  </span>
                )}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setLoad,
  setUserInformation,
};
export default connect(null, mapDispatchToProps)(Login);
