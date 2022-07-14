import axios from "axios";
const API_URL = "http://restapi.adequateshop.com/api/";
const register = (name, email, password) => {
    // todo: fix this part to work the same way as login

    return axios.post(API_URL + "authaccount/registration", {
        name,
        email,
        password,
    });
};
const login = (email, password) => {
    const loginPost = async () => {
        const response = await axios.post(API_URL + "authaccount/login", {
            email,
            password,
        });

        return response.data;
    };
    return loginPost();
};
const logout = () => {
    localStorage.removeItem("user");
};

const authServices = {
    register,
    login,
    logout,
}

export default authServices;

