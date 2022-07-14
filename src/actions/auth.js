import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from './types';
import AuthService from '../services/auth.service';
export const register = (username, email, password) => {
  return async (dispatch) => {
    try {
    } catch (error) {}
  };

  /* todo: convert this piece to async/await, also do not forget to import REGISTER_SUCCESS and REGISTER_FAIL
    return AuthService.register(username, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: REGISTER_FAIL,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );

     */
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
