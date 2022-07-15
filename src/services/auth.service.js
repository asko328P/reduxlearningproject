import axios from 'axios';
const API_URL = 'https://cors-anywhere.herokuapp.com/http://restapi.adequateshop.com/api/';

const login = (email, password) => {
  const loginPost = async () => {
    const response = await axios.post(API_URL + 'authaccount/login', {
      email,
      password,
    });

    return response.data;
  };
  return loginPost();
};
const register = (name, email, password) => {
  const registerPost = async () => {
    const response = await axios.post(API_URL + 'authaccount/registration', {
      name,
      email,
      password,
    });

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
