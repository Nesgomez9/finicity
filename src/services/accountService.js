const baseEndpoint = '/accounts';
const { HttpProvider } = require('../providers');

const deleteAccount = async (accountId) => {
  const response = await HttpProvider.patch(`${baseEndpoint}/${accountId}`, {
    deleted: true,
  });
  return response.data;
};

export const accountService = {
  deleteAccount,
};
