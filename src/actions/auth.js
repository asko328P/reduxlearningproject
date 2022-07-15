import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE, REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import AuthService from '../services/auth.service';

export const register = (firstName, lastName, email, password, phoneNumber, setLoading) => {
  return async (dispatch) => {
    try {
      const response = await AuthService.register(firstName, lastName, email, phoneNumber, password);
      if (response && response.success === true && response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({
          type: REGISTER_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: 'Successfully registered',
        });
      }
      if (response && response.success === false && response.error.message) {
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: 'User with this email already exists',
        });
      }
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    }
    setLoading(false);
  };
};

export const login = (username, password, setLoading) => {
  return async (dispatch) => {
    try {
      const response = await AuthService.login(username, password);
      if (response && response.success === true && response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: response },
        });
        dispatch({
          type: SET_MESSAGE,
          payload: 'Successfully logged in',
        });
      }
      if (response && response.success === false) {
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: 'Wrong username or password',
        });
      }
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    }
    setLoading(false);
  };
};
export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: SET_MESSAGE,
    payload: 'Successfully logged out',
  });
};
