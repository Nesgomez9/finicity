const TOKEN_KEY = 'id_token';

export const loginUser = (token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
};

export const getToken = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN_KEY));
  }
  return '';
};
