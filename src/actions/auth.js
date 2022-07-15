import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE, REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import AuthService from '../services/auth.service';

export const register = (username, email, password, setLoading) => {
  return async (dispatch) => {
    try {
      const response = await AuthService.register(username, email, password);
      if (response.code === 0) {
        console.log('Succesfully registered');
        dispatch({
          type: REGISTER_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.message,
        });
      }
      if (response.code === 1) {
        console.log('There is already an account registered with this email');
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.message,
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

export const login = (username, password, setLoading) => {
  return async (dispatch) => {
    try {
      const response = await AuthService.login(username, password);
      if (response.code === 0) {
        console.log('Succesfully logged in');
        localStorage.setItem('user', JSON.stringify(response));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: response },
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.message,
        });
      }
      if (response.code === 1) {
        console.log('invalid username or password');
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.message,
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
};
