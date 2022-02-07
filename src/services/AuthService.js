const { HttpProvider } = require('../providers');

const baseEndpoint = '/auth';

const login = async (email, password) => {
  const response = await HttpProvider.post(`${baseEndpoint}/login`, {
    email,
    password,
  });
  return response;
};
const singUp = async (email, password) => {
  const response = await HttpProvider.post(
    `${baseEndpoint}/signup?isPayerRequest=true`,
    {
      email,
      password,
    }
  );
  return response;
};
const forgotPassword = async (email) => {
  const response = await HttpProvider.post(`${baseEndpoint}/forgotPassword`, {
    email,
  });
  return response;
};
const loginWithToken = async (token) => {
  HttpProvider.setHeaderToken(token);
  const response = await HttpProvider.post(baseEndpoint);
  return response.data;
};
const logout = async () => {
  const response = await HttpProvider.deleted(baseEndpoint);
  return response.data;
};

export const AuthService = {
  login,
  forgotPassword,
  loginWithToken,
  logout,
  singUp,
};
