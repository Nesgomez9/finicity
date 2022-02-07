const { HttpProvider } = require('../providers');

const baseEndpoint = '/payers';
const login = async (email, password) => {
  const response = await HttpProvider.post(`${baseEndpoint}/loginpayer`, {
    email,
    password,
  });
  return response;
};
const singUp = async (email, password) => {
  const response = await HttpProvider.post(`${baseEndpoint}/registerpayer`, {
    email,
    password,
  });
  return response;
};
const getAccounts = async () => {
  const response = await HttpProvider.get(
    `${baseEndpoint}/getcustomeraccounts`
  );
  return response;
};
const notifyFiinicity = async () => {
  const response = await HttpProvider.post(
    `${baseEndpoint}/notifyfinicityevent`
  );
  return response;
};
export const finicityService = {
  login,
  singUp,
  getAccounts,
  notifyFiinicity,
};
