import axios from 'axios';
const { HttpProvider } = require('../providers');
const baseEndpoint = '/admin/transactions';

const login = async () => {
  const response = await HttpProvider.post(`auth/login`, {
    email: 'alejostests@gmail.com',
    password: 'Inicio.123',
  });
  return response;
};

const getTransactionById = async (id) => {
  const data = await login();
  let config = {
    headers: {
      Authorization: `Bearer ${data.id_token}`,
    },
  };
  const response = await axios.get(`${baseEndpoint}/${id}`, config);
  return response.data;
};

const notifyEvent = async (transactionId, dataTransaction) => {
  const data = await login();
  let config = {
    headers: {
      Authorization: `Bearer ${data.id_token}`,
    },
  };
  const response = await HttpProvider.patch(
    `/transactions/notifybanktransaction/${transactionId}`,
    dataTransaction
  );
  return response.data;
};
export const transactionService = {
  getTransactionById,
  notifyEvent,
};
