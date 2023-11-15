import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import API_URL from '../../../../conf';
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from './action'
import { useAuth } from 'authContext'; // Importez le hook useAuth
import React from 'react';

// material-ui
import { useTheme, makeStyles } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';
import { ACCOUNT_INITIALIZE } from 'store/actions';


//============================|| API JWT - LOGIN ||============================//

const RestLogin = (props, { ...others }) => {
  const dispatcher = useDispatch();

  const scriptedRef = useScriptRef();
  const [checked, setChecked] = React.useState(true);
  const account = useSelector((state) => state.account);
  const user = useSelector((state) => state.account.user);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };

  function storeTokens(token, refresh) {
    localStorage.setItem('accessToken', JSON.stringify(token));
    localStorage.setItem('refreshToken', JSON.stringify(refresh));
  }

  return (
      <React.Fragment>
          <Formik
              initialValues={{
                  email: '',
                  password: '',
                  submit: null
              }}
              validationSchema={Yup.object().shape({
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  password: Yup.string().max(255).required('Password is required')
              })}
              onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                  try {
                    Axios
                          .post( `${API_URL}/login/`, {
                              password: values.password,
                              email: values.email
                          },
                          )
                          .then(function (response) {
                              if (response.data.success) {
                                  
                                  storeTokens(response.data.token,response.data.refresh);
                                  dispatcher({
                                      type: ACCOUNT_INITIALIZE,
                                      payload: { isLoggedIn: true, user: response.data.user, token: response.data.token, refresh: response.data.refresh }
                                  });
                                  navigate('/');

                                  if (scriptedRef.current) {
                                      setStatus({ success: true });
                                      setSubmitting(false);
                                     
                                  }
                              } else {
                                  setStatus({ success: false });
                                  setErrors({ submit: response.data.msg });
                                  setSubmitting(false);
                              }
                          })
                          .catch(function (error) {
                              setStatus({ success: false });
                              //setErrors({ submit: error.response.data.msg });
                              setSubmitting(false);
                          });
                  } catch (err) {
                      console.error(err);
                      if (scriptedRef.current) {
                          setStatus({ success: false });
                          setErrors({ submit: err.message });
                          setSubmitting(false);
                      }
                  }
              }}
          >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit} {...others}>
                      <FormControl fullWidth error={Boolean(touched.email && errors.email)} >
                          <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                          <OutlinedInput
                              id="outlined-adornment-email-login"
                              type="email"
                              value={values.email}
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Email Address"
                              
                          />
                          {touched.email && errors.email && (
                              <FormHelperText error id="standard-weight-helper-text-email-login">
                                  {' '}
                                  {errors.email}{' '}
                              </FormHelperText>
                          )}
                      </FormControl>

                      <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                          <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                          <OutlinedInput
                              id="outlined-adornment-password-login"
                              type={showPassword ? 'text' : 'password'}
                              value={values.password}
                              name="password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              endAdornment={
                                  <InputAdornment position="end">
                                      <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                          edge="end"
                                      >
                                          {showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                  </InputAdornment>
                              }
                              label="Password"
                              
                          />
                          {touched.password && errors.password && (
                              <FormHelperText error id="standard-weight-helper-text-password-login">
                                  {' '}
                                  {errors.password}{' '}
                              </FormHelperText>
                          )}
                      </FormControl>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={checked}
                                      onChange={(event) => setChecked(event.target.checked)}
                                      name="checked"
                                      color="primary"
                                  />
                              }
                              label="Remember me"
                          />
                          <Typography
                              variant="subtitle1"
                              component={Link}
                              to={props.login ? '/pages/forgot-password/forgot-password' + props.login : '#'}
                              color="secondary"
                              sx={{ textDecoration: 'none' }}
                          >
                              Forgot Password?
                          </Typography>
                      </Stack>
                      {errors.submit && (
                          <Box
                              sx={{
                                  mt: 3
                              }}
                          >
                              <FormHelperText error>{errors.submit}</FormHelperText>
                          </Box>
                      )}

                      <Box
                          sx={{
                              mt: 2
                          }}
                      >
                          <AnimateButton>
                              <Button
                                  disableElevation
                                  disabled={isSubmitting}
                                  fullWidth
                                  size="large"
                                  type="submit"
                                  variant="contained"
                                  color="secondary"
                              >
                                  Sign IN
                              </Button>
                          </AnimateButton>
                      </Box>
                  </form>
              )}
          </Formik>
      </React.Fragment>
  );
};

export default RestLogin;
