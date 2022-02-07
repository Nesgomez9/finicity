import axios from 'axios';

const get = (url, query = {}, data = {}) => {
  let queryString = '?';
  if (query) {
    Object.keys(query).forEach((key) => {
      if (query[key]) {
        queryString += `${key}=${query[key]}&`;
      }
    });
  }

  return new Promise((resolve, reject) => {
    axios
      .get(url + (queryString.length === 1 ? '' : queryString), data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        validateSessionCredentials(error);
        let exception = Object.assign(error);
        exception.query = query;
        exception.data = data;
        reject(error);
      });
  });
};

const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        validateSessionCredentials(error);
        let exception = Object.assign(error);
        exception.data = data;
        reject(exception);
      });
  });
};

const put = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        validateSessionCredentials(error);
        let exception = Object.assign(error);
        exception.data = data;
        reject(exception);
      });
  });
};

const patch = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        validateSessionCredentials(error);
        let exception = Object.assign(error);
        exception.data = data;
        reject(exception);
      });
  });
};

const deleted = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, { data })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        validateSessionCredentials(error);
        let exception = Object.assign(error);
        exception.data = data;
        reject(exception);
      });
  });
};
const validateSessionCredentials = (error) => {
  if (error.response && error.response.data.status === 401) {
    window.location.href = '/';
  }
};

const removeSessionCredentials = () => {
  setHeaderToken('');
  localStorage.removeItem('authentication_token');
};

const setDefaultHeaders = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.headers.common['Authorization'] = '';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

/**
 * * Setea el token de forma global para todas las peticiones http
 */
const setHeaderToken = (token) => {
  localStorage.setItem('id_token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

/**
 * * Setea la URL base de forma global para todas las peticiones http, se usa para modificar la URL en demos
 */
const setHeaderBaseURL = (URL) => {
  axios.defaults.baseURL = URL;
};

export const HttpProvider = {
  get,
  post,
  put,
  patch,
  deleted,
  setDefaultHeaders,
  setHeaderToken,
  setHeaderBaseURL,
  removeSessionCredentials,
};
