import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const isPrivate = () => {
    if (restricted && !isLogin()) {
      return <Route {...rest} render={(props) => <Redirect to="/login" />} />;
    } else {
      return <Route {...rest} render={(props) => <Component {...props} />} />;
    }
  };
  return isPrivate();
};

export default PublicRoute;
