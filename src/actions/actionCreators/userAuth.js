import axios from 'axios';
import { push } from 'react-router-redux';
import { API_URL } from '../../config/constants';
import {
  USER_SIGN_UP_START,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAILURE,
  USER_SIGN_IN_START,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILURE,
  USER_SIGN_OUT
} from '../actionTypes';

export const userSignUp = ({email, username, password}) => (dispatch) => {
  dispatch({type: USER_SIGN_UP_START});
  return axios.post(`${API_URL}/users/signup`, {
    email,
    username,
    password,
  })
  .then(({data}) => {
    dispatch({
      type: USER_SIGN_UP_SUCCESS,
      payload: data.user,
    });
    dispatch(push('/'));
  }, ({response}) => {
    dispatch({
      type: USER_SIGN_UP_FAILURE,
      errors: response.data.errors,
    });
  });
}

export const userSignIn = (credentials) => (dispatch) => {
  dispatch({type: USER_SIGN_IN_START});
  return axios({
    method: 'post',
    url: `${API_URL}/users/signin`,
    data: {
      email: credentials.email,
      password: credentials.password,
    }
  })
  .then(({data}) => {
    console.log('successfully signed in', data);
    dispatch({
      type: USER_SIGN_IN_SUCCESS,
      payload: data.user,
    });
    dispatch(push('/'));
  }, ({response}) => {
    dispatch({
      type: USER_SIGN_IN_FAILURE,
      errors: response.data.errors,
    });
  });
};

export const userSignOut = () => ({
  type: USER_SIGN_OUT,
});
