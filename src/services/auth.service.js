import axios from 'axios';
const API_URL = 'https://dev-api.mioo.cc/account/';

const login = (email, password) => {
  const loginPost = async () => {
    const response = await axios.post(
      `${API_URL}login`,
      {
        email,
        password,
      },
      {
        validateStatus: (status) => {
          return status < 500;
        },
      },
    );
    return response.data;
  };
  return loginPost();
};
const register = (first_name, last_name, email, phone_number, password) => {
  const registerPost = async () => {
    const response = await axios.post(
      `${API_URL}register`,
      {
        first_name,
        last_name,
        email,
        phone_number,
        password,
        country: 'se',
        language: 'sv',
      },
      {
        validateStatus: (status) => {
          return status < 500;
        },
      },
    );

    return response.data;
  };
  return registerPost();
};
const logout = () => {
  localStorage.removeItem('user');
};

const authServices = {
  register,
  login,
  logout,
};

export default authServices;
