import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setLoad } from '../../store/actions';
import { useFormik } from 'formik';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { AuthService } from '../../services';
import Swal from 'sweetalert2';
import './singUp.scss';
import * as yup from 'yup';

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

const SingUp = (props) => {
  const [seePassword, setSeePassword] = useState(false);
  const history = useHistory();
  const routeChange = (path) => {
    history.push(`/${path}`);
  };
  const singUpFetch = async (values) => {
    try {
      props.setLoad(true);
      const response = await AuthService.singUp(values.email, values.password);
      console.log(response);

      Swal.fire({
        text: 'A verification email has been sent to your email',
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: true,
      }).then(function () {
        //routeChange('login');
      });
    } catch (error) {
      if (error.toString() === 'Error: Request failed with status code 400') {
        Swal.fire({
          text: 'Email or username entered already exists',
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          text: 'Please check your user credentials',
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false,
        });
      }
    }
    props.setLoad(false);
  };

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      singUpFetch(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="flex center h80 ">
      <div className="">
        <div className="titles">Sign Up</div>
        <div className="login-form color-white">
          <form noValidate onSubmit={formik.handleSubmit}>
            <div className="mt-3">
              <label>Email </label>

              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                className="format-input w100 login-form__input"
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              {formik.errors.email ? (
                <div className="mt-1 error-text">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className={`mt-5 pt-3 `}>
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

            <div className="flex center w100">
              <button className="login-form__submit-button" type="submit">
                Submit
              </button>
            </div>
            <div className="w100 text-center mt-4 mb-4">
              <span>
                Already have an account?{'   '}
                <span
                  className="text-underline cursor-pointer"
                  onClick={() => routeChange('login')}
                >
                  Log in
                </span>
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
};
export default connect(null, mapDispatchToProps)(SingUp);
