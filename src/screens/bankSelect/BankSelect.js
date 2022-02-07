import React, { useEffect } from 'react';
import {
  FinicityConnect,
  ConnectEventHandlers,
  ConnectOptions,
  ConnectDoneEvent,
  ConnectCancelEvent,
  ConnectErrorEvent,
  ConnectRouteEvent,
} from '@finicity/connect-web-sdk';
import './bankSelect.scss';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLoad, setAccounts } from '../../store/actions';

const BankSelect = ({ setLoad, userInformation, setAccounts }) => {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(`/${path}`);
  };

  useEffect(() => {
    if (userInformation.link || localStorage.getItem('url')) {
      new ConnectComponent(userInformation.link || localStorage.getItem('url'));
    } else {
      routeChange('');
    }
  });
  class ConnectComponent {
    connectEventHandlers: ConnectEventHandlers = {
      onDone: (event: ConnectDoneEvent) => {
        if (event && event.code === 200) {
          setLoad(true);
          routeChange('accounts');
        }
      },
      onCancel: (event: ConnectCancelEvent) => {
        setLoad(false);
        routeChange('accounts');
      },
      onError: (event: ConnectErrorEvent) => {
        setLoad(false);
        routeChange('accounts');
      },
      onRoute: (event: ConnectRouteEvent) => {},
      onUser: (event: any) => {},
      onLoad: () => {
        console.log('loaded');
      },
    };

    connectOptions: ConnectOptions = {
      overlay: 'rgba(199,201,199, 0.5)',
    };

    constructor(url) {
      FinicityConnect.launch(
        url,
        this.connectEventHandlers,
        this.connectOptions
      );
    }
  }

  return <div className="full-height"></div>;
};
const mapStateToProps = (state) => {
  return {
    userInformation: state.userInformation,
  };
};

const mapDispatchToProps = {
  setLoad,
  setAccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(BankSelect);
