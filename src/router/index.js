import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import {
  Login,
  SingUp,
  BankSelect,
  AccountSelect,
  TransactionDetails,
  Transaction,
} from 'screens';

const router = () => {
  return (
    <Switch>
      <PublicRoute
        exact
        path="/transaction/:transactionId"
        component={Transaction}
      />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/singup" component={SingUp} />
      <PublicRoute restricted exact path="/banks" component={BankSelect} />
      <PublicRoute
        restricted
        exact
        path="/accounts"
        component={AccountSelect}
      />
      <PublicRoute
        restricted
        exact
        path="/confirm/:transactionId"
        component={TransactionDetails}
      />
      <Redirect from="*" to="/login" />
    </Switch>
  );
};

export default router;
